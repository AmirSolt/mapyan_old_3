
import {getSearchResults} from '$lib/server/products/api'
import { error, json } from '@sveltejs/kit';

export const POST = async ({request}) => {

    let {keyword, country} = await request.json()
    let result:[] = []


    throw error(400, "Test error")

    try{
        result = await getSearchResults(asin, country)
    
    }catch(err){
        throw error(400, `Failed to fetch search: ${err}`)
    }
    

    return json({
        result
    })
};