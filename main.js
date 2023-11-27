const HaxballJS = require("haxball.js");
const fs = require('node:fs');
const goalEvent = require("./events/goal.js")
const join = require("./events/join.js")
const messageEvent = require("./events/message.js")

require('dotenv').config()

let lastPlayersTouched

HaxballJS.then(async(HBInit) => {
  const room = HBInit({
    roomName: "House Lazım",
    maxPlayers: 16,
    public: true,
    noPlayer: true,
    token: process.env.TOKEN
  });

  let power = await fs.readFileSync("./maps/power.hbs")

  room.setCustomStadium(power);
  room.setScoreLimit(5);
  room.setTimeLimit(0);
  room.setTeamsLock(true)

  room.setTeamColors(2, 0, 0x000000, [0x2B00FF, 0xF1FFF0]);
  room.setTeamColors(1, 0, 0x000000, [0xD10000, 0xF1FFF0]);

  room.onRoomLink = (link)=>{
    console.log(link);
  };

  room.onPlayerJoin = (player) => {
    join(player,room)
  }

  room.onPlayerLeave = (player) =>{
    room.sendAnnouncement(`Görüşürüz ${player.name} `)
  }

  room.onPlayerChat = (player, message) => {
    messageEvent(player,message,room)
  }

  room.onTeamGoal = (goal)=>{
      goalEvent(goal,room,lastPlayersTouched)
  }

  room.onPlayerBallKick = (player)=>{
    lastPlayersTouched = {
      name: player.name,
      team: player.team
    }
  }

  room.onTeamVictory = (team)=>{
    room.sendAnnouncement("Maç bitti")
    setTimeout(()=>{
      room.startGame()
    },5000)
  }
});