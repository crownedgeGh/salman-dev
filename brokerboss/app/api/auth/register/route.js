import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import path from 'path';
import fs from 'fs/promises';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

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
      
      // Ensure upload directory exists
      await fs.mkdir(UPLOAD_DIR, { recursive: true });

      // Handle file uploads
      const fileKeys = ['aadharFront', 'aadharBack', 'passportPhoto'];
      for (const key of fileKeys) {
        const file = formData.get(key);
        if (file && file.size > 0 && typeof file !== 'string') {
          const buffer = Buffer.from(await file.arrayBuffer());
          const ext = path.extname(file.name) || (file.type === 'application/pdf' ? '.pdf' : '.jpg');
          const fileName = `${Date.now()}_${key}${ext}`;
          const filePath = path.join(UPLOAD_DIR, fileName);
          await fs.writeFile(filePath, buffer);
          filePaths[key] = `/uploads/${fileName}`;
        }
      }
    } else {
      body = await request.json();
    }

    const { name, email, password, role, confirmPassword, ...otherFields } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const user = await User.create({
      name,
      email,
      role,
      ...otherFields,
      ...filePaths
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
