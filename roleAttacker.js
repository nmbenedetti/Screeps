
var roleAttacker = {

  /** @param {Creep} creep **/

  attackLocation: function(creep,roomName){
    if (creep.room.name == creep.memory.targetRoom) {
      var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      var tower = creep.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                    return (
                      (structure.structureType == STRUCTURE_TOWER ));
                  }
          });
          var extension = creep.room.find(FIND_STRUCTURES, {
                      filter: (structure) => {
                        return (
                          (structure.structureType == STRUCTURE_EXTENSION ));
                      }
              });
               var spawn = creep.room.find(FIND_STRUCTURES, {
                     filter: (structure) => {
                        return (
                          (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_LINK ));
                      }
              });
             console.log(target);
      if(tower.length != 0) {
          if(creep.attack(tower[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(tower[0]);
          }
      }else if (target != null) {
        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
      }else if (extension.length != 0){
        if(creep.attack(extension[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(extension[0]);
        }
      }else if(spawn.length != 0){
          if(creep.attack(spawn[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn[0]);
        }
      }else{
          creep.moveTo(creep.room.controller);
      }


    }else{
       var exit = creep.room.findExitTo(creep.memory.targetRoom);
       creep.moveTo(creep.pos.findClosestByRange(exit));
    }
  }

};

module.exports = roleAttacker;
