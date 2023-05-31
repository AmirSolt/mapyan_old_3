import type { SupabaseClient  } from "@supabase/supabase-js";

import {error} from '@sveltejs/kit'






export async function getCompare(sbService:SupabaseClient, tableKey:string){

    const {data, error:err} = await sbService
        .from('compares')
        .select('tableData, chatResponse')
        .eq('tableKey', tableKey)

    if(err){
        console.log(err)
        throw error(400, `DB issue: ${err.message}`)
    }

    if(data.length == 0)
        return {tableData:undefined, chatResponse:undefined}

    let tableData = data[0].tableData?? undefined
    let chatResponse = data[0].chatResponse?? undefined

    return {tableData, chatResponse}
}



export async function saveCompare(sbService:SupabaseClient, tableKey:string, tableData:{}, chatResponse:string){

    const {data, error:err} = await sbService
        .from('compares')
        .insert({tableKey, tableData, chatResponse})

    if(err){
        console.log(err)
        throw error(400, `DB issue: ${err.message}`)
    }


    return data
}


export async function saveTable(sbService:SupabaseClient, tableKey:string, tableData:{}){

    const {data, error:err} = await sbService
        .from('compares')
        .insert({tableKey, tableData})

    if(err){
        console.log(err)
        throw error(400, `DB issue: ${err.message}`)
    }


    return data
}

export async function saveChatResponse(sbService:SupabaseClient, tableKey:string, chatResponse:string){

    const {data, error:err} = await sbService
        .from('compares')
        .update({chatResponse:chatResponse})
        .eq('tableKey', tableKey)

    if(err){
        console.log(err)
        throw error(400, `DB issue: ${err.message}`)
    }
    return data
}