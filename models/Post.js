import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const PostSchema = new Schema({
    title: String,
    detail: String,
    dateCreated: {
      type: Date,
      default: Date.now,
    },
});

const Post = model('Post', PostSchema);
export default Post;