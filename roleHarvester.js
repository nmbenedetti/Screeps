
var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    //If creep is transfering and runs out of energy
     if (creep.memory.working == false && creep.carry.energy == 0) {
       creep.memory.working = true;
    }
    //If creep is gathering and fills it's capacity
    if (creep.memory.working == true && creep.carry.energy == creep.carryCapacity) {
      creep.memory.working = false;
    }
    //If creep needs to transfer energy to spawn
    if (creep.memory.working == false  && creep.carry.energy > 0 ) {
      creep.unloadEnergy("harvester");
    }
    //If creep needs to gather energy from a source
    else if ((creep.memory.working == true ) && creep.carry.energy < creep.carryCapacity) {
      var source = Game.getObjectById(creep.memory.assignedSource); //creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
	}
};

module.exports = roleHarvester;
