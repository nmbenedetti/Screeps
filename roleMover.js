var roleMover = {
  run: function(creep) {
    //If i have space move to container and fill up
    if (creep.carry.energy < creep.carryCapacity) {
      var containerWithEnergy = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
              return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0);
          }
      });
      if (containerWithEnergy.length > 0) {
        if(creep.withdraw(containerWithEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(containerWithEnergy[0]);
        }
      }
    }else if (creep.carry.energy == creep.carryCapacity) {
      var useableEnergyLocations = creep.room.find(FIND_STRUCTURES,{
        filter: (structure) => {
          return(structure.structureType == STRUCTURE_SPAWN
            || structure.structureType == STRUCTURE_EXTENSION) && (structure.energy < structure.energyCapacity);
        }
      });

      if (useableEnergyLocations.length > 0) {
        if(creep.transfer(useableEnergyLocations[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(useableEnergyLocations[0]);
        }
      }else{
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        }
      }
    }
  }
};

module.exports = roleMover;
