const passport = require('passport')
const DiscordStrategy = require('passport-discord').Strategy;
const DiscordUser = require('../database/schemas/DiscordUser');
const jwt = require("jsonwebtoken")

passport.serializeUser((user, done) =>{
    console.log("Serializing User...");
    console.log(user);
    done(null, user.id);
})
passport.deserializeUser(async(id, done) =>{
    console.log("Deserializing User...");
    console.log(id);
    try{
        const user = await DiscordUser.findById(id);
        if (!user) throw new Error("User not found");
        if(user)
            done(null, user);
        
        
    }catch(err){
        console.log(err);
        done(err, null);
    }
})
const discordStrt = new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CLIENT_REDIRECT,
    scope: ['identify', 'guilds', 'guilds.join']
},
async function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken);
    console.log(profile);
    try{
        const discordUser = await DiscordUser.findOne({ discordId: profile.id})
        if (discordUser){
            console.log(`Found User: ${discordUser}`);
            return done(null, discordUser);
        }else{
            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username,
                guilds: profile.guilds,
                avatar: profile.avatar,
                locale: profile.locale,
            });

            const savedUser = await newUser.save();
            console.log(`Created User: ${savedUser}`);
            return done(null, savedUser);
        }
    }catch(error){
        console.log(`error: ${error}`);
    }
    
});
passport.use(discordStrt);