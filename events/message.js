const fs = require('node:fs');

let power = fs.readFileSync("./maps/power.hbs")
let parkour = fs.readFileSync("./maps/parqur.hbs")
let dodgeball = fs.readFileSync("./maps/dodgeball.hbs")
let penalty = fs.readFileSync("./maps/penalto2.hbs")
let sniper = fs.readFileSync("./maps/sniper.hbs")
let sumopower = fs.readFileSync("./maps/sumopower.hbs")

module.exports = async function Message(player,message,room){
    let command = message.split(" ");
    if(command.includes("!admin")){
        if(command[1] == "şifre"){
            room.setPlayerAdmin(player.id, true);
        } else {
            room.setPlayerAdmin(player.id, false);
        }
    }
    if(command.includes("!map")){
      if(player.admin){
          room.stopGame();
          switch(command[1]){
            case "power":
            room.setCustomStadium(power)
            break;
            case "parkour": 
            room.setCustomStadium(parkour)
            break;
            case "dodgeball":
            room.setCustomStadium(dodgeball)
            break;
            case "penalty":
            room.setCustomStadium(penalty)
            break;
            case "sniper":
            room.setCustomStadium(sniper)
            break;
            case "sumopower":
            room.setCustomStadium(sumopower)
            break;
          }
      } else {
        room.kickPlayer(player.id, "OROSPU ÇOCU SEN ADMIN MISIN HA??!?!?!?", false);
        room.sendAnnouncement(`${player.name} ADLI OROSPU ÇOCU ADMIN DEĞILKEN HARITAYI DEĞİŞTİRMEYE ÇALIŞTI`)
      }
    }
}