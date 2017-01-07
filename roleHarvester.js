
var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    //If creep is transfering and runs out of energy
    if (creep.memory.working == true && creep.carry.energy == 0) {
      creep.memory.working = false;
      //creep.say("Swap to harvesting!");
    }
    //If creep is gathering and fills it's capacity
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = true;
      //creep.say("Swap to working!");
    }
    //If creep needs to transfer energy to spawn
    if (creep.memory.working == true) {
      //creep.say("Working!");
       creep.unloadEnergy("harvester");
      /*
      var targets = creep.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                    return (
                    //  (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION)
                    (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity)
                    );
                  }
          });
          if(targets.length > 0) {
              if(creep.transfer(creep.pos.findClosestByPath(targets), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(creep.pos.findClosestByPath(targets));
              }
            }*/
    }
    //If creep needs to gather energy from a source
    else if (creep.memory.working == false) {
      //creep.say("Harvesting!");
      var source = Game.getObjectById(creep.memory.assignedSource); //creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
	}

};

module.exports = roleHarvester;
