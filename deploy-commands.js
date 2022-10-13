// Use node deploy-commands.js in terminal to send updated commands to the server.

const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');





const commands = [
    
    new SlashCommandBuilder().setName('updateprofile').setDescription('Replies with how many jumps are registered').addStringOption(option =>
        option.setName('jumper-number')
            .setDescription('Add the name of your map')
            .setRequired(true)
            ).addStringOption(option =>
        option.setName('add-epj')
            .setDescription('Add the name of your clip')
            .setRequired(true)
            ),

    new SlashCommandBuilder().setName('post').setDescription('Replies with api').addStringOption(option =>
        option.setName('user-name')
            .setDescription('Add the name of your map')
            .setRequired(true)
            ).addStringOption(option =>
        option.setName('clip-name')
            .setDescription('Add the name of your clip')
            .setRequired(true)
            ).addStringOption(option =>
        option.setName('epj-score')
            .setDescription('Add your clips EPJ score')
            .setRequired(true)
            ).addStringOption(option =>
        option.setName('map-name')
            .setDescription('Add the name of your map')
            .setRequired(true)
            ),

    new SlashCommandBuilder().setName('createprofile').setDescription('Replies with api').addStringOption(option =>
        option.setName('jumper-name')
            .setDescription('Add the name of your video')
            .setRequired(true)
            ),
    new SlashCommandBuilder().setName('deletethem').setDescription('Replies with api').addStringOption(option =>
        option.setName('message-amount')
            .setDescription('Enter the amount of messages you would like to purge')
            .setRequired(true)
            ),
    new SlashCommandBuilder().setName('newvid').setDescription('Replies with video resource').addStringOption(option =>
        option.setName('video-name')
            .setDescription('Add the name of your video')
            .setRequired(true)
            ).addStringOption(option =>
        option.setName('video-date')
            .setDescription('Add the date of your video')
            .setRequired(true)
            ).addStringOption(option =>
        option.setName('video-link')
            .setDescription('Add your videos link')
            .setRequired(true)
            ),

    new SlashCommandBuilder().setName('vids').setDescription('Replies with all videos on youtube'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('commands').setDescription('Replies with commands'),
    new SlashCommandBuilder().setName('stats').setDescription('Replies with JV stats'),
    new SlashCommandBuilder().setName('jumps').setDescription('Replies with how many jumps are registered'),
    new SlashCommandBuilder().setName('profiles').setDescription('Replies with how many profiles are registered')

   
        
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
    .catch(console.error);