
var roleScout = {

  /** @param {Creep} creep **/
  run: function(creep, roomsToScout,spawn) {
    //If the creep is not scouting but there is a room to scout
  //  console.log(creep.memory.scouting);
  //  console.log(roomsToScout.length);
   if (creep.memory.scouting == false && roomsToScout.length > 0) {
    // console.log("do i get here");
      creep.memory.scouting = true;
    }

    if (creep.memory.scouting == true) {
    //  console.log("home room " + creep.room.name);
    //  console.log("home room mem " + creep.memory.homeRoom);
      if (creep.room.name == creep.memory.homeRoom) {
        var exit = creep.room.findExitTo(creep.memory.targetRoom);
        creep.moveTo(creep.pos.findClosestByRange(exit));
    //    console.log("moving to scout");
      }else if(creep.room.name == creep.memory.targetRoom){
        creep.moveTo(creep.room.controller);
        var sourcesObj = creep.room.find(FIND_SOURCES)
        var sourceObjects = {}
        var sources = [];
        for (var i in sourcesObj) {
          var source = sourcesObj[i];
          sources.push(source.id);
        }
        var currentObject = spawn.memory.roomSources;
        sourceObjects[creep.memory.targetRoom] = sources;
        spawn.memory.roomSources = Object.assign(currentObject, sourceObjects);
        creep.memory.scouting == false
        return "Success";
      }
    }
    else if (creep.memory.scouting == false) {
      if (creep.room.name == creep.memory.targetRoom) {
        var exit = creep.room.findExitTo(creep.memory.targetRoom);
        creep.moveTo(creep.pos.findClosestByRange(exit));
//console.log("home");
      }
    }else{
    //  console.log("Going noware");
    }
  }

};

module.exports = roleScout;
