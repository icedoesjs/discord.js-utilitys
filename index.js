const { MessageEmbed } = require('discord.js');

const perms = [
    "CREATE_INSTANT_INVITE",
    "KICK_MEMBERS",
    "BAN_MEMBERS",
    "ADMINISTRATOR",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "ADD_REACTIONS",
    "VIEW_AUDIT_LOG",
    "PRIORITY_SPEAKER",
    "STREAM",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "SEND_TTS_MESSAGES",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "READ_MESSAGE_HISTORY",
    "MENTION_EVERYONE",
    "USE_EXTERNAL_EMOJIS",
    "VIEW_GUILD_INSIGHTS",
    "CONNECT",
    "SPEAK",
    "MUTE_MEMBERS",
    "DEAFEN_MEMBERS",
    "MOVE_MEMBERS",
    "USE_VAD",
    "CHANGE_NICKNAME",
    "MANAGE_NICKNAMES",
    "MANAGE_ROLES",
    "MANAGE_WEBHOOKS",
    "MANAGE_EMOJIS",
	"NONE"
];

let playing = false;




class DJSPlus {
    constructor(client) {
        this.client = client;
    }

    async awaitResponse(message, content, limit = 60000, useEmbed = false) {
        const filter = m => m.author.id === message.author.id;
        let embed = new MessageEmbed()
        if (useEmbed) {
            embed.setColor(content.color)
            embed.setAuthor(content.title)
            embed.setDescription(content.description)
        } else if (!useEmbed) {
            embed = content
        }
        await message.channel.send(embed);
        try {
            const col = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"]});
            return col.first().content;
        } catch(e) {
            return false;
        }
    }

    async awaitMention(message, content, limit=60000, useEmbed = false) {
        const filter = m => m.author.id === message.author.id;
        let embed = new MessageEmbed()
        if (useEmbed) {
            embed.setColor(content.color)
            embed.setAuthor(content.title)
            embed.setDescription(content.description)
        } else if (!useEmbed) {
            embed = content
        }
        await message.channel.send(embed);
        try {
            const col = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"]});
            return col.first().mentions;
        } catch(e) {
            return false;
        }
    }

    async checkPermission(message, permission, return_message, useEmbed = false) {
        if (!perms.includes(permission)) throw `Invalid permission provided, permissions can be found here: https://discord.com/developers/docs/topics/permissions`;
        const embed = new MessageEmbed();
        if (useEmbed) {
            embed.setColor(return_message.color);
            embed.setAuthor(return_message.title);
            embed.setDescription(return_message.description)
        } else if (!useEmbed) {
            embed = return_message;
        }

        var perms = message.member.hasPermission(permission)
        if (!perms) {
            return message.channel.send(embed);
        } else {
            return true;
        } 
    }

    async checkPermissionFor(message, permission, channel_id, return_message, useEmbed = false) {
        if (!perms.includes(permission)) throw `Invalid permission provided, permissions can be found here: https://discord.com/developers/docs/topics/permissions`;
        const embed = new MessageEmbed();
        if (useEmbed) {
            embed.setColor(return_message.color);
            embed.setAuthor(return_message.title);
            embed.setDescription(return_message.description);
        } else if (!useEmbed) {
            embed = return_message;
        }

        var chan = message.guild.channels.cache.get(channel_id);
        if (!chan) throw `Couldn't find the channel provided.`;
        var chan_perms = chan.permissionsFor(message.author);
        if (!chan_perms.has(permission)) {
            return message.channel.send(embed)
        } else {
            return true;
        }
    }

    async delThis(message, content, time = 10000, useEmbed = false) {
        let embed = new MessageEmbed();
        if (useEmbed) {
            embed.setColor(content.color);
            embed.setAuthor(content.title);
            embed.setDescription(content.description)
        } else if (!useEmbed) {
            embed = content;
        }
        return message.channel.send(embed).then(del => del.delete({ timeout: time }));
    }

    async awaitEmoji(message, content, time = 60000, useEmbed= false) {
        const filter = (reaction, user) => { return user.id === message.author.id };
        let embed = new MessageEmbed();
        if (useEmbed) {
            embed.setColor(content.color);
            embed.setAuthor(content.title);
            embed.setDescription(content.description);
        } else if (!useEmbed) {
            embed = content;
        }
        let buffer = await message.channel.send(embed)
        try {
            const c = await buffer.awaitReactions(filter, { max: 1, time: time, errors: ["time"]});
            return c.first().emoji
        } catch(e) {
            return false;
        }
    }

    async awaitEmojis(message, content, emojis, time = 60000, useEmbed = false) {
        const filter = (reaction,user) => { return user.id === message.author.id};
        let embed = new MessageEmbed();
        if (useEmbed) {
            embed.setColor(content.color);
            embed.setAuthor(content.title);
            embed.setDescription(content.description);
        } else if (!useEmbed) {
            embed = content;
        }
        let buffer = await message.channel.send(embed);
        emojis.forEach(e => {
            buffer.react(e)
        });
        try {
            const c = await buffer.awaitReactions(filter, {max: 1, time: time, errors: ["time"]});
            return c.first().emoji;
        } catch(e) {
            return false;
        }
    }

    async checkRole(member, ID) {
        let role = member.guild.roles.cache.get(ID);
        if (!member.roles.cache.find(r => r.id === role.id)) return false;
        return true;
    }

    async randomNum(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    async playFile(vc, file_path) {
        if (playing) {
            throw `The bot is currently playing a file.`
        }
        var voice = vc;
        voice.join().then(con => {
            const dispatcher = con.play(file_path);
            playing = true;
            dispatcher.on("end", e => {
                playing = false;
                voice.leave();
            });
        }).catch(e => {
            throw e;
        })
    }

    async capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}

module.exports = DJSPlus;
