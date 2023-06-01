import {countryToDomain} from '$lib/utils/country'
import * as amazonAPI from '$lib/server/products/amazon/api'

export async function getSearchResults( keyword:string, country:string){

    let results = []

    // fetch
    const domain = countryToDomain(country)
    let searchResults = await amazonAPI.getSearchResults(keyword, domain)
    results = searchResults["search_results"]
    

    return results
}

export async function getProductInfo( asin:string, country:string){


    let results = {}
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
        "price": price,
        "brand": tempProduct["brand"],
        "link": tempProduct["link"],
        "rating": tempProduct["rating"],
        "ratings_total": tempProduct["ratings_total"],
        // "specifications": tempProduct["specifications"],
        "feature_bullets": tempProduct["feature_bullets_flat"],
        "reviews": reviews[0],
        "ai_keys":[
            "asin",
            "title",
            "price",
            "rating",
            "ratings_total",
            "feature_bullets",
            // "reviews"
            // "specifications",
        ],
        // "categories": tempProduct["categories_flat"],
        // "description": tempProduct["description"],
        // "specifications": tempProduct["specifications_flat"],
    }
    // ==============================================


    return results
}






export async function getProductReviews(asin:string, country:string){



    let results = {}
    const domain = countryToDomain(country)
    let data = await amazonAPI.getReviews(asin, domain)


    results = {
        "product": data.product,
        "reviews": data.reviews,
    }

    
    return results
}