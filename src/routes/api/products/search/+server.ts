
import {getSearchResults} from '$lib/server/products/api'
import { json } from '@sveltejs/kit';

export const POST = async ({request}) => {

    let {keyword, country} = await request.json()


    const result = await getSearchResults(keyword, country)

    
    return json({
        result
    })
};