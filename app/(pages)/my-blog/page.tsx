import { IPostsRes, fetchUserByClerkUserId, fetchUserPostData } from '@/utils/actions/actions'
import React from 'react'
import { currentUser } from '@clerk/nextjs'
import Post from '@/app/components/post'
import { User } from '@clerk/nextjs/dist/types/server'
import { IUserModel } from '@/models/user.Model'

async function MyBlog() {
  const user:User|null = await currentUser()

  if(!user){
    return <p>Not loggedIn</p>
  }
  const dbUser:IUserModel = await fetchUserByClerkUserId(user?.id)
  const post:IPostsRes|undefined = await fetchUserPostData(dbUser._id)

  return (
    <section className='container'>
      <Post postData={post} dbUser={dbUser} />
    </section>
  )
}

export default MyBlog