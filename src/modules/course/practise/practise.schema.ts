import * as mongoose from 'mongoose';
import { DbModel } from 'src/shared/constants';
import { getStringEnumValues } from 'src/shared/helper';
import { check_answer } from 'src/shared/interfaces/db.interface';
const Schema = mongoose.Schema;

export const Practise = new Schema({
  id_course: {
    type: Schema.Types.ObjectId,
    ref: DbModel.COURSE,
  },
  index: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  check_answer: {
    type: String,
    enum: getStringEnumValues(check_answer),
    default: '',
  },
  checked_true: {
    type: Boolean,
    default: false,
  },
  score: { type: Number, default: 0 },
});
