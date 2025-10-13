/* eslint-disable */

import { spawnSync, SpawnSyncReturns } from "node:child_process";
import readline from "node:readline";
import process from "node:process";

type RunResult = {
  status: number | null;
  stdout: string;
  stderr: string;
};

function run(
  command: string,
  args: string[],
  options?: { cwd?: string; allowFail?: boolean }
): RunResult {
  const result: SpawnSyncReturns<Buffer> = spawnSync(command, args, {
    cwd: options?.cwd,
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "buffer",
  });
  const stdout = result.stdout?.toString("utf8") ?? "";
  const stderr = result.stderr?.toString("utf8") ?? "";
  if (!options?.allowFail && result.status !== 0) {
    const joined = [stdout.trim(), stderr.trim()].filter(Boolean).join("\n");
    throw new Error(
      `${command} ${args.join(" ")} failed${joined ? `:\n${joined}` : ""}`
    );
  }
  return { status: result.status, stdout, stderr };
}

function toKebabCase(input: string): string {
  const trimmed = input.trim();
  const ascii = trimmed
    .normalize("NFKD")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-");
  const collapsed = ascii.replace(/-+/g, "-");
  const cleaned = collapsed.replace(/^-+|-+$/g, "");
  return cleaned.toLowerCase() || "branch";
}

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  try {
    const answer = await new Promise<string>((resolve) => {
      rl.question(question, (value) => resolve(value));
    });
    return answer;
  } finally {
    rl.close();
  }
}

function getStashCount(): number {
  const { stdout } = run("git", ["stash", "list"]);
  const lines = stdout.split("\n").filter((l) => l.trim().length > 0);
  return lines.length;
}

function ensureGitRepo(): void {
  const { status } = run("git", ["rev-parse", "--is-inside-work-tree"], {
    allowFail: true,
  });
  if (status !== 0) {
    throw new Error(
      "Not a git repository. Please run this script inside a git repo."
    );
  }
}

function createBranch(baseName: string): string {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const yyyy = String(now.getFullYear());
  // Use hyphens in branch name to avoid slash-separated refs
  const dateHyphen = `${mm}-${dd}-${yyyy}`;
  const branch = `${toKebabCase(baseName)}-${dateHyphen}`;

  // Try creating, if exists fall back to switching
  const create = run("git", ["checkout", "-b", branch], { allowFail: true });
  if (create.status === 0) return branch;

  const switchResult = run("git", ["checkout", branch], { allowFail: true });
  if (switchResult.status === 0) return branch;

  // If both failed, append a short random suffix
  const unique = `${branch}-${Math.random().toString(36).slice(2, 8)}`;
  run("git", ["checkout", "-b", unique]);
  return unique;
}

async function main(): Promise<void> {
  try {
    ensureGitRepo();

    const nameInput = await prompt("Enter your full name: ");
    if (!nameInput.trim()) {
      throw new Error("A non-empty name is required.");
    }

    const beforeStash = getStashCount();
    run(
      "git",
      [
        "stash",
        "push",
        "-u",
        "-m",
        `auto-stash: before branch for ${nameInput}`,
      ],
      { allowFail: true }
    );
    const afterStash = getStashCount();
    const hadStash = afterStash > beforeStash;

    const branch = createBranch(nameInput);
    if (hadStash) {
      // Apply latest stash
      const apply = run("git", ["stash", "apply"], { allowFail: true });
      if (apply.status !== 0) {
        // If apply failed, try pop so the stash isn't left dangling
        run("git", ["stash", "pop"], { allowFail: true });
      }
    }

    // Stage and commit any changes
    run("git", ["add", "-A"]);
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const yyyy = String(now.getFullYear());
    const commitMsg = `chore: snapshot by ${nameInput.trim()} on ${mm}/${dd}/${yyyy}`;
    const commit = run("git", ["commit", "-m", commitMsg], { allowFail: true });
    if (commit.status !== 0) {
      // Nothing to commit is fine; proceed
    }

    // Push and set upstream
    run("git", ["push", "-u", "origin", branch]);

    // Final output for user
    process.stdout.write(`\nSuccess. Pushed branch: ${branch}\n`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`\nError: ${message}\n`);
    process.exit(1);
  }
}

void main();