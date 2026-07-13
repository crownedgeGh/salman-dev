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
  savedProperties: [{ type: String }],
}, { timestamps: true, strict: false });

// Indexes for common query patterns
userSchema.index({ role: 1, createdAt: -1 }); // broker list query
userSchema.index({ createdAt: -1 }); // sort by newest to avoid in-memory sort limit
// Note: phone already indexed via unique:true in schema definition
userSchema.index({ status: 1 }); // active users filter

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
