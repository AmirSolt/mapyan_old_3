
import {MaxCompareProducts, MinCompareProducts} from '$lib/utils/config'
import {destructTableKey} from '$lib/utils/schemas'
import {getProductInfo} from '$lib/server/products/api'
import {error} from '@sveltejs/kit'
import {generateTable} from '$lib/server/tableGenerator/init'

export const load = async ({params}) => {
    
    const {key} = params;
    const tableKey = key;
    let { country, asins } = destructTableKey(key)

    if(asins.length<MinCompareProducts || asins.length>MaxCompareProducts){
        throw error(400, `Selected asins are crossing min or max asins: ${asins}`)
    }

    let productInfos = await Promise.all(asins.map( asin => getProductInfo(asin, country)))

    let tableData = await generateTable(tableKey, productInfos)

    
    return{
        tableData
    }

};