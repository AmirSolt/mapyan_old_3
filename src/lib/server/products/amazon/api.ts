
import {PRIVATE_AMAZON_SCRAPER_API_KEY} from '$env/static/private'
import {error} from '@sveltejs/kit'
const API_URL = 'https://api.asindataapi.com/request'



export async function getSearchResults(keyword:string, domain:string):Promise<any[]>{
    let products:any[]=[];
    const url = addQueriesToURL(API_URL, getSearchQueries(keyword, domain));
    let response = await fetch(url, {
        method: 'GET',
    })
    
    if(response.ok){
        let data = await response.json()

        if(!("search_results" in data)){
            console.log( "No search_results key in returned data")
            throw error(400, "Something went wrong!")
        }

        products = data
    }else{
        let data = await response.json()
        console.log(`There was an error in amazon search: ${data}`)
        throw error(400, "Something went wrong!")
    }
 
    return products
}



export async function getProductInfo(asin:string, domain:string):Promise<{}>{

    let product:any = {};
    const url = addQueriesToURL(API_URL, getProductQueries(asin, domain));

    let response = await fetch(url, {
        method: 'GET',
    })
    
    if(response.ok){
        let data = await response.json()

        product = data
    }else{
        let data = await response.json()
        console.log(`There was an error in Amazon getProductInfo : ${data}`)
        throw error(400, "Something went wrong!")
    }
 



    return product
}



// export async function getReviews(asin:string, domain:string){
//     let reviews:any = {};

//     const url = addQueriesToURL(API_URL, getReviewQueries(asin, domain));
//     await fetch(url, {
//         method: 'GET',
//     }).then(
//         (response) => response.json()
//     ).then((data)=>{
        
//         if(!("reviews" in data)){
            
//             throw error(400, `[reviews] key does not exist in returned data`)
//         }
        
//         reviews = data
        
//     }).catch((err)=> {
//         throw error(400, `There was an error in fetching reviews: ${err}`)
//     })
//     return reviews
// }






















function addQueriesToURL(urlRaw, queries){
    let url = new URL(urlRaw)
    Object.keys(queries).forEach(key=>{
            url.searchParams.append(key, queries[key])
        }
    )

    return url.toString()
}


function getSearchQueries(keyword:string, domain:string){
    return {
        api_key: PRIVATE_AMAZON_SCRAPER_API_KEY,
        type: "search",
        amazon_domain: domain,
        search_term: keyword,
        exclude_sponsored: "true",
        output: "json",
        include_html: "false",
        associate_id: getAffiliateCode(domain),
        sort_by: "featured",
        page: "1"
    }
}

function getProductQueries(asin:string, domain:string){
    return {
        api_key: PRIVATE_AMAZON_SCRAPER_API_KEY,
        type: "product",
        amazon_domain: domain,
        asin: asin,
        associate_id: getAffiliateCode(domain),
        output: "json",
        include_html: "false"
    }
}

function getReviewQueries(asin:string, domain:string){
    return{
        api_key: PRIVATE_AMAZON_SCRAPER_API_KEY,
        type: "reviews",
        amazon_domain: domain,
        asin: asin,
        associate_id: getAffiliateCode(domain),
        review_stars: "all_stars",
        review_formats: "all_formats",
        reviewer_type: "all",
        global_reviews: "true",
        review_media_type: "all_reviews",
        sort_by: "most_helpful",
        page: "1",
        output: "json",
        include_html: "false"
    }
}


function getAffiliateCode(domain){

    switch(domain){
        case 'amazon.com':
            return 'mapyan-20'
        case 'amazon.ca':
            return 'mapyan09-20'
        default:
            return 'mapyan09-20'
    }
}


