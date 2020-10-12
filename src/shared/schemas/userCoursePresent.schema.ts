import * as mongoose from 'mongoose';
import { DbModel } from '../constants';
const Schema = mongoose.Schema;

export const UserCoursePresent = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: DbModel.USER,
  },
  id_parent_course: {
    type: Schema.Types.ObjectId,
    ref: DbModel.COURSE ,
  },
  index_session: { type: Number, required: true },
});
