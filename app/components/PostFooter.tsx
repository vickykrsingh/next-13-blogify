"use client"
import { likePost } from '@/utils/actions/actions'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { MdComment } from 'react-icons/md'
interface IParams {
    likes: string,
    comments: string,
    dbUserId: string,
    postId: string,
}

function PostFooter(params: IParams) {
    console.log(params)
    const handleLikePost = async (userId: string, postId: string) => {
        await likePost(userId, postId)
    }
    params.likes= params.likes && JSON.parse(params?.likes) || null
    params.comments=params.comments &&  JSON.parse(params?.comments) || null
    params.dbUserId=params.dbUserId && JSON.parse(params?.dbUserId) || null
    params.postId=params.postId && JSON.parse(params?.postId) || null
    return (
        <footer className='w-full flex items-center justify-start p-1 gap-2 text-xl'>
            <div className='text-2xl px-2 cursor-pointer flex items-center justify-center gap-2 hover:scale-105 duration-75' onClick={() => handleLikePost(params.dbUserId, params.postId)} >
                {
                    params.likes.includes(params.dbUserId) ? <AiFillHeart /> : <AiOutlineHeart />
                }
                <span className='text-xs'>{params.likes.length} likes</span>
            </div>
            <div className='px-2 cursor-pointer flex items-center justify-center gap-2 hover:scale-105 duration-75 text-2xl'>
                <MdComment />
                <span className='text-xs'>{params.comments.length} comments</span>
            </div>
        </footer>
    )
}

export default PostFooter