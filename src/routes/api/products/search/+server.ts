
import {getSearchResults} from '$lib/server/products/api'
import { error, json } from '@sveltejs/kit';

export const POST = async ({request}) => {

    let {keyword, country} = await request.json()
    let result:Product[] = []



    result = await getSearchResults(keyword, country)

    return json({
        result
    })
};