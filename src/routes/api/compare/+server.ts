
import {MaxCompareProducts, MinCompareProducts} from '$lib/utils/config'
import {destructTableKey} from '$lib/utils/schemas'
import {error, json} from '@sveltejs/kit'
import {generateTable} from '$lib/server/tableGenerator/init'





export const POST = async ({request}) => {
    
    let {tableKey, productInfos} = await request.json()

    const { asins } = destructTableKey(tableKey)


 
    if(asins.length<MinCompareProducts || asins.length>MaxCompareProducts){
        throw error(400, `Selected asins are crossing min or max asins: ${asins}`)
    }

    let tableData:{} = await generateTable(tableKey, productInfos)

    
    return json({
        tableData
    })

};





