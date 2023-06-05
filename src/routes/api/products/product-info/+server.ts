
import {getProductInfo} from '$lib/server/products/api'
import { error, json } from '@sveltejs/kit';

export const POST = async ({request}) => {

    let {asin, country} = await request.json()
    let result:ProductInfo | null = null;


    result = await getProductInfo(asin, country)
    
    return json({
        result
    })
};