var roleMover = {
  run: function(creep) {
    //If i have space move to container and fill up
    if (creep.energy < creep.carryCapacity) {
      var containerWithEnergy = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
              return ( structure.structureType == STRUCTURE_CONTAINER  && structure.energy > 0);
          }
      });

      if (containerWithEnergy.length > 0) {
        if(creep.transfer(containerWithEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(containerWithEnergy[0]);
        }
      }
    }else if (creep.energy = creep.carryCapacity) {
      //
    }
    //If full move to extensions or spawn and drop off
      //If the spawn and extension is full
  }
};

module.exports = roleUpgrader;
