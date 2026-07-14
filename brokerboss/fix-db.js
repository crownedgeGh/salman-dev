import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function fix() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected");
  const db = mongoose.connection.db;
  const users = await db.collection('users').find({}).toArray();
  let fixed = 0;
  for (let u of users) {
    let changed = false;
    let update = {};
    if (u.passportPhoto && u.passportPhoto.length > 500000) {
      console.log(`User ${u.name} has massive passportPhoto: ${u.passportPhoto.length} chars`);
      update.passportPhoto = null;
      changed = true;
    }
    if (u.image && u.image.length > 500000) {
      console.log(`User ${u.name} has massive image: ${u.image.length} chars`);
      update.image = null;
      changed = true;
    }
    if (changed) {
      await db.collection('users').updateOne({ _id: u._id }, { $unset: { passportPhoto: "", image: "" } });
      fixed++;
    }
  }
  console.log(`Fixed ${fixed} users.`);
  process.exit(0);
}
fix().catch(console.error);
