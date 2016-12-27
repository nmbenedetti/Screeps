
var roleRepairer = {

  /** @param {Creep} creep **/
  run: function(creep) {
    //If creep is repairing and runs out of energy
  	if(creep.memory.repairing == true && creep.carry.energy == 0) {
      creep.memory.repairing = false;
      //creep.say("Swap to harvesting!");
  	}
    //If creep is gathering and fills it's capacity
  	else if(creep.memory.repairing == false && creep.carry.energy == creep.carryCapacity) {
  	  creep.memory.repairing = true;
  	  //creep.say("Swap to repairing!");
  	}
    //If creep needs to use energy to repair structures
  	if(creep.memory.repairing == true) {
  	  var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER && structure.hits < 100000)
          ||(structure.structureType == STRUCTURE_ROAD && structure.hits < 2000);
        }
      });
      if(target) {
        //creep.say("Repairing!");
        creep.memory.target = target;
        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }else {
        creep.moveTo(Game.flags.Repair);
      }
    }
    //If creep needs to gather energy
    else if (creep.memory.repairing == false) {
      var withdrawTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER ||
            structure.structureType == STRUCTURE_STORAGE) &&
            structure.store[RESOURCE_ENERGY] > 100;
        }
      });
      if (withdrawTarget) {
        //creep.say("Withdrawing energy!");
        creep.memory.target = withdrawTarget;
        if (creep.withdraw(withdrawTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(withdrawTarget);
        }
      }
      else {
      //  creep.memory.target = Game.flags.Repairers;
      //  creep.moveTo(Game.flags.Repairers);
      }
    }
  }
}

module.exports = roleRepairer;
