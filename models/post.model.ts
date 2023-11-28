import mongoose, { Schema,InferSchemaType, Document, Types } from "mongoose";

export interface mongooseId {
  _id:Types.ObjectId
}

interface IPostSchema{
  title:string,
  description:string,
  image:string,
  likes:mongooseId[],
  comments:mongooseId[],
  author:mongooseId[]
}

interface IPostDocs extends IPostSchema , Document {} 

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

const postModel = mongoose.models.Posts || mongoose.model<IPostDocs>("Posts", postSchema);
export default postModel;
