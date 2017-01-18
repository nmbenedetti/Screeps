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
          return (structure.structureType == STRUCTURE_STORAGE );
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
        }
      }else if (EMPTY_TOWER_LOCATIONS.length >0) {
        if(this.transfer(EMPTY_TOWER_LOCATIONS[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(EMPTY_TOWER_LOCATIONS[0]);
        }
      }else if (EMPTY_STORAGE_LOCATIONS.length > 0){
        if(this.transfer(EMPTY_STORAGE_LOCATIONS[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(EMPTY_STORAGE_LOCATIONS[0]);
        }
      }
    }else if(role == 'harvester'){
      var EMPTY_SPAWN_LOCATIONS = this.room.find(FIND_STRUCTURES,{
        filter: (structure) => {
          return(structure.structureType == STRUCTURE_SPAWN
            || structure.structureType == STRUCTURE_EXTENSION) && (structure.energy < structure.energyCapacity);
        }
      });

      var EMPTY_STORAGE_LOCATIONS = this.room.find(FIND_STRUCTURES,{
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_STORAGE );
        }
      });

      var EMPTY_TOWER_LOCATIONS = this.room.find(FIND_STRUCTURES,{
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity );
        }
      });

      var container = this.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                    return (
                    //  (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION)
                    (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity)
                    );
                  }
          });
      if(container.length > 0) {
          if(this.transfer(this.pos.findClosestByPath(container), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              this.moveTo(this.pos.findClosestByPath(container));
          }
        } else if (EMPTY_SPAWN_LOCATIONS.length > 0) {
        if(this.transfer(EMPTY_SPAWN_LOCATIONS[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(EMPTY_SPAWN_LOCATIONS[0]);
        }
      }else if (EMPTY_STORAGE_LOCATIONS.length > 0){
        if(this.transfer(EMPTY_STORAGE_LOCATIONS[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(EMPTY_STORAGE_LOCATIONS[0]);
        }
      }
    }
  }

  Creep.prototype.attackRoom = function(){
    var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    var tower = this.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                  return (
                    (structure.structureType == STRUCTURE_TOWER ));
                }
        });
        var extension = this.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                      return (
                        (structure.structureType == STRUCTURE_EXTENSION ));
                    }
            });
             var spawn = this.room.find(FIND_STRUCTURES, {
                   filter: (structure) => {
                      return (
                        (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_LINK ));
                    }
            });

    if(tower.length != 0) {
        if(this.attack(tower[0]) == ERR_NOT_IN_RANGE) {
            this.moveTo(tower[0]);
        }
    }else if (target != null) {
      if(this.attack(target) == ERR_NOT_IN_RANGE) {
          this.moveTo(target);
      }
    }else if (extension.length != 0){
      if(this.attack(extension[0]) == ERR_NOT_IN_RANGE) {
          this.moveTo(extension[0]);
      }
    }else if(spawn.length != 0){
        if(this.attack(spawn[0]) == ERR_NOT_IN_RANGE) {
          this.moveTo(spawn[0]);
      }
    }else{
        this.moveTo(this.room.controller);
    }
  }
};
