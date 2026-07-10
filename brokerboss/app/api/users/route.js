import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import Property from '@/lib/models/Property';

export async function GET() {
  try {
    await connectToDatabase();
    // Fetch all users, excluding passwords and heavy fields
    // lean() returns plain JS objects (faster than Mongoose documents)
    const users = await User.find({}, { password: 0, aadhar: 0, __v: 0 })
      .sort({ createdAt: -1 })
      .lean();
    
    // Calculate property listed count for all users
    const propertyCounts = await Property.aggregate([
      { $group: { _id: "$broker.id", count: { $sum: 1 } } }
    ]);
    const countMap = propertyCounts.reduce((acc, curr) => {
      if (curr._id) acc[curr._id] = curr.count;
      return acc;
    }, {});

    // Map them to match the admin dashboard expectations
    const formattedUsers = users.map(u => {
      const name = u.name || 'Unknown';
      const parts = name.split(' ').filter(Boolean);
      let initials = parts[0]?.[0]?.toUpperCase() || 'U';
      if (parts.length > 1) {
        initials += parts[1][0].toUpperCase();
      }

      return {
        id: u._id.toString(),
        username: name,
        phone: u.phone || 'N/A',
        location: u.city || 'Not specified',
        role: u.role || 'user',
        status: u.status || 'Active',
        propertiesListed: countMap[u._id.toString()] || 0,
        avatar: initials,
        passportPhoto: u.passportPhoto,
        image: u.image
      };
    });

    const response = NextResponse.json(formattedUsers, { status: 200 });
    // Short cache for admin — 30 seconds stale-while-revalidate
    response.headers.set('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    return response;
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
