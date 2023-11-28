import mongoose from "mongoose";

export interface IUserModel {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  profileImg: string;
  clerkUserId: string;
  posts: string[];
  followers: string[];
  following: string[];
  bio: string;
  address: string;
  email: string;
  onBoard: boolean;
}

const userSchema = new mongoose.Schema<IUserModel>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    profileImg: {
      type: String,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: String,
        ref: "Posts",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    bio: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    onBoard: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.models.Users || mongoose.model("Users", userSchema);
export default userModel;
