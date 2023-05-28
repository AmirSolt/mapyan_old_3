
import {supabaseService} from './init'
import {error} from '@sveltejs/kit'






export async function getTableData(tableKey:string){

    const {data, error:err} = await supabaseService
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


export async function saveTable(tableKey:string, tableData:{}){

    const {data, error:err} = await supabaseService
        .from('tables')
        .insert({tableKey, tableData})

    if(err){
        console.log(err)
        throw error(400, `DB issue: ${err.message}`)
    }


    return data
}