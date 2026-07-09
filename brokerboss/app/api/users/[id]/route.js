import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import Property from '@/lib/models/Property';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const user = await User.findById(id, { password: 0 }).lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Import Property model if not already imported
    // (We will add the import at the top next)
    const propertyCount = await Property.countDocuments({ "broker.id": id });
    
    const formattedUser = {
      ...user,
      id: user._id.toString(),
      username: user.name || 'Unknown',
      location: user.city || 'Not specified',
      role: user.role || 'user',
      status: user.status || 'Active',
      propertiesListed: propertyCount,
      avatar: (user.name || 'U').charAt(0).toUpperCase(),
      joinDate: new Date(user.createdAt).toLocaleDateString()
    };

    return NextResponse.json(formattedUser, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
