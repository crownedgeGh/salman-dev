import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Ad from '@/lib/models/Ad';

export async function GET(request) {
  try {
    await connectToDatabase();
    const ads = await Ad.find().sort({ createdAt: -1 });
    return NextResponse.json(ads);
  } catch (error) {
    console.error("Error fetching ads:", error);
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const ad = await Ad.create(data);
    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error("Error creating ad:", error);
    return NextResponse.json({ error: 'Failed to create ad' }, { status: 500 });
  }
}
