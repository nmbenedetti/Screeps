var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {


    //If creep is upgrading and runs out of energy
    if(creep.memory.upgrading == true && creep.carry.energy == 0) {
      creep.memory.upgrading = false;


	  }else if(creep.memory.upgrading == false && creep.carry.energy == creep.carryCapacity) {
	    creep.memory.upgrading = true;

	  }
	  if(creep.memory.upgrading == true) {
      //creep.say("Upgrading!");
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }

    }else if (creep.memory.upgrading == false) {

      var containerWithEnergy = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (
              (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)
            );
          }
      });

      if(containerWithEnergy.length == 0){
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }

      }else{
        var containerID = creep.pos.findClosestByPath(containerWithEnergy);
        if (containerWithEnergy.length > 0) {
          if(creep.withdraw(containerID, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(containerID);
          }

        }
      }

    }
	}
};
module.exports = roleUpgrader;
