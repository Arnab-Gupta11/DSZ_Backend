import mongoose from 'mongoose';
import { Work } from './app/modules/work/work.model.js';
import { QueryBuilder } from './app/utils/queryBuilder.js';

const statusFilter = { status: 'PUBLISHED' };
const rawQuery = { service: '6ac6006619b1c5c15f23192e' };

const queryBuilder = new QueryBuilder(Work.find(statusFilter), rawQuery)
  .filterByCategory(['status', 'service']);

console.log(queryBuilder.modelQuery.getFilter());
