import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (email === 'nugrah@gmail.com' && password === '123456') {
      return NextResponse.json({ message: 'Login berhasil' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Email atau password salah' }, { status: 401 });
  } catch {
    return NextResponse.json({ message: 'Request tidak valid' }, { status: 400 });
  }
}
