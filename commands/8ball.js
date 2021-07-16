const Discord = require('discord.js'),
    replies = ['Oui', 'Non', 'Peut être', 'Evidemment']
 
module.exports = {
    run: (message, args) => {
        const question = args.join(' ')
        if (!question) return message.channel.send('Veuillez me poser une question soldat!')
        message.channel.send(new Discord.MessageEmbed()
            .setTitle(question)
            .setDescription(replies[Math.floor(Math.random() * replies.length)]))
    },
    name: '8ball',
    help: {
        description: 'Cette commande permet au bot de répondre à un question de manière aléatoire',
        syntax: 'question à poser'
    }
}