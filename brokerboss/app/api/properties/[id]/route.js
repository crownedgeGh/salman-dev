import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/lib/models/Property';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    let property = await Property.findById(id).catch(() => null);
    if (!property) {
      property = await Property.findOne({ id: id }).catch(() => null);
    }
    
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    return NextResponse.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const data = await request.json();
    
    console.log("PUT started, id:", id, "data:", data);
    let property = await Property.findByIdAndUpdate(id, data, { new: true }).catch(e => { console.log('findById error', e); return null; });
    console.log("findByIdAndUpdate done, property:", property);
    if (!property) {
      console.log("Trying findOneAndUpdate");
      property = await Property.findOneAndUpdate({ id }, data, { new: true }).catch(e => { console.log('findOne error', e); return null; });
      console.log("findOneAndUpdate done");
    }
    
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    return NextResponse.json(property);
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    let property = await Property.findByIdAndDelete(id).catch(() => null);
    if (!property) {
      property = await Property.findOneAndDelete({ id }).catch(() => null);
    }
    
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}
