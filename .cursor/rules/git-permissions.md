# Git Operations Rule

## CRITICAL RULE: NEVER COMMIT WITHOUT PERMISSION

**NEVER EVER UNDER ANY CIRCUMSTANCES COMMIT WITHOUT ASKING FIRST**

### Git Command Restrictions

- **NEVER** run `git commit` commands without explicit user permission
- **NEVER** run `git push` commands without explicit user permission
- **NEVER** run `git stash` commands without explicit user permission
- **NEVER** run any git commands that modify the repository state without asking first

### Required Process

1. **ALWAYS** ask the user for permission before running any git commands
2. **WAIT** for explicit approval before proceeding
3. **EXPLAIN** what git operation you want to perform and why
4. **ONLY** proceed after receiving clear permission

### Allowed Without Permission

- `git status` (read-only)
- `git log` (read-only)
- `git diff` (read-only)
- Other read-only git operations

### Emergency Override

- **NONE** - There are no circumstances where committing without permission is acceptable

**REMEMBER: The user's git repository is sacred. Always ask first!**
