import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
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
    } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const user = await User.findById(decoded.userId).lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const savedIds = (user.savedProperties || []).map(id => id.toString());
    
    // Fetch the properties
    const properties = await Property.find({ _id: { $in: savedIds }, status: { $nin: ['Disable', 'Sold Out'] } }).sort({ createdAt: -1 }).lean();
    
    // Convert ObjectIds to strings to avoid hydration/rendering issues and ensure _id is a string
    const sanitizedProperties = properties.map(p => ({
      ...p,
      _id: p._id.toString()
    }));
    
    return NextResponse.json({ properties: sanitizedProperties });
  } catch (error) {
    console.error("Error fetching saved properties:", error);
    return NextResponse.json({ error: 'Failed to fetch saved properties' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { propertyId } = body;

    if (!propertyId) {
      return NextResponse.json({ error: 'propertyId is required' }, { status: 400 });
    }

    const user = await User.findById(decoded.userId).lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const savedProps = (user.savedProperties || []).map(id => id.toString());
    let updatedSavedProps = [];
    const targetId = propertyId.toString();

    // Toggle logic
    if (savedProps.includes(targetId)) {
      updatedSavedProps = savedProps.filter(id => id !== targetId);
    } else {
      updatedSavedProps = [...savedProps, targetId];
    }

    await User.findByIdAndUpdate(decoded.userId, {
      $set: { savedProperties: updatedSavedProps }
    });

    return NextResponse.json({ success: true, savedProperties: updatedSavedProps });
  } catch (error) {
    console.error("Error toggling saved property:", error);
    return NextResponse.json({ error: 'Failed to toggle saved property' }, { status: 500 });
  }
}
