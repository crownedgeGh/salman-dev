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
  }
}, { timestamps: true, strict: false });

// Clear the model cache to ensure schema updates are applied during Next.js HMR
if (mongoose.models.Property) {
  delete mongoose.models.Property;
}

export default mongoose.model('Property', propertySchema);
