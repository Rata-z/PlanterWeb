import mongoose, { ObjectId } from "mongoose";

const Schema = mongoose.Schema;
export interface Comment {
  _id: String;
  author: String;
  username?: String;
  body: String;
  date: Date;
  updated?: Date;
}

const PostSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
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
