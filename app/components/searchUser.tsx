"use client"
import React, { ChangeEvent, SetStateAction, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { searchUserByName } from '@/utils/actions/actions'
import SearchedUser from './SearchedUser'
import { IUserModel } from '@/models/user.Model'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  message: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function SearchUser() {
  const [user,setUser] = useState<IUserModel[]>([])
  const {toast} = useToast()
    const form = useForm({
        defaultValues:{
            message:""
        },
        resolver:zodResolver(formSchema)
    })
    async function onSubmit(values:z.infer<typeof formSchema>){
      console.log('hello world')
        try {
          const tempUser = await searchUserByName(values.message)
          console.log(tempUser)
          tempUser.user && setUser(tempUser?.user)
          if(!tempUser){
            toast({
              title:"Not found"
            })
          }
        } catch (error) {
          toast({
            title:"Something went wrong"
          })
        }
    }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mt-3">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-0' type="submit">Submit</Button>
        <section className='flex flex-col gap-2'>
        {user && <SearchedUser user={JSON.stringify(user)} />}
        </section>
      </form>
    </Form>
  )
}

export default SearchUser