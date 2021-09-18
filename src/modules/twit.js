const Twit = require('twit')

var T = new Twit({
    consumer_key:         process.env.T_APIKEY,
    consumer_secret:      process.env.T_APISECRET,
    access_token:         process.env.T_TOKEN,
    access_token_secret:  process.env.T_TOKENSECRET,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

module.exports = {

    async tweet(tweetContent) {
        try {
            const result = await T.post('statuses/update', { status: tweetContent })
            return {success: true, data: result.data}
        } catch (ex) {
            return {success: false, data: ex}
        }
    },

    async deleteTweet(tweetId) {
        try {
            const result = await T.post('statuses/destroy/:id', { id: tweetId })
            return {success: true, data: result}
        } catch (ex) {
            return {success: false, data: ex}
        }
    }

}