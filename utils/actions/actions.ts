"use server";
import postModel from "@/models/post.model";
import dbConnect from "../dbConnect";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { IPost } from "@/app/page";
import userModel from "@/models/user.Model";

interface res {
  success: boolean;
  message: string;
}
export interface IPostRes {
  success: boolean;
  message: string;
  post: IPost;
}
export interface IPostsRes {
  success: boolean;
  message: string;
  post?: IPost[];
}

export async function createUser(values: {
  firstName: string;
  middleName: string;
  lastName: string;
  bio: string;
  address: string;
  profileImg: string;
}) {
  await dbConnect();
  const clerkUser = await currentUser();
  try {
    await new userModel({
      firstName: values.firstName,
      middleName: values.middleName,
      lastName: values.lastName,
      bio: values.bio,
      address: values.address,
      profileImg: values?.profileImg,
      clerkUserId: clerkUser?.id,
      email: clerkUser?.emailAddresses[0].emailAddress,
      onBoard: true,
    }).save();
    return {
      success: true,
      message: "SignUp successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function fetchUserByClerkUserId(clerkUserId: string) {
  try {
    const user = await userModel.findOne({ clerkUserId: clerkUserId });
    return user;
  } catch (error: any) {
    return null;
  }
}

export async function createPostAction(values: {
  title: string;
  description: string;
  image: string;
}): Promise<res> {
  const clerkUser = await currentUser();
  await dbConnect();
  try {
    const user = await userModel.findOne({ clerkUserId: clerkUser?.id });
    // update post model
    const post = await new postModel({
      title: values.title || null,
      description: values.description || null,
      image: values?.image || null,
      author: user._id,
    }).save();
    await userModel.findByIdAndUpdate(user._id, {
      $push: { posts: post._id },
    });
    revalidatePath("/");
    return {
      success: true,
      message: "Post created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function fetchPostData(): Promise<IPostsRes> {
  await dbConnect();
  try {
    const post = await postModel
      .find({})
      .populate("author")
      .sort({ createdAt: -1 });
    return {
      post,
      success: true,
      message: "post fetched successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong!",
    };
  }
}

export async function fetchUserPostData(userId: String): Promise<IPostsRes> {
  await dbConnect();
  try {
    const post = await postModel
      .find({ author: userId })
      .sort({ createdAt: -1 });
    return {
      post,
      success: true,
      message: "User post fetched successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}

export async function deletePost(id: string) {
  // TODO delete post
  await dbConnect();
  const user = await currentUser();
  try {
    // delete post data from the database
    const mongooseId: Promise<string> = await JSON.parse(id);
    if (mongooseId) {
      const post: IPost | null = await postModel
        .findById(mongooseId)
        .populate("author");
      if (post) {
        if (user?.id != post.author.clerkUserId) {
          return {
            success: false,
            message: "Not authorized!",
          };
        }
        const dbRes = await postModel.findByIdAndDelete(post._id);
        await userModel.findOneAndUpdate(
          { clerkUserId: post.author.clerkUserId },
          {
            $pull: { posts: post._id },
          }
        );
      }
    }
    revalidatePath("/");
    return {
      success: true,
      message: "Post deleted successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong.",
    };
  }
}

export async function likePost(_id: string, postId: string) {
  if (!_id || !postId) {
    return {
      success: false,
      message: "Unauthorized accessed",
    };
  }
  const post = await postModel.findById(postId);
  if (post.likes.includes(_id)) {
    await postModel.findByIdAndUpdate(
      { _id: postId },
      { $pull: { likes: _id } }
    );
  } else {
    await postModel.findByIdAndUpdate(
      { _id: postId },
      { $push: { likes: _id } }
    );
  }
  revalidatePath("/");
  return {
    success: false,
    message: "liked successfully.",
  };
}

export async function fetchPosts() {
  try {
    const post = await postModel.find({});
    return {
      data: post,
      success: true,
      message: "fetched successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
}
