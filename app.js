const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const chessArray = require("./chessarray.js").chessArray;
const erangelArray = require("./erangelarray.js").erangelArray;
const miramarArray = require("./miramararray.js").miramarArray;
const sanhokArray = require("./sanhokarray.js").sanhokArray;

client.on("ready", () => {
  console.log("Gaven_Bot is online!");
});

client.on("message", (message) => {

  //slice renmoves prefix, trim removes extra spaces, split(/ +/g) splits by one or many spaces
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  //shift removes one element from the args array and returns it
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(config.prefix) || message.author.bot){
   return;
 }

  if (command === "chess") {
    var randomNumber = Math.floor(Math.random() * chessArray.length);
    message.channel.send("See what you can do with the " + chessArray[randomNumber]);
  }

  if(command === "pubg") {
    message.channel.send("If you're having trouble deciding on a place to land in pubg," +
    " try typing !erangel, !miramar, or !sanhok and I will give you a suggestion!");
  }

  if (command === "erangel") {
    var randomNumber = Math.floor(Math.random() * erangelArray.length);
    message.channel.send(erangelArray[randomNumber]);
  }

  if (command === "miramar") {
    var randomNumber = Math.floor(Math.random() * miramarArray.length);
    message.channel.send(miramarArray[randomNumber]);
  }

  if (command === "sanhok") {
    var randomNumber = Math.floor(Math.random() * sanhokArray.length);
    message.channel.send(sanhokArray[randomNumber]);
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
