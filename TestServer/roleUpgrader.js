var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {
    //If creep is upgrading and runs out of energy
    if(creep.memory.upgrading == true && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      //creep.say("Swap to harvesting!");
	  }
    //If creep is gathering and fills it's capacity
	  else if(creep.memory.upgrading == false && creep.carry.energy == creep.carryCapacity) {
	    creep.memory.upgrading = true;
      //creep.say("Swap to upgrading!");
	  }
    //If creep needs to use energy to upgrade the controller
	  if(creep.memory.upgrading == true) {
      //creep.say("Upgrading!");
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
    //If creep needs to gather energy
    else if (creep.memory.upgrading == false) {
      //creep.say("Harvesting!");
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
	}

};

module.exports = roleUpgrader;
