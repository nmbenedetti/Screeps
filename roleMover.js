require('prototype.creep')();
var roleMover = {
  run: function(creep) {
    //If i have space move to container and fill up
    if (creep.carry.energy == 0) {
      var containerWithEnergy = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
              return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0);
          }
      });
      var containerID = Game.getObjectById(creep.memory.assignedContainer);
    //  var containerID = creep.pos.findClosestByPath(containerWithEnergy);
      if (containerWithEnergy.length > 0) {
        if(creep.withdraw(containerID, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(containerID);
        }
      }
    }else if (creep.carry.energy != 0) {
      creep.unloadEnergy("mover");
    }
  }
};

module.exports = roleMover;
