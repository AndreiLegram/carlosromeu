const {GenAiId, botRole} = require('./lib.js')

module.exports = {

    async verifyMsg(msg) {
        var mentUsers = Object.fromEntries(msg.mentions.users) // Usuários mencionados
        if (msg.client.user.id in mentUsers) { // Se o bot foi mencionado
            if (msg.reference !== null) { // Se a mensagem é uma resposta
                return this.verifyAnswer(msg)
            } else {
                if (msg.content.includes('fala')) {
                    this.verifyFala(msg)
                } else {
                    msg.reply(`oi lindo`)
                }
            }
        }

        return false
    },

    async verifyAnswer(msg) {
        const msgAuthor = await msg.channel.guild.members.fetch(msg.author.id) // Pega o autor
        if (msgAuthor._roles.includes(botRole)) { // Se o autor tem o cargo
            const refMsg = await msg.channel.messages.fetch(msg.reference.messageID) // Pega a mensagem respondida
            if (refMsg.author.id === GenAiId) { // Se a mensagem respondida é do GenAi
                if (refMsg.content.includes('<@!')) {
                    msg.reply(`tem nome ai porra kkkkk vo tweeta nn`)
                } else {
                    return {tweet: true, data: refMsg.content}
                }
            } else if ((refMsg.author.id === msg.client.user.id && refMsg.content.includes('twitter'))) { // Se é um tweet do bot
                let msgCont = refMsg.content
                let msgId = msgCont.substring(msgCont.lastIndexOf('/') + 1)
                return {tweet: false, data: msgId}
            } else {
                msg.reply(`tem q responder meu tweet ou o carlos romeu`)
            }
        } else {
            msg.reply(`cara, tu precisa da role: <@&`+botRole+`>`)
        }

        return false
    },

    async verifyFala(msg) {
        const channel = await msg.client.channels.cache.find(channel => channel.id === msg.channel.id) // Pega o canal
        let quoteIndex = msg.content.indexOf('"') + 1
        let quoteLastIndex = msg.content.lastIndexOf('"')
        let content = msg.content.substring(quoteIndex, quoteLastIndex).trim()
        if (content.length > 0) {
            channel.send(content)
        }
    },

    async replyTweet(msg, data) {
        msg.reply('https://twitter.com/'+data.user.screen_name+'/status/'+data.id_str)
    },

    async replyDelete(msg) {
        msg.reply('deletei pprt')
    },

    async replyError(msg, data) {
        const json = false
        var msgError = "erro porra\n"
        msgError += "\`\`\`"
        if (json) {
            msgError += "json\n"
            data.errors.forEach(
                function (error) {
                    msgError += JSON.stringify(error)+"\n"
                    msg.reply(msgError)
                }
            )
        } else {
            msgError += "\n"
            msgError += data
        }
        msgError += "\`\`\`"
        msg.reply(msgError)
    }

}