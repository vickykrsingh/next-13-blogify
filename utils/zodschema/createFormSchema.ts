import * as z from 'zod'

export const createFormSchema = z.object({
    title:z.string().nonempty().min(5).max(75),
    description:z.string().min(10).max(450),
    image:z.string(),
})