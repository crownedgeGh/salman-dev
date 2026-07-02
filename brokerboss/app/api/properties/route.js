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

    // Build query
    const query = {};
    if (type) query.type = { $regex: new RegExp(type, 'i') };
    if (purpose) query.purpose = { $regex: new RegExp(purpose, 'i') };
    if (locality) query.locality = { $regex: new RegExp(locality, 'i') };

    const properties = await Property.find(query).sort({ createdAt: -1 });
    return NextResponse.json(properties);
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
