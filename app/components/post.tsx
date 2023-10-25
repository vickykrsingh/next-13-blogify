import React from 'react'
import Image from 'next/image'
import { IPostsRes, fetchPostData } from '@/utils/actions/actions'
import HandlePostButton from './handlePostBtn'
import PostFooter from './PostFooter'
import { IUserModel } from '@/models/user.Model'
import { IPost } from '../page'

export interface Props {
    postData: IPostsRes,
    dbUser: IUserModel
}

export interface IItem {
    _id: string,
    title: string,
    description: string,
    image: string,
    likes: string[],
    comments: string[],
    author: IUserModel
}

async function Post(props: Props) {
    return (
        props?.postData?.post?.map((item: IPost) => (
            <section className='bg-gray-300 rounded-lg flex items-center justify-center p-3 mt-4'>
                <section className='w-full flex items-center justify-center'>
                    <section className='gap-1 flex flex-col w-full items-center justify-center'>
                        <div className='flex items-center justify-center flex-col w-full p-1'>
                            <div className='flex items-center gap-1 justify-start w-full'>
                                {
                                    <Image src={item.author.profileImg || props.dbUser.profileImg} width={30} alt='author image' height={30} className='rounded-full' />
                                }
                                <span className='font-medium text-sm' >{`${item.author.firstName} ${item.author.middleName} ${item.author.lastName}`}</span>
                            </div>
                            <section className='flex justify-between w-full'>
                                <div>
                                    <h3 className='font-semibold text-sm text-gray-900'>{item.title}</h3>
                                    <p className='text-xs'>{item.description}</p>
                                </div>
                                {
                                    props?.dbUser?.clerkUserId == item?.author?.clerkUserId &&
                                    <HandlePostButton id={JSON.stringify(item?._id)} image={item?.image} />
                                }
                            </section>
                        </div>
                        {
                            item?.image && <Image src={item.image} alt='post_image' priority height={800} width={800} className='rounded-lg' />
                        }
                        <PostFooter likes={JSON.stringify(item?.likes)} comments={JSON.stringify(item?.comments)} dbUserId={JSON.stringify(props?.dbUser?._id)} postId={JSON.stringify(item?._id)} />
                    </section>
                </section>
            </section>
        ))
    )
}

export default Post