

let productsCache = {
    searched:{},
    productInfos:{},
    productReviews:{},
}



export function loadSearchedProducts( searchTerm:string, country:string){
    const key = searchKey(searchTerm, country)
    return productsCache.searched[key]
}

export function saveSearchedProducts( searchTerm:string, country:string, results){
    const key = searchKey(searchTerm, country)
    productsCache.searched[key] = results
}


export function loadProductInfo( asin:string, country:string ){
    const key = asinKey(asin, country)
    return productsCache.productInfos[key]
}

export function saveProductInfo( asin:string, country:string, results ){
    const key = asinKey(asin, country)
    productsCache.productInfos[key] = results
}



export function loadProductReviews( asin:string, country:string ){
    const key = asinKey(asin, country)
    return productsCache.productReviews[key]
}

export function saveProductReviews( asin:string, country:string, results ){
    const key = asinKey(asin, country)
    productsCache.productReviews[key] = results  
}



function searchKey(searchTerm:string, country:string){
    return `${country}/${searchTerm}`
}
function asinKey(asin:string, country:string){
    return `${country}/${asin}`
}