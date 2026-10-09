import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const categoryMap = {
  'Marketing Tips': '6ac6006619b1c5c15f23192f',
  'AI Tools': '6ac6006619b1c5c15f231933',
  'Case Studies': '6ac6006619b1c5c15f23192e',
  'DSZ News': '6ac6006619b1c5c15f23192e'
};

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;

  const articles = await db.collection('articles').find({}).toArray();
  for (const article of articles) {
    if (typeof article.category === 'string' && categoryMap[article.category]) {
      const newCategoryId = new mongoose.Types.ObjectId(categoryMap[article.category]);
      await db.collection('articles').updateOne(
        { _id: article._id },
        { $set: { category: newCategoryId } }
      );
      console.log(`Updated article ${article.title} category to ${categoryMap[article.category]}`);
    }
  }

  console.log('Migration completed.');
  mongoose.disconnect();
}
run().catch(console.error);
