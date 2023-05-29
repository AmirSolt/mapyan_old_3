

import {getTableData} from '$lib/server/supabase/supaDB'
import {getSBService} from '$lib/server/supabase/init'
import { json } from '@sveltejs/kit';


export const POST = async ({request}) => {
    let sbService = getSBService()
    let {tableKey} = await request.json()
    // load tableData
    let tableData = await getTableData(sbService, tableKey)
    if(tableData){
        return json({
            tableData
        })
    }
    
    return json({
        tableData:undefined
    })
};