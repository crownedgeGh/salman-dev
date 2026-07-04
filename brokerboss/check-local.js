const mongoose = require('mongoose');

async function check() {
  await mongoose.connect('mongodb://127.0.0.1:27017/brokerboss');
  
  const properties = await mongoose.connection.collection('properties').find({}).toArray();
  console.log('Local properties count:', properties.length);

  await mongoose.disconnect();
}
check();
