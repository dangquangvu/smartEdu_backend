import * as mongoose from 'mongoose';
import { DbModel } from '../constants';
const Schema = mongoose.Schema;
export const Rate = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: DbModel.USER,
  },
  score: {
    type: Number,
    default: 0,
  },
  achievement: [
    {
      type: String,
      default: '',
    },
  ],
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});
