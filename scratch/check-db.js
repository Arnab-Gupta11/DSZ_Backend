import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  
  const services = await db.collection('services').find({}).toArray();
  console.log('Services:', services.map(s => ({ id: s._id, title: s.title })));

  const articles = await db.collection('articles').find({}).toArray();
  console.log('Articles categories:', articles.map(a => ({ _id: a._id, title: a.title, category: a.category })));

  mongoose.disconnect();
}
run().catch(console.error);
