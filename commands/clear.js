module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas le grade requis pour faire cela soldat !')
        const count = args[0]
        if (!/\d+/.test(count)) return message.channel.send('Veuillez indiquer un nombre de messages à supprimer.')
        if (count < 1 || count > 99) return message.channel.send('Le nombre de message doit être compris entre 1 et 99.')
        const { size } = await message.channel.bulkDelete(Number(count) + 1, true)
        message.channel.send(`${size - 1} messages ont été supprimés !`).then(sent => sent.delete({timeout: 5e3}))
    },
    name: 'clear',
    guildOnly: true,
    name: 'clear',
    help: {
        description: 'Supprime des messages',
        syntax: '[nombre de messages]'
    }
}