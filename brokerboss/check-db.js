const mongoose = require('mongoose');

async function check() {
  await mongoose.connect('mongodb+srv://infocrownedge_db_user:asad0909@cluster0.27bxita.mongodb.net/brokerboss');
  
  const users = await mongoose.connection.collection('users').find({}).toArray();
  console.log('users:', JSON.stringify(users, null, 2));

  await mongoose.disconnect();
}
check();
