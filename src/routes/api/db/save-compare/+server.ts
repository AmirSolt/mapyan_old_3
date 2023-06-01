

import {saveCompare} from '$lib/server/supabase/supaDB'
import {getSBService} from '$lib/server/supabase/init'
import { json } from '@sveltejs/kit';


export const POST = async ({request}) => {
    let sbService = getSBService()
    let {tableKey, tableData, chatResponse} = await request.json()
    await saveCompare(sbService, tableKey, tableData, chatResponse)

    return json({success:true})
};