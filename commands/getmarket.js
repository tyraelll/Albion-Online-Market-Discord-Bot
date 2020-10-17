exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const msg = await message.channel.send("getmarket?");
    const axios = require('axios');

    let isCorrect=true;

    let embedMessage = {embed: {
            color: 3447003,
            author: {
                name: client.user.username, // change however you desire
                icon_url: client.user.avatarURL()
            },
            title: "Result",
            description: "You had asked for "+args[0]+' item at '+args[1]+ ' Market, enchantment '+args[2],
            timestamp: new Date(),
            fields:[],
            footer: {
                icon_url: client.user.avatarURL(),
                text: "© "+client.user.username // change however you desire
            }
        }
    }

    if (args[0]===undefined) {isCorrect=false}
    if (args[1]===undefined && isCorrect){isCorrect=false}
    if (args[2]===undefined && isCorrect){isCorrect=false}

    if (isCorrect){
        let BASE_LINK = 'https://www.albion-online-data.com/api/v2/stats/prices/'+args[0]+'?locations='+args[1]+'&qualities='+args[2]+'';
            axios.get(BASE_LINK)
                .then(response => {

                    response.data.forEach(element => {
                        embedMessage.embed.fields.push({
                        name: element.item_id,
                        value: "Sell price Minimum - " + element.sell_price_min+ ' \n Date : '+element. sell_price_min_date+'\n' +
                              ' Sell Price Maximum - ' +element.sell_price_max + ' \nDate : ' + element.sell_price_max_date+'\n' +
                              ' Buy price Minimum - ' +element.buy_price_min + '\n Date : ' + element.buy_price_min_date+'\n' +
                              ' Buy price Maximum - ' +element.buy_price_max + ' \nDate : ' + element.buy_price_max_date+'\n'
                    })

                    });
                    msg.edit(embedMessage);

                })
                .catch(error => {
                    console.log(error);
                });
    }else{
        msg.edit({embed:{color:"RED",description:"Please set arguments. For more info write help"}})
    }


};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "getmarket",
    category: "Miscelaneous",
    description: "example - getmarket T4_BAG Caerleon 2(quality... 0 for all of them) items list https://github.com/broderickhyman/ao-bin-dumps/blob/master/formatted/items.txt",
    usage: "getmarket"
};
