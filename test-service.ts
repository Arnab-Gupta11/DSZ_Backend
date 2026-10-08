import mongoose from 'mongoose';
import './src/app/modules/service/service.model';
import { Work } from './src/app/modules/work/work.model';

mongoose.connect('mongodb+srv://dsz:DgOatfXNUTX6Hz17@stripe.sowhlx6.mongodb.net/dsz-backend?appName=stripe')
  .then(async () => {
    try {
      const filter = { service: '6ac6006619b1c5c15f231931' };
      const count = await Work.countDocuments(filter);
      console.log('Count documents with string id:', count);
    } catch (e) {
      console.error(e);
    }
    process.exit(0);
  });
