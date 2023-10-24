"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { createFormSchema } from "@/utils/zodschema/createFormSchema"
import * as z from 'zod'
import { Textarea } from "@/components/ui/textarea"
import { createPostAction } from "@/utils/actions/actions"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { useState } from "react"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"
import { useToast } from "@/components/ui/use-toast"


export default function CreatePost() {
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing("imageUploader")
  const { toast } = useToast()

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
    resolver: zodResolver(createFormSchema),
  })

  async function onSubmit(values: z.infer<typeof createFormSchema>) {
    const blob = values.image;
    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files)
      if (imgRes && imgRes[0].fileUrl) {
        values.image = imgRes[0].fileUrl;
      }
    }
    //backend function to upload post data
    const resp = await createPostAction(values);
    if (resp.success) {
      toast({
        title: resp?.message
      })
      form.reset()
      values.image = ""
    } else {
      toast({
        title: resp?.message
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea rows={4} placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="image" type="file" onChange={(e) => handleImage(e, field.onChange)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
