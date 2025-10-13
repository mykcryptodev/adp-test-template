import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const filePath = path.join(process.cwd(), 'market_data.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error reading market_data.json:', error);

    return NextResponse.json({ error: 'Failed to load market data' }, { status: 500 });
  }
}
