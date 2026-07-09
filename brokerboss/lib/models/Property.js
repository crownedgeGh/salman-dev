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

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
export default Property;
