

import {saveTable} from '$lib/server/supabase/supaDB'
import {getSBService} from '$lib/server/supabase/init'
import { json } from '@sveltejs/kit';


export const POST = async ({request}) => {
    let sbService = getSBService()
    let {tableKey, tableData} = await request.json()
    await saveTable(sbService, tableKey, tableData)

    return json({success:true})
};