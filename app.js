const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const request = require('request');

var streamtype, streamurl, streamername, mychannel;


const options = {

	url: 'https://api.twitch.tv/kraken/streams/loltyler1',
	method: 'GET',
	headers: {
	  'Client-ID': config.twitchid
	}
};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


async function polltwitchapi() {


	request(options, function(err, res, body) {
		
		var obj = JSON.parse(body);
		console.log(obj);

		try {
		streamtype = obj.stream.stream_type;
		console.log(streamtype);

		streamurl = obj.stream.channel.url;
		console.log(streamurl);

		streamername = obj.stream.channel.display_name;
		console.log(streamername);
		

		} catch (error) {

		streamtype = "offline";
		console.log(streamtype);

		};

	}); 


	await sleep(3000); 
	polltwitchapi(); //recurse
}




client.on("ready", () => {
  console.log("Gaven_Bot is online!"); 
  polltwitchapi();

});

client.on("message", (message) => {

  //slice renmoves prefix, trim removes extra spaces, split(/ +/g) splits by one or many spaces
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  //shift removes one element from the args array and returns it
  const command = args.shift().toLowerCase();



  if(streamtype === "live") {
	client.channels.get(config.channelid).send("seg");
  }

  if (!message.content.startsWith(config.prefix) || message.author.bot) {
   return;
  }

  if (command === "howtocarrygameswhenimfeeding") {
    message.channel.send("find a good duo partner ^_^");
  }

  if (command === "help") {
    message.channel.send("Commands are as follows:\n!help\n!join\n" +
    "!leave\n");
  }

  if(command === "join") {
    message.member.voiceChannel.join();	
  }

  if(command === "leave") {
    message.member.voiceChannel.leave();
  }
	
});

client.on("guildMemberAdd", (member) => {

  member.send("Welcome to Green Hills! Send Gaven a message if you need anything." +
  " Be sure to check out gavenhutchens.com for more info about my creator!");
});


client.on("error", (e) => console.error(e));

client.login(config.token);
process.on("unhandledRejection", console.error);
