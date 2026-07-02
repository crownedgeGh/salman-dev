const mongoose = require('mongoose');

async function fixImages() {
  await mongoose.connect('mongodb://127.0.0.1:27017/brokerboss');
  console.log('Connected to DB');

  const Property = mongoose.models.Property || mongoose.model('Property', new mongoose.Schema({}, { strict: false }));

  const properties = await Property.find({});
  
  for (let p of properties) {
    p.images = [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    await p.save();
  }

  console.log(`Updated ${properties.length} properties with images.`);
  await mongoose.disconnect();
}

fixImages().catch(console.error);
