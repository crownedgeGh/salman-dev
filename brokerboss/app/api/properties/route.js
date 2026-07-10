import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/lib/models/Property';

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const purpose = searchParams.get('purpose');
    const locality = searchParams.get('locality');
    const admin = searchParams.get('admin');
    const limit = parseInt(searchParams.get('limit') || '200', 10);

    // Build query
    const query = {};
    if (type) query.type = { $regex: new RegExp(`^${type}$`, 'i') };
    if (purpose) query.purpose = { $regex: new RegExp(`^${purpose}$`, 'i') };
    if (locality) query.locality = { $regex: new RegExp(locality, 'i') };
    
    // Only fetch active properties for public users
    if (admin !== 'true') {
      query.status = { $nin: ['Disable', 'Sold Out'] };
    }

    // Use lean() for plain JS objects — much faster than Mongoose documents
    const properties = await Property
      .find(query)
      .select('-__v')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const response = NextResponse.json(properties);

    // Cache public property list for 60 seconds (stale-while-revalidate 120s)
    // Admin requests are not cached
    if (admin !== 'true') {
      response.headers.set(
        'Cache-Control',
        's-maxage=60, stale-while-revalidate=120'
      );
    }

    return response;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const property = await Property.create(data);
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await connectToDatabase();
    await Property.deleteMany({});
    return NextResponse.json({ message: 'All properties deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error("Error deleting all properties:", error);
    return NextResponse.json({ error: 'Failed to delete all properties' }, { status: 500 });
  }
}
