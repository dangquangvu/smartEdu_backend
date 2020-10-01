import * as mongoose from 'mongoose';
import { DbModel } from '../constants';
const Schema = mongoose.Schema;

const Review = new Schema({
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: DbModel.USER,
  },
  content: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  rate: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    default: 0,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});
const Album = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: DbModel.USER,
  },
  image: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

export const PARENTCOURSE = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: DbModel.USER,
  },
  id_course: {
    type: Schema.Types.ObjectId,
    //   ref course
  },
  joined: [Schema.Types.ObjectId],
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  review: [{ type: Review }],
  album: [{ type: Album }],
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});
