module.exports = function Goal(goal,room,lastPlayersTouched){
    if(goal == 1){
        room.sendAnnouncement(`KIRMIZI TAKIM GOL ATTI!`, null, 0xff0000, "bold")
        room.sendAnnouncement(`Golü atan ${lastPlayersTouched}`,null, 0x00ff00, "bold")
        room.sendAnnouncement(`SKOR ${room.getScores().red} - ${room.getScores().blue}`, null, 0xffffff, "bold")
      } else {
        room.sendAnnouncement(`MAVI TAKIM GOL ATTI!`, null, 0x0000ff, "bold")
        room.sendAnnouncement(`Golü atan ${lastPlayersTouched}`,null, 0x00ff00, "bold")
        room.sendAnnouncement(`SKOR ${room.getScores().red} - ${room.getScores().blue}`, null, 0xffffff, "bold")
      }
} 