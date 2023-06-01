import {getResponse} from '$lib/server/chatgpt/init'

import { PRIVATE_OPENAI_KEY } from '$env/static/private'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import { ChatCompletionRequestMessageRoleEnum } from 'openai'
import { getTokens } from '$lib/server/chatgpt/tokenizer'

import { ChatGPTInstructions, ChatGPTTemprature } from '$lib/utils/config'
import {error} from '@sveltejs/kit'



export const POST = async ({request}) => {

    let {productInfos} = await request.json()


    // ==================================================
    let aiProductInfos = getAiProductInfos(productInfos)


    // =====================MESSAGE FORMAT=============================
    const messages: ChatCompletionRequestMessage[] = [
        { role: ChatCompletionRequestMessageRoleEnum.System, content:"Products: "+JSON.stringify(aiProductInfos)},
        { role: ChatCompletionRequestMessageRoleEnum.User, content: ChatGPTInstructions}
    ]

    




    // ========================TOKEN==========================
    if (!messages) {
        throw new Error('no messages provided')
    }

    let tokenCount = 0

    messages.forEach((msg) => {
        const tokens = getTokens(msg.content)
        tokenCount += tokens
    })

    console.log("Final token Count:",tokenCount)

    if (tokenCount >= 4000) {
        throw error(400, {message: 'Token exceeds 4000'})
    }



    // =================== Moderation =================== 
    await getOpenAIModeration(JSON.stringify(messages))

    // =================== Chat ===================
    const chatRequestOpts: CreateChatCompletionRequest = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: ChatGPTTemprature,
        stream:true
    }

    const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
            Authorization: `Bearer ${PRIVATE_OPENAI_KEY}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(chatRequestOpts)
    })

    if (!chatResponse.ok) {
        const err = await chatResponse.json()
        throw error(400, err.error.message)
    }

    return new Response(chatResponse.body, {
        headers: {
            'Content-Type': 'text/event-stream'
        }
    })
};




function getAiProductInfos(productInfos){
    return productInfos.map(product=>{
        let r = {}
        product.ai_keys.forEach(key=>{
            r[key] = product[key]
        })
        return r
    })
}


const getOpenAIModeration = async (text:string) => {

    const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${PRIVATE_OPENAI_KEY}`
        },
        method: 'POST',
        body: JSON.stringify({
            input: text
        })
    })
    if (!moderationRes.ok) {
        const err = await moderationRes.json()
        throw error(400, err.error.message)
    }

    const moderationData = await moderationRes.json()
    const [results] = moderationData.results

    if (results.flagged) {
        throw error(400, 'Query flagged by openai')
    }

}