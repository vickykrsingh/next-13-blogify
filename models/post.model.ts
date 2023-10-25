import mongoose, { Schema,InferSchemaType, Document } from "mongoose";

export interface IPostSchema extends Document {
  title:string,
  description:string,
  image:string,
  likes:string[],
  comments:string[],
  author:string[]
}

const postSchema:Schema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  // { timestamps: true }
);

const postModel = mongoose.models.Posts || mongoose.model<IPostSchema>("Posts", postSchema);
export default postModel;
