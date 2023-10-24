"use client"
import React,{useState,useEffect} from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deletePost } from '@/utils/actions/actions'
import { useToast } from '@/components/ui/use-toast'

interface IParams{
    id:string,
    image:string
}


function HandlePostButton(params:IParams) {
  const {toast} = useToast();

  const handleEdit = async (id:String) => {
    alert("TODO edit functionality handlePostBtn")
  }

  const handleDelete = async (id:string,image:string) => {
    const post = await deletePost(id)
    if(post){
      await fetch(`http://localhost:3000/api/upthing?fileuri=${image}`)
    }
      toast({
        title:post?.message
      })
  }

  return (
    <div className='cursor-pointer ml-4 relative'  >
        <DropdownMenu>
            <DropdownMenuTrigger className='border-none outline-none p-1'>
                <BsThreeDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='flex flex-col gap-1 items-center justify-center absolute right-0'>
                <button className='px-3 py-1 rounded-md font-medium text-sm bg-gray-300 w-full' onClick={()=>handleEdit(params.id)} >Edit</button>
                <button className='px-3 py-1 rounded-md font-medium text-sm bg-gray-300 w-full' onClick={()=>handleDelete(params.id,params.image)} >Delete</button>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default HandlePostButton