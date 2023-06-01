

import {saveChatResponse} from '$lib/server/supabase/supaDB'
import {getSBService} from '$lib/server/supabase/init'
import { json } from '@sveltejs/kit';


export const POST = async ({request}) => {
    let sbService = getSBService()
    let {tableKey, chatResponse} = await request.json()
    await saveChatResponse(sbService, tableKey, chatResponse)

    return json({success:true})
};