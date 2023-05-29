
import {MaxCompareProducts, MinCompareProducts} from '$lib/utils/config'
import {destructTableKey} from '$lib/utils/schemas'
import {error, json} from '@sveltejs/kit'
import {generateTable} from '$lib/server/tableGenerator/init'
import {PRIVATE_HCAPTCHA_SECRET_KEY} from '$env/static/private'





export const POST = async ({request}) => {
    
    let {tableKey, productInfos, captchaToken} = await request.json()

    const { asins } = destructTableKey(tableKey)


    await checkCaptcha(captchaToken)
 
    if(asins.length<MinCompareProducts || asins.length>MaxCompareProducts){
        throw error(400, `Selected asins are crossing min or max asins: ${asins}`)
    }

    let tableData:{} = await generateTable(tableKey, productInfos)

    
    return json({
        tableData
    })

};





async function checkCaptcha(captchaToken){


    let response = await fetch('https://hcaptcha.com/siteverify', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'POST',
        body: `response=${captchaToken}&secret=${PRIVATE_HCAPTCHA_SECRET_KEY}`
    })

    if(response.ok){
        let data = await response.json()
        if(!data.success){
            console.log(data)
            throw error(400, `Captcha failed: ${data}`)
        }

    }else{
        throw error(400, "HCaptcha Failed!")
    }
}