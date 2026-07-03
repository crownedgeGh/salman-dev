import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/lib/models/Property';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';

export async function GET(request) {
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

    const userId = decoded.userId?.toString();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Match properties where broker.id equals the authenticated user's id
    const properties = await Property.find({ 'broker.id': userId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error fetching user properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}
