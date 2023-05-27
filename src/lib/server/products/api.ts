import {countryToDomain} from '$lib/utils/country'
import * as amazonAPI from '$lib/server/products/amazon/api'
import * as cache from './cache'

export async function getSearchResults( keyword:string, country:string){

    // load if exists
    let results = cache.loadSearchedProducts( keyword, country)
    if(results)
        return results

    // fetch
    const domain = countryToDomain(country)
    let searchResults = await amazonAPI.getSearchResults(keyword, domain)
    results = searchResults["search_results"].map(product=>{

        return product
    })

    // save
    cache.saveSearchedProducts( keyword, country, results)

    return results

}

export async function getProductInfo( asin:string, country:string){

    // load if exists
    let results = cache.loadProductInfo( asin, country)
    if(results)
        return results

    // ============= fetch =============================
    const domain = countryToDomain(country)
    let productInfo = await amazonAPI.getProductInfo(asin, domain)
    const tempProduct = productInfo["product"]
    let reviews = [];
    if("top_reviews" in tempProduct){
        reviews = tempProduct["top_reviews"].map((review)=> review["body"].replace("Read more", ""))
    }else{
        reviews = ["No reviews found"]
    }
    let price = "";
    if("buybox_winner"in tempProduct && "price" in tempProduct["buybox_winner"]){
        const priceObj = tempProduct["buybox_winner"]["price"];
        price = `${priceObj["symbol"]}${priceObj["value"]} ${priceObj["currency"]}`
    }else{
        price = "Unknown"
    }
    
    results = {
        "asin": tempProduct["asin"],
        "title": tempProduct["title"],
        "image": tempProduct["main_image"]["link"],
        "price":price,
        "brand": tempProduct["brand"],
        "link": tempProduct["link"],
        "rating": tempProduct["rating"],
        "ratings_total": tempProduct["ratings_total"],
        // "specifications": tempProduct["specifications"],
        "feature_bullets": tempProduct["feature_bullets_flat"],
        "ai_keys":[
            "asin",
            "title",
            // "specifications",
            "feature_bullets",
        ],
        // "categories": tempProduct["categories_flat"],
        // "description": tempProduct["description"],
        // "specifications": tempProduct["specifications_flat"],
        // "reviews": reviews,
    }
    // ==============================================


    // save
    cache.saveProductInfo( asin, country, results)

    return results
}






export async function getProductReviews(asin:string, country:string){

    // load if exists
    let results = cache.loadProductReviews( asin, country)
    if(results)
        return results

    const domain = countryToDomain(country)
    let data = await amazonAPI.getReviews(asin, domain)
    results = {
        "product": data.product,
        "reviews": data.reviews,
    }

    // save
    cache.saveProductReviews( asin, country, results)

    return results
}