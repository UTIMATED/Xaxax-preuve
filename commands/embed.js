const Discord = require('discord.js')
 
module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Mon titre')
            .setTitle('C\'est moi, UTIMATED')
            .setDescription('[Ma chaine Youtube](https://www.youtube.com/channel/UCYwO6I0HPeMUqGqrAXDab2A?view_as=subscriber) **UTIMATED**')
            .setColor('RANDOM')
            .addField('Je suis développeur en', 'node.js, python et java', true)
            .addField('ET je Suis un GAMER', 'Fortnite, Warzone, Minecraft, Among us, et Fall guys, Rocket league, GTA, Rogue company, Hyper scape et Cs go', true)
            .setAuthor('I AM A GAMER', 'https://cdn.discordapp.com/attachments/770212687581544448/802613140055523349/pp_ytb.jpg', 'https://cdn.discordapp.com/attachments/770212687581544448/802613140055523349/pp_ytb.jpg')
            .setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGoDONPIYSywkVt8xb4fwxwVDL4JmBB_Piw&usqp=CAU')
            .setThumbnail('https://cdn.discordapp.com/attachments/770212687581544448/802613140055523349/pp_ytb.jpg')
        .setFooter('Si tu lis ce message, sache que tu es bg', 'https://pa1.narvii.com/6462/c46e59316731b10d9e82c145d9b54cc621f75715_00.gif')
            .setTimestamp()
            .setURL('https://www.youtube.com/channel/UCYwO6I0HPeMUqGqrAXDab2A?view_as=subscriber'))
    },
    name: 'embed'
}