

import {getCompare} from '$lib/server/supabase/supaDB'
import {getSBService} from '$lib/server/supabase/init'
import { json } from '@sveltejs/kit';


export const POST = async ({request}) => {
    let sbService = getSBService()
    let {tableKey} = await request.json()
    // load tableData
    let {tableData, chatResponse} = await getCompare(sbService, tableKey)
    if(tableData && chatResponse){
        return json({
            tableData,
            chatResponse
        })
    }
    
    return json({
        tableData:undefined,
        chatResponse:undefined
    })
};