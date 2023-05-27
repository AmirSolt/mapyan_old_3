
import {getProductInfo} from '$lib/server/products/api'

export const POST = async ({request}) => {

    let {asin, country} = await request.json()


    await getProductInfo(asin, country)

    
    return new Response("sucess");
};