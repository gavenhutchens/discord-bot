const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const request = require('request');

var streamtype, streamurl, streamername, mychannel;
var isCurrentLive = false;

const options = {

  //57199432 = sam user id
  //rachel user id = 241165842
  //imaqtpie user id = 24991333
  url: 'https://api.twitch.tv/helix/streams/?user_id=241165842',
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

    try {
		  console.log(new Date(Date.now()).toString());
      var jsonObject = JSON.parse(body);
      //console.log(JSON.toString(jsonObject)); for debugging purposes

      streamtype = jsonObject.data[0].type;
      streamurl = "https://twitch.tv/" + jsonObject.data[0].user_name;

    } catch (error) {
      console.log("catching error, channel not live");
    };

  });

  if (streamtype === "live" && isCurrentLive === false) {
    client.channels.get(config.channelid).send(streamurl);
  //  client.channels.get(config.channelid).send(" you are live <@653678313822486551>");
    isCurrentLive = true;
  }

  if (streamtype === "false") {
    isCurrentLive = false;
  }


  await sleep(10000);
  polltwitchapi(); //recurse
}

client.on("ready", () => {
  console.log("RachelBot is online!");
  polltwitchapi();

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

});

client.on("guildMemberAdd", (member) => {

  member.send("welcome to DAO MEI GAMING");
});

client.on("error", (e) => console.error(e));
client.login(config.token);
process.on("unhandledRejection", console.error);
