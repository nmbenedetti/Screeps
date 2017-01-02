
var roleClaimer = {

  /** @param {Creep} creep **/
  claimLocation: function(creep,roomName){
    if (creep.room.name == creep.memory.targetRoom) {
        creep.moveTo(creep.room.controller);
      if(creep.room.controller && !creep.room.controller.my) {
        if(creep.memory.action == 'claim'){
          if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller);
          }
        }else if (creep.memory.action= 'reserve'){
          if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
               creep.moveTo(creep.room.controller);
           }
        }
      }
      console.log('here');
    }else{
      console.log('here or here');
       var exit = creep.room.findExitTo(creep.memory.targetRoom);
       creep.moveTo(creep.pos.findClosestByRange(exit));
    }
  }

};

module.exports = roleClaimer;
