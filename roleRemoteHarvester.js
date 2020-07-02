
var roleRemoteHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    //If creep is transfering and runs out of energy
    if (creep.memory.working == true && creep.carry.energy == 0) {
      creep.memory.working = false;

    }
    //If creep is gathering and fills it's capacity
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
      //creep.say("Swap to working!");
    }
    //If creep needs to transfer energy to spawn
    if (creep.memory.working == true && creep.room.name == creep.memory.targetRoom) {
      //creep.say("Working!");
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if(targets.length > 0) {
        //creep.say("Building!");
        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }else{
      if (creep.room.name == creep.memory.homeRoom) {

         var targets = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return ((structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] < structure.storeCapacity));
                  //  ||(structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION));
          }
        });
        if(targets.length > 0) {
            if(creep.transfer(creep.pos.findClosestByPath(targets), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.pos.findClosestByPath(targets));
            }
          }


      }else{
         //console.log("going home");
         //console.log(creep.memory.homeRoom);
         var exit = creep.room.findExitTo(creep.memory.homeRoom);
         // and move to exit
        // console.log(exit);
         creep.moveTo(creep.pos.findClosestByRange(exit));
      }
}
    }
    //If creep needs to gather energy from a source
    else if (creep.memory.working == false) {
      if (creep.room.name == creep.memory.targetRoom) {
        var source = Game.getObjectById(creep.memory.assignedSource); //creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }
      }else {
          // find exit to target room
          var exit = creep.room.findExitTo(creep.memory.targetRoom);
          // move to exit
          creep.moveTo(creep.pos.findClosestByRange(exit));
      }


    }
	}

};

module.exports = roleRemoteHarvester;
