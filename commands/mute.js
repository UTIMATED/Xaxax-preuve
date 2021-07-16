const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas le grade requis pour faire cela !')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le soldat à emprisonner !')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas emprisonner notre créateur !')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas emprisonner ce membre !')
        if (!member.manageable) return message.channel.send('Je ne veux pas faire ça !')
        const reason = args.slice(1).join(' ') || 'Indiquez la raison de cette décision soldat !'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }
        await member.roles.add(muteRole)
        message.channel.send(`${member} a été mute !`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[MUTE] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Soldat', member, true)
            .addField('Par', message.author, true)
            .addField('Raison:', reason, true)
            .setColor('RANDOM'))
    },
    name: 'mute',
    guildOnly: true,
    help: {
        description: 'Mettre en sourdine un membre',
        syntax: '<@membre>'
    }
}