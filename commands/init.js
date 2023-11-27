const map = require("../commands/map.js")
const admin = require("../commands/admin.js")
const changeUniform = require("../commands/uniform.js")

module.exports = function commands(player, message, room){
    let command = message.split(" ");
    if (command.includes("!map")) {
        map.change(player, message, room)
    } else if (command.includes("!admin")){
        admin(player, message, room)
    } else if (command.includes("!forma")){
        changeUniform(player,message,room)
    } else if (command.includes("!mod")){
        switch(command[1]){
            case "ys":

            break;
            case "normal":

            break;
        }
    }
}