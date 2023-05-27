

import {getSearchResults} from '$lib/server/products/api'


export const load = async ({params, url}) => {


    const country = url.searchParams.get('country') || 'US';
    const {key} = params;



    let products = await getSearchResults(key, country)

 

    return{
        searchTerm: key,
        products
    }
    
};