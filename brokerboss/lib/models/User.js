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
  status: { type: String, default: 'Active' },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
