// node . in terminal to bring bot online for testing. 


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Required variables go here.

require('dotenv').config();
const{ token } = process.env;
const axios=require('axios').default;
const {Client, GatewayIntentBits, EmbedBuilder, messageLink} = require('discord.js');
const { on } = require('events');
const { isAnyArrayBuffer } = require('util/types');
const apiEnd = 'https://6324e4ae9075b9cbee43bdd3.mockapi.io/JumpBot';    // API Resource is located in Pownin's Mock account
const apiEPJ = 'https://6324e4ae9075b9cbee43bdd3.mockapi.io/EPJ';        // API Resource is located in Pownin's Mock account
const apivideos = 'https://6324e4ae9075b9cbee43bdd3.mockapi.io/Videos';  // API Resource is located in Pownin's Mock account
const otb='https://cdn.discordapp.com/attachments/951019776141037568/1030381797080571914/smile.png'
const wait = require('node:timers/promises').setTimeout;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ]
});
client.login(token)
client.on("ready", () =>{
    console.log(`${client.user.tag} is online and fully operational`)
});



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// First API Resource working. Establishes defer for every other block but all other blocks still need await wait(500) added to them.
 
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
                .then(async (red)=>{
                    
                   
                   await wait(500);
                   await interaction.editReply(`\`\`\`fix\nA new video is up!\n\`\`\`\n@everyone\n **${vidname}: ${viddate}**\nLink: ${vidlink}`)  // Need to fix link string to make it to where user doesnt need to type < link >
                    console.log(red)
                })
                .catch(async (err)=>{
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
                        
                        await wait(500);
                        await interaction.editReply(nothing2.join('\n'))
                    })
                    .catch(async(err)=>{
                    await interaction.reply(`Failure:\n${err}\n${apivideos}\nhttps://cdn.ebaumsworld.com/mediaFiles/picture/2345140/84216725.jpg`)
                    })
                    
                    
                    
                }

        }
    
);


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Second API resource


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
                .then(async (red)=>{ 
                    
                    await wait(500);
                    await interaction.editReply(`Profile ${name} was succesfully created`)
                   console.log(red)
            })
                .catch( (err)=>{
                    
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
                      
                        await wait(500);
                        
                          console.log(test)

                        axios.put(npt,{
                        jumpnumber: total,
                        epjtotal: `${test}`,
                      
                        
                    })
                    .then(async (red)=>{

                        await wait(500);
                        await interaction.editReply(`\`Name:\` ${res.data[var1].jumper}\n\`Total EPJ:\` ${test}\n\`Total Jumps:\` ${total}\n\`Average EPJ:\` ${Math.round(avg * 100) / 100}`)
                         
                        })
                        .catch(async (err)=>{
                            await wait(500);
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
                            let avg=res.data[i].epjtotal/res.data[i].jumpnumber
                            nothing2[i]=`\`\`\`Jumper: ${res.data[i].jumper}\nJumps: ${res.data[i].jumpnumber}\nEPJ: ${res.data[i].epjtotal}\nAverage EPJ: ${Math.round(avg * 100) / 100}\`\`\``
                       }
                        
                        await wait(500);
                        await interaction.editReply(nothing2.join('\n'))
                    })
                    .catch(async(err)=>{
                    await interaction.reply(`Failure:\n${err}\n${apiEnd}\nhttps://cdn.ebaumsworld.com/mediaFiles/picture/2345140/84216725.jpg`)
                    })
                }
                else if(commandName==='stats'){
                
                    axios.get(apiEPJ)
                    .then(async(res)=>{
                        let stats = []
                        let epj=[]
                        for(let i = 0; i<res.data.length; i++){
                            stats[i]=res.data[i].jumpnumber
                            epj[i]=parseFloat(res.data[i].epjtotal)
                       }
                        let tater=stats.reduce((a, b)=>a+b)
                        let tots=epj.reduce((a, b)=>a+b)
                        let avg=tots/tater
                        await wait(500);
                        await interaction.editReply(`**__Group Totals:__**\n\n\`Jumps:\` **${tater}**\n\`EPJ:\` **${tots}**\n\`Average EPJ:\` **${Math.round(avg * 100) / 100}**`)
                    })
                    .catch(async(err)=>{
                    await interaction.reply(`Failure:\n${err}\n${apiEnd}\nhttps://cdn.ebaumsworld.com/mediaFiles/picture/2345140/84216725.jpg`)
                    })
                    

    }})


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Third API resource


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
                    
                  
                   await wait(500);
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
                        
                        await wait(500);
                        await interaction.editReply(nothing.join('\n'))
                    })
                    .catch(async(err)=>{
                    await interaction.reply(`Failure:\n${err}\n${apiEnd}\nhttps://cdn.ebaumsworld.com/mediaFiles/picture/2345140/84216725.jpg`)
                    })
                    
                    
                    
                }

        }
    
);


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Delete Command working


client.on('interactionCreate',  async interaction => {
    if (!interaction.isChatInputCommand()) return;
        const { commandName } = interaction;
        if (commandName === 'deletethem'){
        let amount = interaction.options.get('message-amount').value 
        if(amount<=1000){
        switch(true){
            case amount<=100:
                await interaction.channel.bulkDelete(amount)   
            break;
            case amount<=200:
                for(let i=0;i<1;i++){
                    await interaction.channel.bulkDelete(100)
                }
                await interaction.channel.bulkDelete(amount-100)
            break;
            case amount<=300:
                for(let i=0;i<2;i++){
                    await interaction.channel.bulkDelete(100)
                }
                await interaction.channel.bulkDelete(amount-200)
            break;
            case amount<=400:
                for(let i=0;i<3;i++){
                    await interaction.channel.bulkDelete(100)
                }
                await interaction.channel.bulkDelete(amount-300)
            break;
            case amount<=500:
                for(let i=0;i<4;i++){
                    await interaction.channel.bulkDelete(100)
                }
                await interaction.channel.bulkDelete(amount-400)
            break;
            case amount<=600:
                for(let i=0;i<5;i++){
                    await interaction.channel.bulkDelete(100)
                }
                await interaction.channel.bulkDelete(amount-500)
            break;
            case amount<=700:
                for(let i=0;i<6;i++){
                    await interaction.channel.bulkDelete(100)
                }
                await interaction.channel.bulkDelete(amount-600)
            break;
            case amount<=800:
                for(let i=0;i<7;i++){
                    await interaction.channel.bulkDelete(100)
                }
                await interaction.channel.bulkDelete(amount-700)
            break;
            case amount<=900:
                for(let i=0;i<8;i++){
                    await interaction.channel.bulkDelete(100)
                }
                await interaction.channel.bulkDelete(amount-800)                
            break;
            default:
                for(let i=0;i<9;i++){
                    await interaction.channel.bulkDelete(100)
                }
                await interaction.channel.bulkDelete(amount-900)
        }
        await wait(500)
        await interaction.editReply(`***${amount}*** *message(s) deleted by ${interaction.user}*`)
    }else{
        const Embed = new EmbedBuilder()
            .setColor(0xA020F0)
            .setTitle(`**YOU WHO HAVE DARED TO TAKE MORE THAN WHAT WAS GIVEN SHALL FIND THYSELF IN THE LOWEST PITS OF HELL AND SHAME. WE ALL BORE WITNESS TO YOUR FAILURE AND STUPIDITY AND WERE ALMOST STRUCK DOWN BY THE SHEER DESPAIR YOU WROUGHT UPON THIS POISONED WORLD.**\n${amount} is not a valid number ${interaction.user} :[ `)
            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${av}`})
            .setTimestamp()
            .setFooter({ text: 'Created by OTB Development', iconURL: `${otb}` });
            await interaction.editReply({ embeds: [Embed] })
    }
    }
        
});


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Basic Commands.


client.on('interactionCreate', async interaction => {
    let av="https://cdn.discordapp.com/avatars/"+interaction.user.id+"/"+interaction.user.avatar+".jpeg"
    if (!interaction.isChatInputCommand()) return;

        const { commandName } = interaction;
        
        await wait(500);

        if (commandName === 'server') {
            await interaction.editReply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
        } else if (commandName === 'user') {
            await interaction.editReply(`${interaction.user.tag}`)

        } else if(commandName === 'commands'){
            const Embed = new EmbedBuilder()
            .setColor(0xA020F0)
            .setTitle(`:ballot_box_with_check: __Command List__`)
            .setDescription('***Use all below commands with the "/" prefix***')
            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${av}`})
            .addFields(
                { name: 'Post', value: 'Creates a post for a new jump'},
                { name: 'Jumps', value: 'Displays landed jumps'},
                { name: 'NewVid', value: 'Creates and display a new landed jump'},
                { name: 'Vids', value: 'Displays All Videos'},
                { name: 'CreateProfile', value: 'Creates a profile for a jumper'},
                { name: 'UpdateProfile', value: 'Updates a jumpers EPJ'},
                { name: 'Profiles', value: 'Displays profiles for all jumpers'},
                { name: 'Stats', value: 'Displays group totals for jumps, EPJ, and EPJ average'},
                { name: 'DeleteThem', value: 'Deletes messages in bulk - limit is 1000 messages at a time'},
                { name: 'Avatar', value: 'Displays a users avatar'},
            )
            .setTimestamp()
            .setFooter({ text: 'Created by OTB Development', iconURL: `${otb}` });
            await interaction.editReply({ embeds: [Embed] })
        }else if(commandName==='avatar'){
            const avatar = new EmbedBuilder()
            .setColor(0xA020F0)
            .setTitle(`Avatar`)
            .setAuthor({name: `${interaction.user.tag}`, iconURL: `${av}`})
            .setImage(`${av}`)
            .setTimestamp()
            .setFooter({ text: 'Created by OTB Development', iconURL: `${otb}` });
            await interaction.editReply({ embeds: [avatar] })
        }
        
});