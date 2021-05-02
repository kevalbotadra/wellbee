const Discord = require("discord.js");
const axios = require("axios");
require("dotenv").config();

const client = new Discord.Client();

client.on("ready", () => {
  console.log("ello bois");
});

let chat = [];
let outputs = [];

client.on("message", message => {
  if (chat.length > 30) {
    chat = [];
    outputs = [];
  }

  if (message.author.bot) return;
  let command = message.content.trim().toLowerCase();

  chat.push(`${message.author.username}: ${command}`);
  if (!message.content.startsWith("beebot ")) return;

  command = command.substr(6, message.content.length).trim();

  if (command === "end" || command === "restart" || command === "start") {
    chat = [];
    return;
  }

  if (command === "listchat") {
    console.log(chat);
    message.channel.send(chat.join("\n"));
    return;
  }

  if (command === "help") {
    message.channel.send(
      `Hi :bee:bot here! These are my commands! \n My prefix is \`beebot \` \n \`beebot start\` - starts a new session \n \`beebot end\` - ends running session \n \`listchat\` - lists running chat`
    );
    return;
  }

  //   send it to gpt3
  console.log(`the command is ${command}`);

  axios
    .post("https://wellbee-main-fzd4o4tpia-uc.a.run.app/gpt3", {
      secret: "CONGPilDnoMinEThonYAnkoLViTypOlmStOd",
      inputs: chat,
      outputs,
    })
    .then(result => {
      outputs.push(result);
      message.channel.send(`Mister rhymes-with-JPT says: ${result}`);
    });
});

client.login(process.env.TOKEN);
