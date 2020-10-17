exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const msg = await message.channel.send("getitemlist?");
    msg.edit({embed: {
            color: 3447003,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL()
            },
            title: "Result",
            description: "You can find all items list here https://github.com/broderickhyman/ao-bin-dumps/blob/master/formatted/items.txt",
            timestamp: new Date(),
            fields:[],
            footer: {
                icon_url: client.user.avatarURL(),
                text: "© "+client.user.username
            }
        }})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "getitemlist",
    category: "Miscelaneous",
    description: "https://github.com/broderickhyman/ao-bin-dumps/blob/master/formatted/items.txt",
    usage: "getitemlist"
};
