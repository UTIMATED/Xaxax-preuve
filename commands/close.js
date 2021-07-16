const fs = require('fs')
 
module.exports = {
    run: async (message, args, client) => {
        const channel = message.mentions.channels.first() || message.channel
        if (!client.db.tickets[channel.id]) return message.channel.send('Ce salon n\'est pas un ticket.')
        if (!message.member.hasPermission('MANAGE_MESSAGES') && client.db.tickets[channel.id].author !== message.author.id) return message.channel.send('Vous ne pouvez pas décliner son appel aux capitaines !')
        delete client.db.tickets[channel.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        await message.channel.send(`L'appel ${channel.name} a été décliné !`)
        channel.delete()
    },
    name: 'close',
    guildOnly: true,
    help: {
        description: 'Fermer un ticket',
        syntax: '[#nom du salon de ticket]'
    }
}