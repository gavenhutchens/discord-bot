const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");






client.on("ready", () => {
  console.log("Gaven_Bot is online!");
});

client.on("message", (message) => {

  //slice renmoves prefix, trim removes extra spaces, split(/ +/g) splits by one or many spaces
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  //shift removes one element from the args array and returns it
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(config.prefix) || message.author.bot) {
   return;
  }

  if (command === "howtocarrygameswhenimfeeding") {
    message.channel.send("find a good duo partner ^_^");
  }

 

  if (command === "help") {
    message.channel.send("Commands are as follows:");
  }

  if(command === "join") {
    message.member.voiceChannel.join();	


  }


	
});

client.on("guildMemberAdd", (member) => {

  member.send("Welcome to Green Hills! Send Gaven a message if you need anything." +
  " Be sure to check out gavenhutchens.com for more info about my creator!" +
  " My commands are !chess, !pubg, !erangel, !miramar, and !sanhok");
});


client.on("error", (e) => console.error(e));


client.login(config.token);
process.on("unhandledRejection", console.error);
