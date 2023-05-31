import type { SupabaseClient  } from "@supabase/supabase-js";

import {error} from '@sveltejs/kit'






export async function getTableData(sbService:SupabaseClient, tableKey:string){

    const {data, error:err} = await sbService
        .from('tables')
        .select('tableData')
        .eq('tableKey', tableKey)

    if(err){
        console.log(err)
        throw error(400, `DB issue: ${err.message}`)
    }

    if(data.length == 0)
        return undefined

    return data[0].tableData
}


export async function saveTable(sbService:SupabaseClient, tableKey:string, tableData:{}){

    const {data, error:err} = await sbService
        .from('tables')
        .insert({tableKey, tableData})


    if(err){
        console.log(err)
        throw error(400, `DB issue: ${err.message}`)
    }


    return data
}