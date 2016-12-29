//test
var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {
    //If creep is building and runs out of energy
  	if(creep.memory.building == true && creep.carry.energy == 0) {
      creep.memory.building = false;
  	}
    //If creep is gathering and fills it's capacity
  	else if(creep.memory.building == false && creep.carry.energy == creep.carryCapacity) {
  	  creep.memory.building = true;
  	}
    //If creep needs to use energy to build on construction sites
  	if(creep.memory.building == true) {
  	  var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if(targets.length > 0) {
        //creep.say("Building!");
        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }else {
        creep.moveTo(Game.flags.Builders);
      }
  	}
    //If creep needs to gather energy
    else if (creep.memory.building == false) {
      var containerWithEnergy = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return ((structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0));
        }});

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

module.exports = roleBuilder;
