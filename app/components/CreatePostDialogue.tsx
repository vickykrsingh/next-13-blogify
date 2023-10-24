"use client"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreatePost from "./CreatePost"
import { useState } from "react"
import { AiOutlinePlusCircle } from 'react-icons/ai'

export default function CreatePostDialogue() {
  const [modalStatus, setModalStatus] = useState(true)
  return (
    <Dialog>
      <DialogTrigger className="hidden md:block" >Create</DialogTrigger>
      <DialogTrigger className="block md:hidden text-2xl text-orange-600">
        <AiOutlinePlusCircle />
      </DialogTrigger>
      <DialogContent>
        <CreatePost />
      </DialogContent>
    </Dialog>
  )
}
