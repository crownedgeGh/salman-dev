require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function fixDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;

    console.log("Checking users collection for massive images...");
    const users = await db.collection('users').find({}).toArray();
    let usersUpdated = 0;
    
    for (const user of users) {
      let updateDoc = {};
      let needsUpdate = false;
      
      if (user.passportPhoto && typeof user.passportPhoto === 'string' && user.passportPhoto.length > 100000) {
        updateDoc.passportPhoto = "";
        needsUpdate = true;
      }
      if (user.image && typeof user.image === 'string' && user.image.length > 100000) {
        updateDoc.image = "";
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        await db.collection('users').updateOne({ _id: user._id }, { $unset: updateDoc });
        usersUpdated++;
      }
    }
    console.log(`Updated ${usersUpdated} users.`);

    console.log("Checking properties collection for massive broker images...");
    const properties = await db.collection('properties').find({}).toArray();
    let propertiesUpdated = 0;
    
    for (const prop of properties) {
      let updateDoc = {};
      let needsUpdate = false;
      
      if (prop.broker && prop.broker.image && typeof prop.broker.image === 'string' && prop.broker.image.length > 100000) {
        updateDoc['broker.image'] = "";
        needsUpdate = true;
      }
      
      // Some properties might have an array of images. Let's check if any property image itself is massive (base64 instead of URL)
      if (prop.images && Array.isArray(prop.images)) {
        let newImages = [];
        let imagesChanged = false;
        for (const img of prop.images) {
          if (typeof img === 'string' && img.length > 100000) {
             imagesChanged = true;
             // filter it out
          } else {
             newImages.push(img);
          }
        }
        if (imagesChanged) {
          updateDoc.images = newImages;
          needsUpdate = true;
        }
      }
      
      if (needsUpdate) {
        if (updateDoc['broker.image'] === "") {
          const unsetDoc = { 'broker.image': "" };
          delete updateDoc['broker.image'];
          
          let updateOp = {};
          if (Object.keys(updateDoc).length > 0) updateOp.$set = updateDoc;
          updateOp.$unset = unsetDoc;
          
          await db.collection('properties').updateOne({ _id: prop._id }, updateOp);
        } else {
          await db.collection('properties').updateOne({ _id: prop._id }, { $set: updateDoc });
        }
        propertiesUpdated++;
      }
    }
    console.log(`Updated ${propertiesUpdated} properties.`);
    
  } catch(e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}

fixDB();
