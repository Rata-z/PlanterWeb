import mongoose, { ObjectId } from "mongoose";

const Schema = mongoose.Schema;
export interface Comment {
  _id: String;
  author: String;
  body: String;
  date: Date;
  updated?: Date;
}

// const CommentSchema = new Schema<Comment>({
//   _id: {
//     type: Schema.Types.ObjectId,
//     default: new mongoose.Types.ObjectId(),
//   },
//   author: { type: String, required: true },
//   body: { type: String, required: true },
//   date: { type: Date, default: Date.now },
//   updated: { type: Date },
// });

const PostSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    default: [],
  },
  likes: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
});

export default mongoose.model("Post", PostSchema);
