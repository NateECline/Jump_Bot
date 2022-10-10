// node . in terminal to bring bot online for testing. 


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Required variables go here.

require('dotenv').config();
const{ token } = process.env;
const axios=require('axios').default;
const {Client, GatewayIntentBits, messageLink} = require('discord.js');
const { on } = require('events');
const { isAnyArrayBuffer } = require('util/types');
const apiEnd = 'https://6324e4ae9075b9cbee43bdd3.mockapi.io/JumpBot';    // API Resource is located in Pownin's Mock account
const apiEPJ = 'https://6324e4ae9075b9cbee43bdd3.mockapi.io/EPJ';        // API Resource is located in Pownin's Mock account
const apivideos = 'https://6324e4ae9075b9cbee43bdd3.mockapi.io/Videos';  // API Resource is located in Pownin's Mock account
const wait = require('node:timers/promises').setTimeout;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
    ]
});
client.login(token)
client.on("ready", () =>{
    console.log(`${client.user.tag} is online and fully operational!\n\nYou will see all new information posted to the API within this window.`)
});



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// First API Resource working. Establishes defer for every other block but all other blocks still need await wait(4000) added to them. 


client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    await interaction.deferReply()
        const { commandName } = interaction;

         if(commandName==='newvid'){
            let vidname = interaction.options.get('video-name').value
            let viddate = interaction.options.get('video-date').value
            let vidlink = interaction.options.get('video-link').value           
            axios.post(apivideos, {
                videoname: vidname,
                videodate: viddate,
                videolink: vidlink,
                
            })
                .then(async function(red){
                    
                   
                   await wait(4000);
                   await interaction.editReply(`\`\`\`fix\nA new video is up!\n\`\`\`\n@everyone\n **${vidname}: ${viddate}**\nLink: ${vidlink}`)  // Need to fix link string to make it to where user doesnt need to type < link >
                    console.log(red)
                })
                .catch(async function(err){
                    await interaction.reply(`Failure:\n${err}\nhttps://cdn.ebaumsworld.com/mediaFiles/picture/2345140/84216725.jpg`)
                    console.log(err)
                })
            }       else if(commandName==='vids'){
                    
                    axios.get(apivideos)
                    .then(async(res)=>{
                        let nothing2 = []
                        
                        for(let i = 0; i<res.data.length; i++){
                            nothing2[i]=`**${i+1}. ** \`\`\`${res.data[i].videoname + ': ' + res.data[i].videodate}\`\`\` __Link:__ ${res.data[i].videolink}\n`
                       }
                        
                        await wait(4000);
                        await interaction.editReply(nothing2.join('\n'))
                    })
                    .catch(async(err)=>{
                    await interaction.reply(`Failure:\n${err}\n${apivideos}\nhttps://cdn.ebaumsworld.com/mediaFiles/picture/2345140/84216725.jpg`)
                    })
                    
                    
                    
                }

        }
    
);


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Second API resource works. 


client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

        const { commandName } = interaction;

         if(commandName==='createprofile'){
            let name = interaction.options.get('jumper-name').value
            axios.post(apiEPJ, {
                jumper: name,
                epjtotal: "0",
                jumpnumber: 0
            })
                .then(async function(red){ 
                    
                    await wait(4000);
                    await interaction.editReply(`Profile ${name} was succesfully created`)
                   console.log(red)
            })
                .catch( function(err){
                    
                    console.log(err)
                })
            }    else if(commandName==='updateprofile'){
                    let var1 = interaction.options.get('jumper-number').value
                    let var2 = interaction.options.get('add-epj').value
                    axios.get(apiEPJ)

                    .then(async (res)=>{
                        const test = parseFloat(res.data[var1].epjtotal) + parseFloat(var2)
                        const total = res.data[var1].jumpnumber + 1
                        const id = res.data[var1].id, npt=apiEPJ + `/${id}`
                        const avg = test/total
                      
                        await wait(4000);
                        
                          console.log(test)

                        axios.put(npt,{
                        jumpnumber: total,
                        epjtotal: `${test}`,
                      
                        
                    })
                    .then(async (red)=>{

                        await wait(4000);
                        await interaction.editReply(`\`Name:\` ${res.data[var1].jumper}\n\`Total EPJ:\` ${test}\n\`Total Jumps:\` ${total}\n\`Average EPJ:\` ${Math.round(avg * 100) / 100}`)
                         
                        })
                        .catch(async (err)=>{
                            await wait(4000);
                            await interaction.editReply(`Failure:\n${err}\nhttps://cdn.ebaumsworld.com/mediaFiles/picture/2345140/84216725.jpg`)
                            console.log(err)
                            
                       })
                    })

                    
                    

                }
                else if(commandName==='profiles'){
                
                    axios.get(apiEPJ)
                    .then(async(res)=>{
                        let nothing2 = []
                        
                        for(let i = 0; i<res.data.length; i++){
                            nothing2[i]=`\`\`\`Jumper Name: ${res.data[i].jumper}\nJumper Number: ${res.data[i].id-1}\n\`\`\``
                       }
                        
                        await wait(4000);
                        await interaction.editReply(nothing2.join('\n'))
                    })
                    .catch(async(err)=>{
                    await interaction.reply(`Failure:\n${err}\n${apiEnd}\nhttps://cdn.ebaumsworld.com/mediaFiles/picture/2345140/84216725.jpg`)
                    })
                    

    }});


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Third API resource works.


client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

        const { commandName } = interaction;

         if(commandName==='post'){
            let EPJ = interaction.options.get('epj-score').value
            let mapname = interaction.options.get('map-name').value
            let clip = interaction.options.get('clip-name').value
            let user = interaction.options.get('user-name').value
            axios.post(apiEnd, {
                name: user,
                clip: clip,
                epj: EPJ,
                mapname: mapname,
            })
                .then(async function(red){
                    
                  
                   await wait(4000);
                   await interaction.editReply(`\`\`\`fix\nA new jump has been landed!\n\`\`\`\n@everyone\n**${user}** has landed a new jump on ${mapname}\n**Clip:** ${clip}\n**EPJ:** ${EPJ}`)
                    console.log(red)
                })
                .catch(async function(err){
                    await interaction.reply(`Failure:\n${err}\nhttps://cdn.ebaumsworld.com/mediaFiles/picture/2345140/84216725.jpg`)
                    console.log(err)
                })
            }       else if(commandName==='jumps'){
                    
                    axios.get(apiEnd)
                    .then(async(res)=>{
                        let nothing = []
                        
                        for(let i = 0; i<res.data.length; i++){
                            nothing[i]=`**${i+1}. Clip by:** ${res.data[i].name} \`\`\`${res.data[i].clip}\`\`\` **EPJ:** ${res.data[i].epj}\n`
                       }
                        
                        await wait(4000);
                        await interaction.editReply(nothing.join('\n'))
                    })
                    .catch(async(err)=>{
                    await interaction.reply(`Failure:\n${err}\n${apiEnd}\nhttps://cdn.ebaumsworld.com/mediaFiles/picture/2345140/84216725.jpg`)
                    })
                    
                    
                    
                }

        }
    
);


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Basic Commands.


client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

        const { commandName } = interaction;
        await wait(4000);

        if (commandName === 'server') {
            await interaction.editReply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
        } else if (commandName === 'user') {
            await interaction.editReply(`${interaction.user.tag}`)

        } else if(commandName === 'commands'){
            await interaction.editReply('**Available commands:**\n``/server | Shows Server info\n/user | Shows User Info\n/post | Creates a post for a new jump\n/jumps | Displays landed jumps\n/newvid | Creates and displays a new landed jump\n/vids | Displays all videos\n/createprofile | Creates a new profile for a jumper\n/updateprofile | Updates a jumpers EPJ\n/profiles | Displays profiles for all jumpers``')


        }

        }
);