import * as mongoose from 'mongoose';
import { DbModel } from '../constants';
const Schema = mongoose.Schema;

const CompleteCourse = new Schema({
  id_course: {
    type: Schema.Types.ObjectId,
    ref: DbModel.PARENTCOURSE,
  },
  index_Subcourse: {
    type: String,
    trim: true,
    required: true
  },
  title: {
    type: String,
    trim: true,
  },
  score: { type: Number, required:true },
});

export const ProgressUserCourse = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: DbModel.USER,
  },
  total_score: { type: Number, default: 0 },
  achived: {
    type: Array,
    default: [],
  },
  course_complete: [CompleteCourse],
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});
