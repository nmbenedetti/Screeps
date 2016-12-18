var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder');
var roleMover = require('roleMover');

var NUM_BUILDER = 7;
var NUM_HARVESTER = 5;
var NUM_UPGRADER = 4;
var NUM_MOVER = 4;

module.exports.loop = function () {
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover')

console.log("*****CREEP COUNTS*****");
console.log("HARVESTERS: " + harvesters.length);
console.log("BUILDERS:   " + builders.length);
console.log("UPGRADERS:  " + upgraders.length);
console.log("MOVERS:     " + movers.length);
console.log("**********************");

  //Spawn creeps in order
  if(harvesters.length < NUM_HARVESTER) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester', working: false});
  }
  else if(builders.length < NUM_BUILDER) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: 'builder', building: false});
  }
  else if(upgraders.length < NUM_UPGRADER) {
    var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'upgrader', upgrading: false});
  }else if (movers.length < NUM_MOVER) {
      var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,MOVE], undefined, {role: 'mover'});
  }


  //Make Creeps perform their roles
  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    else if(creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    else if(creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }else if(creep.memory.role == 'mover'){
      roleMover.run(creep)
    }

    //Look for dead creeps and remove from memory
    for(var i in Memory.creeps) {
      if(!Game.creeps[i]) {
        delete Memory.creeps[i];
      }
    }
  }
}
