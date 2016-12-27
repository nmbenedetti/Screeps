var roleRepairer = {

  run: function(creep, numOfDefenders){
    //am i defending and there are no enemys
    //defending = false
    if(creep.memory.defending == true && numOfDefenders < 0){
      creep.memory.defending = false;
    }
    if(creep.memory.defending == false && numOfDefenders > 0){
      creep.memory.defending = true;
    }
    if(creep.memory.defending == true){
       var hostiles = Game.spawns.Spawn1.room.find(FIND_HOSTILE_CREEPS);

       if(hostiles.length > 0) {
           var username = hostiles[0].owner.username;
           Game.notify(`User ${username} spotted in Spawn1`);
           var towers = Game.rooms[roomName].find(
               FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
           towers.forEach(tower => tower.attack(hostiles[0]));
       }
    }
  }

};
module.exports = roleDefender;
