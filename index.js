const Discord = require("discord.js");
const PREFIX = "."
const YTDL = require("ytdl-core");

var bot = new Discord.Client();
var servers = {};
bot.on("ready", function() {
    console.log("MusicBOT Ready! Test Now Prefix .");
    });
function play(connection , message) {
var server = servers[message.guild.id];
server.dispatcher = connection.playStream(YTDL(server.queue[0],{filter : "audioonly"}));
server.queue.shift();
server.dispatcher.on("end", function() {
    if(server.queue[0]) play(connection, message)
    else connection.disconnect();
});
}

bot.on("message", function(message) {
    if(message.author.equals(bot.user)) return;
    if(!message.content.startsWith(PREFIX)) return;
    var args =message.content.substring(PREFIX.length).split(" ");
    switch (args[0].toLocaleLowerCase()) {
        case "play":
        if (!args[1]) {
          message.channel.send("Please Send .play <link> To Play Your no1 music");
            return;
        }
        if(!message.member.voiceChannel) {
            message.channel.send("Please Join A Vc");
            return;
        }
        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        };
        var server = servers[message.guild.id]

        server.queue.push(args[1]);
        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
        });
            break;

            case "skip":

var server = servers[message.guild.id]
if(server.dispatcher) server.dispatcher.end()
message.channel.send("Skipped! Playing Queued Song!");

            break;
            case "stop":
  var server = server[message.guild.id];
  if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect()
            break;


    
    }
});

bot.login("Mzg5MjIwODkwNjU2NzY4MDAw.DQ4Zug.zzbEH_QufEBMOzaDVcWuRS1DgWs")