const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
    Discord = require('discord.js'),
    config = require('../config.json')
 
module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas le grade requis pour faire cela !')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à emprisoner !')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez emprisonner notre créateur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas emprisonner ce membre !')
        if (!member.manageable) return message.channel.send('Je ne veux pas faire cela !')
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send('Veuillez indiquer une durée valide.')
        const reason = args.slice(2).join(' ') || 'Indiquez la raison de cette décision soldat !'
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
        message.channel.send(`${member} a été mute pendant ${humanizeDuration(duration, {language: 'fr'})} !`)
        message.guild.channels.cache.get(config.logs).send(new Discord.MessageEmbed()
            .setAuthor(`[MUTE] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Soldat', member, true)
            .addField('Par', message.author, true)
            .addField('Raison:', reason, true)
            .addField('Durée', humanizeDuration(duration, {language: 'fr'}), true)
            .setColor('RANDOM'))
        setTimeout(() => {
            if (member.deleted || !member.manageable) return
            member.roles.remove(muteRole)
            message.channel.send(`${member} a été unmute.`)
        }, duration)
    },
    name: 'tempmute',
    guildOnly: true,
    help: {
        description: 'Mettre un sourdine un membre pour une durée limitée',
        syntax: '<@membre> [durée de sourdine]'
    }
}