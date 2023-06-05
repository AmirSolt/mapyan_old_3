import { error } from "@sveltejs/kit"
import {searchedProducts, productInfos} from './stores'
import { Toast, toastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings } from '@skeletonlabs/skeleton';

export async function getSearchResults(keyword:string, country:string):Promise<Product[]> {
    

    const key:string = searchKey(keyword, country)
    let result:Product[]=[];

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
        const data = await response.json()        
        const t: ToastSettings = {
            message: data.message,
        };
        toastStore.trigger(t);
        
    }


    // Save to cache
    searchedProducts.update((searchedResults)=>{
        searchedResults[key] = result
        return searchedResults
    })


    return result
}



export async function getProductInfo(asin:string, country:string):Promise<ProductInfo | null> {
    

    const key:string = asinKey(asin, country)
    let result: ProductInfo | null = null;

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
        const data = await response.json()
        const t: ToastSettings = {
            message: data.message,
        };
        toastStore.trigger(t);
    }


    // Save to cache
    productInfos.update((products)=>{
        if(result)
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




function searchKey(searchTerm:string, country:string):string{
    return `${country}/${searchTerm}`
}
function asinKey(asin:string, country:string):string{
    return `${country}/${asin}`
}