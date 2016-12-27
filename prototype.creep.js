module.exports = function(){
  Creep.prototype.unloadEnergy = function(role){
    if(role == 'mover'){
      var EMPTY_SPAWN_LOCATIONS = this.room.find(FIND_STRUCTURES,{
        filter: (structure) => {
          return(structure.structureType == STRUCTURE_SPAWN
            || structure.structureType == STRUCTURE_EXTENSION) && (structure.energy < structure.energyCapacity);
        }
      });

      var EMPTY_STORAGE_LOCATIONS = this.room.find(FIND_STRUCTURES,{
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > structure.storeCapacity);
        }
      });

      var EMPTY_TOWER_LOCATIONS = this.room.find(FIND_STRUCTURES,{
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity );
        }
      });

      if (EMPTY_SPAWN_LOCATIONS.length > 0) {
        if(this.transfer(EMPTY_SPAWN_LOCATIONS[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(EMPTY_SPAWN_LOCATIONS[0]);
            console.log("Going to spawn");
        }
      }else if (EMPTY_STORAGE_LOCATIONS.length > 0){
        if(this.transfer(EMPTY_STORAGE_LOCATIONS[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(EMPTY_STORAGE_LOCATIONS[0]);
            console.log("Going to storage");
        }
      }else if (EMPTY_TOWER_LOCATIONS.length >0) {
        if(this.transfer(EMPTY_TOWER_LOCATIONS[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(EMPTY_TOWER_LOCATIONS[0]);
            console.log("Going to tower");
        }
      }
    }
  }
};
