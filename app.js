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

    var jsonObject = JSON.parse(body);
    console.log(jsonObject);
    console.log("current timestamp in twitch request function is:");
    var date = new Date(Date.now());
    console.log(date.toString());

    try {
      streamtype = jsonObject.data[0].type;
      console.log("Streamtype is: " + streamtype);

      streamurl = jsonObject.data[0].user_name;
      console.log("StreamURL is: " + "https://twitch.tv/" + streamurl);

      streamurl = "https://twitch.tv/" + streamurl;

      //client.channels.get(config.channelid).send(streamurl);

    } catch (error) {

      console.log("catching error, channel not live");
    };

  });


  if (streamtype === "live" && isCurrentLive === false) {
    console.log("inside live if");
    client.channels.get(config.channelid).send(streamurl);
    client.channels.get(config.channelid).send("test mail you are live <@653678313822486551>");
    console.log("sent live mail to disc");
    isCurrentLive = true;
  }

  if (streamtype === "false") {
    console.log("inside false if");
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

  if (command === "help") {
    message.channel.send("Commands are as follows:\n!help\n!join\n" +
      "!leave\n");
  }

  if (command === "join") {
    message.member.voiceChannel.join();
  }

  if (command === "leave") {
    message.member.voiceChannel.leave();
  }

  if (command === "stream") {
    message.channel.send("https://twitch.tv/rachelae");
  }

});

client.on("guildMemberAdd", (member) => {

  member.send("Welcome to Green Hills! Send Gaven a message if you need anything." +
    " Be sure to check out gavenhutchens.com for more info about my creator!");
});


client.on("error", (e) => console.error(e));

client.login(config.token);
process.on("unhandledRejection", console.error);
