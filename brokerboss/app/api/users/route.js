import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import Property from '@/lib/models/Property';

export async function GET() {
  try {
    await connectToDatabase();
    // Fetch all users, excluding passwords
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    
    // Calculate property listed count for all users
    const propertyCounts = await Property.aggregate([
      { $group: { _id: "$broker.id", count: { $sum: 1 } } }
    ]);
    const countMap = propertyCounts.reduce((acc, curr) => {
      if (curr._id) acc[curr._id] = curr.count;
      return acc;
    }, {});

    // Map them to match the admin dashboard expectations
    const formattedUsers = users.map(u => ({
      id: u._id.toString(),
      username: u.name || 'Unknown',
      phone: u.phone || 'N/A',
      location: u.city || 'Not specified',
      role: u.role || 'user',
      status: u.status || 'Active',
      propertiesListed: countMap[u._id.toString()] || 0,
      avatar: (u.name || 'U').charAt(0).toUpperCase()
    }));

    return NextResponse.json(formattedUsers, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await connectToDatabase();
    await User.deleteMany({});
    return NextResponse.json({ message: 'All users deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting all users:", error);
    return NextResponse.json({ error: 'Failed to delete all users' }, { status: 500 });
  }
}
