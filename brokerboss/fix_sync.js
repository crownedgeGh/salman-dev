import mongoose from 'mongoose';
import User from './lib/models/User.js';
import Property from './lib/models/Property.js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

async function run() {
  const users = await User.find({});
  for (const user of users) {
    const updateFields = { 'broker.name': user.name };
    if (user.passportPhoto || user.image) {
      updateFields['broker.image'] = user.passportPhoto || user.image;
    }
    if (user.phone) {
      updateFields['broker.phone'] = user.phone;
    }
    
    await Property.updateMany(
      { 'broker.id': user._id.toString() },
      { $set: updateFields }
    );
  }
  console.log("Synced all properties");
  process.exit(0);
}
run();
