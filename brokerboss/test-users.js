import mongoose from 'mongoose';
import connectToDatabase from './lib/mongodb.js';
import User from './lib/models/User.js';

async function check() {
  await connectToDatabase();
  const users = await User.find().sort({createdAt:-1}).limit(5);
  for (const u of users) {
    console.log(`User: ${u.name}`);
    if (u.passportPhoto) {
      console.log(`passportPhoto type: ${typeof u.passportPhoto}, length: ${u.passportPhoto.length}`);
      console.log(`Prefix: ${u.passportPhoto.substring(0, 50)}`);
    } else {
      console.log(`passportPhoto: undefined or empty`);
    }
    if (u.image) {
      console.log(`image type: ${typeof u.image}, length: ${u.image.length}`);
      console.log(`Prefix: ${u.image.substring(0, 50)}`);
    }
  }
  process.exit(0);
}
check();
