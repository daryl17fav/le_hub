import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    return NextResponse.json({ message: 'Profiles endpoint skeleton' });
}

export async function POST(request: Request) {
    return NextResponse.json({ message: 'Create Profile endpoint skeleton' });
}
