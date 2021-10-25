require('dotenv').config()
const twit = require('./modules/twit.js')
const disc = require('./modules/disc.js')
const { Client } = require('discord.js')
const client = new Client()

client.on('ready', () => {
    console.log(`Logado com sucesso em: ${client.user.tag}`)
})

client.on('message', async msg => {
    let discToTwit = await disc.verifyMsg(msg)
    if (discToTwit) {
        if (discToTwit.tweet) {
            let tweet = await twit.tweet(discToTwit.data)
            if (tweet.success) {
                disc.replyTweet(msg, tweet.data)
            } else {
                disc.replyError(msg, tweet.data)
            }
        } else if (discToTwit.data) {
            let tweet = await twit.deleteTweet(discToTwit.data)
            if (tweet.success) {
                disc.replyDelete(msg)
            } else {
                disc.replyError(msg, tweet.data)
            }
        }
    }
})

client.login(process.env.D_TOKEN)