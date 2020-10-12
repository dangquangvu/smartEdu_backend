import * as mongoose from 'mongoose';
import { DbModel } from '../../shared/constants';
const Schema = mongoose.Schema;

export const CommentSchema = new Schema({
         id_user_cmt: {
           type: Schema.Types.ObjectId,
           ref: DbModel.USER,
         },
         id_course: {
           type: Schema.Types.ObjectId,
           ref: DbModel.COURSE,
         },
         id_parent_cmt: {
           type: Schema.Types.ObjectId,
         },
         isparent: {
           type: Boolean,
           default: true,
         },
         content: {
           type: String,
           required: true,
           trim: true,
         },
         like: {
           type: Number,
           default: 0,
         },
         isedit: {
           type: Boolean,
           default: false,
         },
         isannounce: {
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
