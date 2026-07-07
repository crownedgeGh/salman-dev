import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: 'user' },
  phone: { type: String, required: true, unique: true },
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
  aadhar: { type: String },
  passportPhoto: { type: String },
}, { timestamps: true, strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
