const cryptoJS = require('crypto-js');

function getMutualGuilds(userGuilds, botGuilds){
    const validGuilds = userGuilds.filter((guild) =>(guild.permissions & 0x20) === 0x20);
    const included = [];
    const excluded = validGuilds.filter((guild) =>{
        const findGuild = botGuilds.find((g) => g.id === guild.id);
        if (!findGuild) return guild;
        included.push(findGuild);
    });
    return {excluded, included};
}

function encrypt(token){
    return cryptoJS.AES.encrypt(token, process.env.SECRET_KEY)
}

function decrypt(token){
    return cryptoJS.AES.decrypt(token, process.env.SECRET_KEY)
}
module.exports = {getMutualGuilds, encrypt, decrypt};