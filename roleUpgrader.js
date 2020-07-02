var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {
        //If creep is upgrading and runs out of energy
        if(creep.memory.upgrading == true && creep.carry.energy == 0) {
          creep.memory.upgrading = false;

    	  }else if(creep.memory.upgrading == false && creep.carry.energy == creep.carryCapacity) {
    	    creep.memory.upgrading = true;
    	  }
    	  if(creep.memory.upgrading == true) {
          //creep.say("Upgrading!");
          // This used to be creep.room.controler however there is a bug where if there is swamp blocking the controller
          // and the upgrader has to leave the room to get to it then it will get stuck in that room.

          // Potential fix: Create a memory strucutre which assigns the room its supposed to upgrade.  this wayy it alwyas knows where to go
          // Tempoarrly setting to hom controler
          //console.log("Upgrader home room control: " +creep.memory.homeRoom);
          //console.log("Game Rooms:" + Game.rooms[creep.memory.homeRoom].controller);
          //console.log("The Room That I am In : " +creep.room.controller);
          if(creep.upgradeController(Game.rooms[creep.memory.homeRoom].controller) == ERR_NOT_IN_RANGE) {

            creep.moveTo(Game.rooms[creep.memory.homeRoom].controller);

          }
        }else if (creep.memory.upgrading == false) {

          var containerWithEnergy = creep.room.find(FIND_STRUCTURES, {
              filter: (structure) => {
                  return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > creep.carryCapacity );
              }
          });

          var storageWithEnergy = creep.room.find(FIND_STRUCTURES, {
              filter: (structure) => {
                  return (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 0 );
              }
          });

            if(storageWithEnergy.length > 0){
                 if(creep.withdraw(storageWithEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storageWithEnergy[0]);
            }
            }
          else if (containerWithEnergy.length > 0) {
            if(creep.withdraw(containerWithEnergy[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containerWithEnergy[0]);
            }
          }else{
              var source = creep.pos.findClosestByPath(FIND_SOURCES);
              if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(source);
              }
          }
        }
	}
};
module.exports = roleUpgrader;
