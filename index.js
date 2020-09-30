const http = require('http'); //npm i http
const request = require('request'); //npm i request
const Discord = require('discord.js'); //npm i discord.js
const { MessageEmbed } = require("discord.js"); //npm i discord.js
const bot = new Discord.Client();

bot.prefix = "!";

bot.on("ready",function(){
    console.log(`${bot.user.tag} is ready`);
    bot.user.setStatus("dnd")
});

bot.on("message", async message=>{
   if (message.author.equals(bot.user)) return;
  if (message.author.bot) return;
  let MessageArr = message.content.split(" ");
  let cmd = MessageArr[0];
  let args = MessageArr.slice(1);
  
  if(cmd === "!nick") { //change nickname command
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You dont have permission to perform this command!');
  if (message.mentions.users.size < 1) return message.reply('You must ping someone to change his username :x:')
  let user = message.guild.member(message.mentions.users.first());
  if (user.roles.highest.position >= message.member.roles.highest.position ) return message.reply('I cant change that members nickname. They are the same level as you or higher. :x:');
  let newusername = args.slice(1).join(' ')
  if (newusername.length < 1) return message.reply('You must specify a nickname')
  if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.reply('I dont have permission to do this command');
  if(user.id === message.guild.owner.id) {
  return message.channel.send("You cant change the owners nickname.")
  }
      message.guild.members.cache.get(user.user.id).setNickname(newusername);
      const embed = new MessageEmbed()
      .setColor(0x00A2E8)
      .addField("Username set successfully!", "**" + newusername + "**" + " is now the nickname for " + "**" + user.user.username + "**" + ":white_check_mark:");
      message.reply(embed).catch(console.error);
    }
  
  });
  bot.login("token")
