
import {getProductInfo} from '$lib/server/products/api'
import { error, json } from '@sveltejs/kit';

export const POST = async ({request}) => {

    let {asin, country} = await request.json()
    let result:{} = {}
    try{
        result = await getProductInfo(asin, country)
    
    }catch(err){
        throw error(400, `Failed to fetch product info: ${err}`)
    }
    return json({
        result
    })
};