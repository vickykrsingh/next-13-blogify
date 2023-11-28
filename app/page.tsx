import Post from './components/post'
import { IPostsRes, fetchPostData, fetchUserByClerkUserId } from '@/utils/actions/actions'
import { currentUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/dist/types/server'
import { IUserModel } from '@/models/user.Model'

export interface IPost{
  _id:string,
  title:string,
  description:string,
  image:string,
  likes:string[],
  comments:string[],
  author:IUserModel
}

export default async function Home() {
  const user:User|null = await currentUser()
  const post:IPostsRes= await fetchPostData()
  let dbUser;
  if(user){
    dbUser = await fetchUserByClerkUserId(user.id)
  }
  return (
    <div className='container'>
      <Post postData={post} dbUser={dbUser} />
      
    </div>
  )
}
