import * as mongoose from 'mongoose';
import { DbModel } from 'src/shared/constants';
import { getStringEnumValues } from 'src/shared/helper';
import { check_answer } from 'src/shared/interfaces/db.interface';
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
  url_video: {
    type: String,
    required: false,
  },
  practise: [{ type: Schema.Types.ObjectId, ref: DbModel.COURSE }],
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});
