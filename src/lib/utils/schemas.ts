import {z} from 'zod'



export const searchSchema = z.object({
    keyword: z.string().min(1).max(255),
})












export function structTableKey(country:string, asins:string[]){
    const sortedAsins = asins.sort((one, two) => (one > two ? -1 : 1));
    let key = country
    sortedAsins.forEach((asin)=>{
        key+='-'+asin
    })
    return key
}

export function destructTableKey(keyTable:string){

    const parts = keyTable.split("-")
    let country = parts[0]
    let asins = parts.slice(1)
    return {country, asins}
}






export function structSearchTerm(country:string, keyword:string){
    return `${country}-${keyword}`
}

export function destructSearchTerm(searchTerm:string){
    const params = searchTerm.split("-")
    return {country:params[0], keyword:params[1]}
}