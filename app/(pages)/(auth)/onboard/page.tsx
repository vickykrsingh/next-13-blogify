"use client"
import React, { ChangeEvent, useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { FiImage } from 'react-icons/fi'
import imageSvg from '@/public/image-icon.svg'
import Image from 'next/image'
import { isBase64Image } from '@/lib/utils'
import { useUploadThing } from '@/lib/uploadthing'
import { createUser } from '@/utils/actions/actions'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'


function OnBoarding() {
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing("profileUploader")
  const { toast } = useToast()
  const router = useRouter()

  const formSchema = z.object({
    profileImg: z.string(),
    firstName: z.string().min(3).max(10).nonempty(),
    middleName: z.string().min(3).max(10),
    lastName: z.string().min(2).max(10).nonempty(),
    bio: z.string().min(10).max(250),
    address: z.string().min(10).max(250)
  })
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileImg: "",
      firstName: "",
      middleName: "",
      lastName: "",
      bio: "",
      address: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const blob = values.profileImg;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files)
      if (imgRes && imgRes[0].fileUrl) {
        values.profileImg = imgRes[0].fileUrl;
      }
    }
    //backend function to upload post data
    const resp = await createUser(values);
    if (resp.success) {
      toast({
        title: resp.message
      })
      form.reset()
      router.push("/")
    } else {
      toast({
        title: resp.message
      })
    }
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
    e.preventDefault()
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes('image')) return
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl)
      }
      fileReader.readAsDataURL(file)
    }
  }

  return (
    <section className='container bg-neutral-400 min-h-[90vh] rounded-lg py-5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <section className='flex items-center gap-2'>
            <Image src={imageSvg} alt='user_image' width={80} height={80} className='bg-neutral-300 rounded-full p-2' />
            <FormField
              control={form.control}
              name="profileImg"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='file' onChange={(e) => handleImage(e, field.onChange)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section className='flex flex-col md:flex-row gap-2'>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="middle name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea rows={4} className='resize-none' placeholder="bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea rows={4} className='resize-none' placeholder="address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  )
}

export default OnBoarding