require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function checkUser() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const db = mongoose.connection.db;
  const user = await db.collection('users').findOne({ name: 'Patrick Dejesus' });
  
  if (user) {
    console.log("User found:", user.name);
    console.log("Has passportPhoto:", !!user.passportPhoto);
    if (user.passportPhoto) {
      console.log("Type of passportPhoto:", typeof user.passportPhoto);
      console.log("Length of passportPhoto:", user.passportPhoto.length);
      console.log("Starts with:", user.passportPhoto.substring(0, 50));
    }
  } else {
    console.log("User not found.");
  }
  process.exit(0);
}

checkUser();
