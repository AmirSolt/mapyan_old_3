import { error } from "@sveltejs/kit"
import {searchedProducts, productInfos} from './stores'

export async function getSearchResults(keyword:string, country:string) {
    

    const key = searchKey(keyword, country)

    let result:[] = []

    // Load from cache
    searchedProducts.subscribe((searchedResults)=>{
        result = searchedResults[key]
    })
    if(result){
        return result
    }


    const response = await fetch('/api/products/search', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            keyword,
            country
        })
    })
    if(response.ok){
        const data = await response.json()
        result = data.result

    }else{
        throw error(400, "failed to fetch search data")
    }


    // Save to cache
    searchedProducts.update((searchedResults)=>{
        searchedResults[key] = result
        return searchedResults
    })


    return result
}



export async function getProductInfo(asin:string, country:string) {
    

    const key = asinKey(asin, country)

    let result = {}

    // Load from cache
    productInfos.subscribe((products)=>{
        result = products[key]
    })
    if(result){
        return result
    }


    const response = await fetch('/api/products/product-info', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            asin,
            country
        })
    })
    if(response.ok){
        const data = await response.json()
        result = data.result

    }else{
        throw error(400, "failed to fetch product info data")
    }


    // Save to cache
    productInfos.update((products)=>{
        products[key] = result
        return products
    })

    return result
}






export function checkProductInfosStore(asins:string[], country:string){

    let isReady:boolean = true;

    asins.forEach(asin=>{
        if(!queryStoresProductInfo(asin,country))
            isReady = false
    })

    return isReady
}

export function queryStoresProductInfo(asin:string, country:string) {

    const key = asinKey(asin, country)
    let result;
    productInfos.subscribe((products)=>{
        result = products[key]
    })
    return result
}








function searchKey(searchTerm:string, country:string){
    return `${country}/${searchTerm}`
}
function asinKey(asin:string, country:string){
    return `${country}/${asin}`
}