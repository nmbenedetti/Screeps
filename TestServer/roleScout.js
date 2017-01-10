var worldManager = require('worldManager');
var roleScout = {

  /** @param {Creep} creep **/
  run: function(creep, roomsToScout) {
    if (creep.memory.scouting == false && roomsToScout.length > 0) {
      creep.memory.scouting = true;
    }
    if (creep.memory.scouting == true) {
      if (creep.room.name != creep.memory.targetRoom) {
        creep.moveTo(creep.room.controller);
        var exit = creep.room.findExitTo(creep.memory.targetRoom);
        creep.moveTo(creep.pos.findClosestByRange(exit));
      }else if(creep.room.name == creep.memory.targetRoom){
        creep.moveTo(creep.room.controller);
        var sourcesObj = creep.room.find(FIND_SOURCES);
        var sourceObjects = {}
        var sources = [];
        for (var i in sourcesObj) {
          var source = sourcesObj[i];
          sources.push(source.id);
        }
        var currentObject = Memory.WorldManager.OperateRooms[creep.memory.homeRoom].RemoteHarvestRooms;
        sourceObjects[creep.memory.targetRoom] = sources;
        Memory.WorldManager.OperateRooms[creep.memory.homeRoom].RemoteHarvestRooms = Object.assign(currentObject, sourceObjects);
        creep.memory.scouting == false
        worldManager.stopScoutRoom(creep.memory.homeRoom, creep.memory.targetRoom);
        return "Success";
      }
    }
    else if (creep.memory.scouting == false) {
      if (creep.room.name == creep.memory.targetRoom) {
        var exit = creep.room.findExitTo(creep.memory.targetRoom);
        creep.moveTo(creep.pos.findClosestByRange(exit));
      }
    }
  }
};
module.exports = roleScout;
