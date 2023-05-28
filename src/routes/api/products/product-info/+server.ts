
import {getProductInfo} from '$lib/server/products/api'
import { json } from '@sveltejs/kit';

export const POST = async ({request}) => {

    let {asin, country} = await request.json()


    const result = await getProductInfo(asin, country)

    
    return json({
        result
    })
};