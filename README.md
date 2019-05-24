# discord-bot
This is a bot that I've been working on in my spare time. It currently runs off a raspberry pi. 


## Necessary installations

Install nodejs:

```
sudo apt install nodejs
```
Install the package manager:

```
sudo apt install npm
```

ffmpeg binaries, these are needed to connect to a voice channel
```
sudo apt install ffmpeg
```

### Other prereqs

In order to clone and run this code, it is necessary to 
your own config.json file. This file should contain your
bot token, your command prefix, as well as other id's 
such as a twitch id or a channel id.

Make sure when registering a bot with discord that you 
obtain a token value. This value should be stored in a
secure location, and **never** be put on github or any
other public location.



### Running the bot:

```
node app.js
```
