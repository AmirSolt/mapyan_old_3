

import {getSearchResults} from '$lib/server/products/api'
import {destructSearchTerm} from '$lib/utils/schemas'


export const load = async ({params}) => {


    const {key} = params;

    const {country, keyword} = destructSearchTerm(key)

    let products = await getSearchResults(keyword, country)

 

    return{
        searchTerm: keyword,
        products
    }
    
};