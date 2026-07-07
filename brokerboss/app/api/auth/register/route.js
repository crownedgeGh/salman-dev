import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

export async function POST(request) {
  try {
    await connectToDatabase();
    const contentType = request.headers.get('content-type') || '';
    
    let body = {};
    let filePaths = {};

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      // Parse text fields
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') {
          if (key === 'propertyTypes') {
            try { body[key] = JSON.parse(value); } catch(e) { body[key] = value; }
          } else {
            body[key] = value;
          }
        }
      }
      
      // Handle file uploads (Convert to Base64 to avoid Vercel filesystem errors)
      const fileKeys = ['aadhar', 'passportPhoto'];
      for (const key of fileKeys) {
        const file = formData.get(key);
        if (file && file.size > 0 && typeof file !== 'string') {
          const buffer = Buffer.from(await file.arrayBuffer());
          const mimeType = file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg');
          filePaths[key] = `data:${mimeType};base64,${buffer.toString('base64')}`;
        }
      }
    } else {
      body = await request.json();
    }

    const { name, phone, password, role, confirmPassword, ...otherFields } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and mobile number are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const user = await User.create({
      name,
      phone,
      role,
      ...otherFields,
      ...filePaths
    });

    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({ message: 'User registered successfully', userId: user._id, role: user.role }, { status: 201 });
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return response;
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    }, { status: 500 });
  }
}
