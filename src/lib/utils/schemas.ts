import {z} from 'zod'



export const searchSchema = z.object({
    keyword: z.string().min(1).max(255),
})












export function structTableKey(asins:string[]){
    const sortedAsins = asins.sort((one, two) => (one > two ? -1 : 1));
    return sortedAsins.join('-')
}

export function destructTableKey(keyTable:string){
    const asins = keyTable.split("-")
    return {asins}
}

