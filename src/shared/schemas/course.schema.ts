import * as mongoose from 'mongoose';
import { DbModel } from '../constants';
import { getStringEnumValues } from '../helper';
import { check_answer } from '../interfaces/db.interface';
const Schema = mongoose.Schema;

const Practise = new Schema({
  id_course: {
    type: Schema.Types.ObjectId,
    ref: DbModel.PARENTCOURSE,
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

export const Course = new Schema({
  id_parent: {
    type: Schema.Types.ObjectId,
    ref: DbModel.PARENTCOURSE,
  },
  index_session: { type: Number },
  subtitle: {
    type: String,
    required: true,
  },
  url_video: {
    type: String,
    required: true,
  },
  practise: [{ type: Practise}],
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});
