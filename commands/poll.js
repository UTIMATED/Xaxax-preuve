const Discord = require('discord.js'),
    reactions = ['๐ฆ', '๐ง', '๐จ', '๐ฉ', '๐ช', '๐ซ', '๐ฌ', '๐ญ', '๐ฎ', '๐ฏ', '๐ฐ', '๐ฑ', '๐ฒ', '๐ณ', '๐ด', '๐ต', '๐ถ', '๐ท', '๐ธ', '๐น']
 
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Vous n\'avez pas le grade requis pour faire cela.')
        const [question, ...choices] = args.join(' ').split(' | ')
        if (!question) return message.channel.send('Veuillez indiquer la question ร  poser.')
        if (!choices.length) return message.channel.send('Veuillez indiquer au moins 1 choix.')
        if (choices.length > 20) return message.channel.send('Il ne peut pas y avoir plus de 20 choix.')
        message.delete()
        const sent = await message.channel.send(new Discord.MessageEmbed()
            .setTitle(question)
            .setDescription(choices.map((choice, i) => `${reactions[i]} ${choice}`).join('\n\n')))
        for (i = 0; i < choices.length; i++) await sent.react(reactions[i])
    },
    name: 'poll',
    help: {
        description: 'Cette commande permet de crรฉer des sondages. (vous pouvez mettre moins de 20 propositions)',
        syntax: '[question] | [Proposition nยฐ1] | [Proposition nยฐ2] '
    }
}