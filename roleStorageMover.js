require('prototype.creep')();
var roleStorageMover = {
  run: function(creep) {
    //If i have space move to container and fill up
    if (creep.carry.energy == 0) {
      var storageWithEnergy = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
              return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 0);
          }
      });
      var storageID = creep.pos.findClosestByPath(storageWithEnergy);
      if(creep.withdraw(storageID, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storageID);
        }


    }else if (creep.carry.energy != 0) {
      creep.unloadEnergy("storageMover");
    }
  }
};

module.exports = roleStorageMover;
