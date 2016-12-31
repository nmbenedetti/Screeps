
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
      if(tower) {
          if(creep.attack(tower[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(tower[0]);
          }
      }else if (target) {
        if(creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
      }else{
        if(creep.attack(extension) == ERR_NOT_IN_RANGE) {
            creep.moveTo(extension);
        }
      }


    }else{
       var exit = creep.room.findExitTo(creep.memory.targetRoom);
       creep.moveTo(creep.pos.findClosestByRange(exit));
    }
  }

};

module.exports = roleAttacker;
