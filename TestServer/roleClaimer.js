var worldManager = require('worldManager');
var roleClaimer = {

  /** @param {Creep} creep **/
  claimLocation: function(creep){
    if (creep.room.name == creep.memory.targetRoom) {
        creep.moveTo(creep.room.controller);
      if(creep.room.controller && !creep.room.controller.my) {
        if(creep.memory.action == 'claim'){
          console.log(creep.claimController(creep.room.controller)+' RESULT');
          var result = creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE
          if(result == -9) {
              creep.moveTo(creep.room.controller);
          }else if(result == 0){
              worldManager.stopClaimRoom(creep.memory.homeRoom, creep.memory.targetRoom);
          }
        }else if (creep.memory.action= 'reserve'){
          if(creep.reserveController(creep.room.controller) == OK) {
               creep.moveTo(creep.room.controller);
           }
        }
      }
    //  console.log('here');
    }else{
      //console.log('here or here');
       var exit = creep.room.findExitTo(creep.memory.targetRoom);
       creep.moveTo(creep.pos.findClosestByRange(exit));
    }
  }

};

module.exports = roleClaimer;
