// // ================= ONE LINK dosnt work with amazon products. Dumbasses can't do anyth right

const ONELINK_DOMAIN = "www.amazon.com"
const ONELINK_AFFILIATE_CODE = "mapyan-20"


export function swapUrlWithAFfiliate(asin:string){
    return `https://${ONELINK_DOMAIN}/dp/${asin}?tag=${ONELINK_AFFILIATE_CODE}&linkCode=gg2`
}
