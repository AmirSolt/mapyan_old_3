
import {getResponse} from './chatgpt/init'
import {getTableData, saveTable} from '$lib/server/supabase/supaDB'
import {convertToTableData} from './tableDataValidate'
import {error} from '@sveltejs/kit'
export async function generateTable(tableKey:string, productInfos){


    // load tableData
    let tableData = await getTableData(tableKey)
    if(tableData){
        return tableData
    }


    let aiProductInfos = getAiProductInfos(productInfos)
    // generate
    console.log("ChatGPT started")
    let chatResponse = await getResponse(aiProductInfos);
    console.log("ChatGPT Finished")


    tableData = convertToTableData(chatResponse, productInfos)


    console.log("tableData",tableData)
    catchBadTableData(tableData)

    // save tableData
    saveTable(tableKey, tableData)

    return tableData
}



function catchBadTableData(tableData){
    tableData.forEach(table=>{
        if(!("response" in table))
            throw error(400, "AI response failed")
    })
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