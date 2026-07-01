import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true }, // e.g., 'Banner', 'Sponsored Property'
  status: { type: String, default: 'Active' },
  impressions: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  budget: { type: Number },
  locationTarget: { type: String },
}, { timestamps: true });

export default mongoose.models.Ad || mongoose.model('Ad', adSchema);
