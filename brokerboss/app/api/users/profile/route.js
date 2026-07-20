import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

export async function GET(request) {
  try {
    await connectToDatabase();

    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: 'Unauthorized or invalid token' }, { status: 401 });
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();

    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Unauthorized or invalid token' }, { status: 401 });
    }

    const data = await request.json();

    // Never allow updating password or role via this endpoint
    delete data.password;
    delete data.role;
    delete data._id;
    delete data.__v;

    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: data },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update embedded broker information in properties
    if (data.name || data.passportPhoto || data.image || data.phone) {
      const updateFields = {};
      if (data.name) updateFields['broker.name'] = data.name;
      if (data.passportPhoto || data.image) updateFields['broker.image'] = data.passportPhoto || data.image;
      if (data.phone) updateFields['broker.phone'] = data.phone;

      const Property = (await import('@/lib/models/Property')).default;
      await Property.updateMany(
        { 'broker.id': decoded.userId },
        { $set: updateFields }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
