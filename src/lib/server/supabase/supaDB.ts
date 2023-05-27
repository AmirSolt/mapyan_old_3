
import {supabaseService} from './init'
import {error} from '@sveltejs/kit'






export async function getTable(tableKey:string){

    const {data, error:err} = await supabaseService
        .from('tables')
        .select('tableData')
        .eq('tableKey', tableKey)

    if(err){
        throw error(400, `DB issue: ${err}`)
    }


    return data
}


export async function saveTable(tableKey:string, tableData:{}){

    const {data, error:err} = await supabaseService
        .from('tables')
        .insert({tableKey, tableData})

    if(err){
        throw error(400, `DB issue: ${err}`)
    }


    return data
}