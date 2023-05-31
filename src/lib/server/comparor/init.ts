
import {getResponse} from './chatgpt/init'
import {saveCompare, saveTable} from '$lib/server/supabase/supaDB'
import {convertToTableData} from './tableDataValidate'
import {error} from '@sveltejs/kit'
import {getSBService} from '$lib/server/supabase/init'
export async function generateCompare(tableKey:string, productInfos){


    let sbService = getSBService()
    let tableData:{} = {}
    


    let aiProductInfos = getAiProductInfos(productInfos)
    // generate
    console.log("ChatGPT started")
    let chatResponse = await getResponse(aiProductInfos);
    console.log("ChatGPT Finished")


    tableData = convertToTableData(productInfos)

    // save tableData
    saveCompare(sbService, tableKey, tableData, chatResponse)

    return {chatResponse, tableData}
}





function getAiProductInfos(productInfos){
    return productInfos.map(product=>{
        let r = {}
        product.ai_keys.forEach(key=>{
            r[key] = product[key]
        })
        return r
    })
}

