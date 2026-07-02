import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  phone: { type: String },
  city: { type: String },
  firmName: { type: String },
  areasOfOperation: { type: String },
  reraNumber: { type: String },
  yearsOfExperience: { type: Number },
  bio: { type: String },
  description: { type: String },
  notes: { type: String },
  area: { type: String },
  propertyType: { type: String },
  preferredArea: { type: String },
  budgetRange: { type: String },
  propertyTypes: { type: [String] },
  status: { type: String, default: 'Active' },
}, { timestamps: true, strict: false });

// Clear the model cache to ensure schema updates are applied during Next.js HMR
if (mongoose.models.User) {
  delete mongoose.models.User;
}

export default mongoose.model('User', userSchema);
