import {z} from 'zod'



export const searchSchema = z.object({
    keyword: z.string().min(1).max(255),
})