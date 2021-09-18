require('dotenv').config()
const twit = require('./modules/twit.js')
const disc = require('./modules/disc.js')
const { Client } = require('discord.js')
const client = new Client()

var userId = ''
client.on('ready', () => {
    userId = client.user.id
    console.log(`Logado com sucesso em: ${client.user.tag}`)
})

client.on('message', async msg => {
    let discMsg = await disc.verifyMsg(msg, userId)
    if (discMsg) {
        if (discMsg.tweet) {
            let tweet = await twit.tweet(discMsg.data)
            if (tweet.success) {
                disc.replyTweet(msg, tweet.data)
            } else {
                disc.replyError(msg, tweet.data)
            }
        } else if (discMsg.data) {
            let tweet = await twit.deleteTweet(discMsg.data)
            if (tweet.success) {
                disc.replyDelete(msg)
            } else {
                disc.replyError(msg, tweet.data)
            }
        }
    }
})

client.login(process.env.D_TOKEN)