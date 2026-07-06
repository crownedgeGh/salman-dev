import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

export async function POST(request) {
  try {
    await connectToDatabase();
    const { phone, password } = await request.json(); // keep password to ignore it if sent by legacy form

    if (!phone) {
      return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json({ error: 'User not found. Please register.' }, { status: 404 });
    }

    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return response;
  } catch (error) {
    console.error("Error in login:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
