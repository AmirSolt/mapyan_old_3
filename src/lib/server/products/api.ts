import {countryToDomain} from '$lib/utils/country'
import * as amazonAPI from '$lib/server/products/amazon/api'
import { error } from '@sveltejs/kit'

export async function getSearchResults( keyword:string, country:string):Promise<Product[]>{

    let result: Product[] = []

    // fetch
    const domain = countryToDomain(country)
    let fetchedSearchResults: any = {};

    try{
        fetchedSearchResults = await amazonAPI.getSearchResults(keyword, domain)
    }catch(err){
        console.log("Could not fetch search results: ",err)
        throw error(400, "Something went wrong")
    }
    
    try{
        let fetched:any[] = fetchedSearchResults["search_results"]??[]
       
        result = fetched.map((product:any)=>{            
            return {
                asin: product.asin,
                image: product.image??"",
                brand: product.brand??"",
                link: product.link??"",
                title: product.title??"Uknown",
                rating: product.rating??-1,
                ratings_total: product.ratings_total??-1,
                prices: Array.isArray(product.prices) ? product.prices.map((temp:any)=>convertToPrice(temp)) : [],
                price: convertToPrice(product.price),
            }
        })
    }catch(err){

        console.log("Could not clean search results: ",err)
        throw error(400, "Something went wrong")
    }
    

    return result
}

export async function getProductInfo( asin:string, country:string):Promise<ProductInfo | null>{


    let result: ProductInfo | null = null;
    const domain = countryToDomain(country)
    
    let fetchedProductInfo:any = {}

    try{
        fetchedProductInfo = await amazonAPI.getProductInfo(asin, domain)
    }catch(err){
        console.log("Could not fetch product info: ",err)
        throw error(400, "Something went wrong")
    }

    try{
        // ============= clean from amazon api =============================
        
        const tempProduct = fetchedProductInfo["product"]
        let reviews = [];
        if("top_reviews" in tempProduct){
            reviews = tempProduct["top_reviews"].map((review:any)=> review["body"].replace("Read more", ""))
        }else{
            reviews = ["No reviews found"]
        }
        let price:Price = {symbol:"$",value:-1,currency:"USD"};
        if("buybox_winner"in tempProduct && "price" in tempProduct["buybox_winner"]){
            const priceObj = tempProduct["buybox_winner"]["price"];
            price = convertToPrice(priceObj)
        }
        // ================================================
    
        result = {
            asin: tempProduct["asin"],
            title: tempProduct["title"]?? "Unkown",
            image: tempProduct["main_image"]["link"]?? '',
            price: price,
            brand: tempProduct["brand"]??'',
            link: tempProduct["link"]??'',
            rating: tempProduct["rating"]??-1,
            ratings_total: tempProduct["ratings_total"]??-1,
            feature_bullets: tempProduct["feature_bullets_flat"]??"Unknown",

            // "specifications": tempProduct["specifications"],
            // "reviews": reviews[0],
            // "categories": tempProduct["categories_flat"],
            // "description": tempProduct["description"],
            // "specifications": tempProduct["specifications_flat"],
            // ==============================================
        }
    
    }catch(err){
        console.log("Could not clean product info")
        throw error(400, "Something went wrong")
    }


    return result
}






// export async function getProductReviews(asin:string, country:string){



//     let results = {}
//     const domain = countryToDomain(country)
//     let data = await amazonAPI.getReviews(asin, domain)


//     results = {
//         "product": data.product,
//         "reviews": data.reviews,
//     }

    
//     return results
// }





function convertToPrice(rawPrice:any):Price{
    let price:Price = {symbol:"$",value:-1,currency:"USD"};

    if(rawPrice && rawPrice["symbol"]
        && rawPrice["value"]
        && rawPrice["currency"]){
            
            price.symbol = rawPrice["symbol"]
            price.value = rawPrice["value"]
            price.currency = rawPrice["currency"]
        }


    return price
}