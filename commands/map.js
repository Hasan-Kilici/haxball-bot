const fs = require('fs');

let power = fs.readFileSync("./maps/power.hbs");
let parkour = fs.readFileSync("./maps/parqur.hbs");
let dodgeball = fs.readFileSync("./maps/dodgeball.hbs");
let penalty = fs.readFileSync("./maps/penalto2.hbs");
let sniper = fs.readFileSync("./maps/sniper.hbs");
let sumopower = fs.readFileSync("./maps/sumopower.hbs");
let voleybol = fs.readFileSync("./maps/voleybol.hbs");

let map;
let a;

module.exports = { 
    change: (player, message, room)=>{
        let command = message.split(" ")
            if (player.admin) {
                if (a) {
                    clearInterval(a);
                }

                room.stopGame();
                map = command[1];
                switch (command[1]) {
                    case "power":
                        room.setScoreLimit(5);
                        room.setTimeLimit(0);
                        room.setCustomStadium(power);
                        break;
                    case "parkour":
                        room.setScoreLimit(1);
                        room.setTimeLimit(0);
                        room.setCustomStadium(parkour);
                        break;
                    case "dodgeball":
                        room.setScoreLimit(0);
                        room.setTimeLimit(0);
                        room.setCustomStadium(dodgeball);
                        break;
                    case "penalty":
                        room.setScoreLimit(5);
                        room.setTimeLimit(0);
                        room.setCustomStadium(penalty);
                        break;
                    case "sniper":
                        room.setScoreLimit(3);
                        room.setTimeLimit(1);
                        room.setCustomStadium(sniper);
                        break;
                    case "sumopower":
                        room.setScoreLimit(10);
                        room.setTimeLimit(0);
                        room.setCustomStadium(sumopower);
                        break;
                    case "voleybol":
                        room.setScoreLimit(12);
                        room.setTimeLimit(0);
                        room.setCustomStadium(voleybol);
                        break;
                }
                room.sendAnnouncement(`Harita değiştirildi, yeni map : ${command[1]}`, null, 0x00ff00, "bold")
                room.startGame();
                if (map === "dodgeball") {
                    a = setInterval(() => {
                        let players = room.getPlayerList();
                        
                        let redTeamPlayers = players.filter((p) => p.team === 1);
                        let blueTeamPlayers = players.filter((p) => p.team === 2);
                        
                        let redTeamAllOutside = redTeamPlayers.every((p) => p.position.y > 214 || p.position.y < -214 || p.position.x < -465);
                        let blueTeamAllOutside = blueTeamPlayers.every((p) => p.position.y > 214 || p.position.y < -214 || p.position.x > 465);
                        
                        if (redTeamAllOutside || blueTeamAllOutside) {
                            room.stopGame();
                            room.startGame();
                        }
                }, 1000);
            }
        } else {
            room.kickPlayer(player.id, "OYUNCU KICKLEME MESAJI", false);
            room.sendAnnouncement(`${player.name} ADLI OYUNCU ADMIN DEĞİLKEN HARITAYI DEĞİŞTİRMEYE ÇALIŞTI`);
        }
    },
    get : ()=>{
        return map
    }
}
