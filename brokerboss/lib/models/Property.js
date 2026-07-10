import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  area: { type: String },
  price: { type: String },
  city: { type: String },
  locality: { type: String },
  purpose: { type: String },
  postedAt: { type: String },
  broker: {
    id: String,
    name: String,
    phone: String,
    yearsExperience: Number,
    image: String
  },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true, strict: false });

// Indexes for common query patterns — dramatically speeds up fetches
propertySchema.index({ createdAt: -1 }); // sort by newest
propertySchema.index({ isFeatured: 1, status: 1 }); // homepage featured query
propertySchema.index({ status: 1, createdAt: -1 }); // public listing query
propertySchema.index({ 'broker.id': 1 }); // broker's properties lookup
propertySchema.index({ type: 1, purpose: 1, locality: 1 }); // filter queries

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
export default Property;
