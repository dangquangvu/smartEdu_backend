import * as mongoose from 'mongoose';
import { DbModel } from '../constants';
const Schema = mongoose.Schema;
const SubComment = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: DbModel.USER,
  },
  id_course: {
    type: Schema.Types.ObjectId,
    //   ref course
  },
  id_parent_cmt: {
    type: Schema.Types.ObjectId,
  },
  email: {
    type: String,
    trim: true,
  },
  fullname: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  parent: {
    type: Boolean,
    default: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  isedit: {
    type: Boolean,
    default: false,
  },
  announce: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

export const Comment = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: DbModel.USER,
  },
  id_course: {
    type: Schema.Types.ObjectId,
    //   ref course
  },
  email: {
    type: String,
    trim: true,
  },
  fullname: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  parent: {
    type: Boolean,
    default: true,
  },
  reply: [{ type: SubComment }],
  like: {
    type: Number,
    default: 0,
  },
  isedit: {
    type: Boolean,
    default: false,
  },
  announce: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});
