const mongoose = require('mongoose');

const DiscordUserSchema = new mongoose.Schema({
    discordId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    avatar: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    guilds: {
        type: mongoose.SchemaTypes.Array,
        required: true,
    },
    locale: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
})

module.exports = mongoose.model('User', DiscordUserSchema);