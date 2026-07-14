require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function fixUser() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  
  const result = await db.collection('users').updateOne(
    { name: 'Patrick Dejesus' },
    { $unset: { passportPhoto: "" } }
  );
  
  console.log("Modified:", result.modifiedCount);
  process.exit(0);
}

fixUser();
