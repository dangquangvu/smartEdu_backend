import * as mongoose from 'mongoose';
import { DbModel } from 'src/shared/constants';

const Schema = mongoose.Schema;

export const CourseDetails = new Schema({
  id_parent: {
    type: Schema.Types.ObjectId,
    ref: DbModel.COURSE,
  },
  index_session: { type: Number },
  subtitle: {
    type: String,
    required: true,
  },
  description: { type: String, required: false },
  content: { type: String, required: true },
  url_video: {
    type: String,
    required: true,
  },
  practise: [{ type: Schema.Types.ObjectId, ref: DbModel.PRACTISE }],
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});
