
var roleAttacker = {

  /** @param {Creep} creep **/

  attackLocation: function(creep,roomName){
    if (creep.room.name == creep.memory.targetRoom) {
      var towers = this.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
              return (
                  (structure.structureType == STRUCTURE_TOWER && structure.energy > 100));
          }
      });

      if(towers < 0 || typeof towers == 'undefined'){
        creep.attackRoom();
      }


    }else{
      while(creep.hits < creep.hitsMax){
        creep.heal(creep);
      }

       var exit = creep.room.findExitTo(creep.memory.targetRoom);
       creep.moveTo(creep.pos.findClosestByRange(exit));
    }
  }

};

module.exports = roleAttacker;
