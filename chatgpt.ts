// import { ChatGPTAPI, getOpenAIAuth } from 'chatgpt'
// let email: string = ""
// let password: string = ""


// async function gpt(chat: string = "halo") {
//     const openAIAuth = await getOpenAIAuth({
//         email: email,
//         password: password
//     })

//     const api = new ChatGPTAPI({ ...openAIAuth })
//     await api.ensureAuth()

//     const response = await api.sendMessage(chat)

//     console.log(response)
//     return response
// }

// export { gpt, ChatGPTAPI, getOpenAIAuth }