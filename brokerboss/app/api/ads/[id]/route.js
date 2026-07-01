import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Ad from '@/lib/models/Ad';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const ad = await Ad.findById(id);
    if (!ad) return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    return NextResponse.json(ad);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ad' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const data = await request.json();
    const ad = await Ad.findByIdAndUpdate(id, data, { new: true });
    if (!ad) return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    return NextResponse.json(ad);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update ad' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const ad = await Ad.findByIdAndDelete(id);
    if (!ad) return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    return NextResponse.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete ad' }, { status: 500 });
  }
}
