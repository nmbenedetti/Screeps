require('prototype.spawn')();
var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder');
var roleMover = require('roleMover');
var roleRepairer = require('roleRepairer');

var NUM_BUILDER = 1;
var NUM_HARVESTER = 2;
var NUM_UPGRADER = 2;
var NUM_MOVER = 2;
var NUM_REPAIRER = 2;

module.exports.loop = function () {
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
  var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

console.log("*****CREEP COUNTS*****");
console.log("HARVESTERS: " + harvesters.length);
console.log("BUILDERS:   " + builders.length);
console.log("UPGRADERS:  " + upgraders.length);
console.log("MOVERS:     " + movers.length);
console.log("**********************");

var maxEnergeyAvailable = Game.spawns.Spawn1.room.energyCapacityAvailable;
var currentEnergyAvailable = Game.spawns.Spawn1.room.energyAvailable;

  for(var i in Game.spawns){
    var spawn = Game.spawns[i];
    if ( typeof spawn.memory.isOld == 'undefined') {
      var sources = spawn.room.find(FIND_SOURCES)
      spawn.memory.sources = [];
      for (var i in sources) {
        var source = sources[i];
        spawn.memory.sources.push(source.id);
      }
      spawn.memory.isOld = true;
    }

    var name;

    //If not enough harvesters
    if (harvesters.length < NUM_HARVESTER) {
      //Attempt to spawn one
     name = Game.spawns["Spawn1"].createHarvester(maxEnergeyAvailable,"harvester");
     if(harvesters.length == 0){
        name = Game.spawns["Spawn1"].createHarvester(currentEnergyAvailable,"harvester");
     }
     console.log(name);
      //If the spawn is successful
      if (!(name < 0)) {
        //Get the creep object
        var newCreep = Game.creeps[name];
        //Create memory locations
        newCreep.memory.assignedSource = "";
        newCreep.memory.homeSpawn = spawn.id;
        //Generate an array of already occupied sources on the fly
        var harvesterIDArray = [];
        for (var i in harvesters) {
          var harvest = harvesters[i].memory.assignedSource;
          harvesterIDArray.push(harvest);
        }
        //Compare the source list of the spawner against the occupied sources list to find an open one
        for (var i in spawn.memory.sources) {
          var spawnListing = spawn.memory.sources[i];
          var spot = harvesterIDArray.indexOf(spawnListing);
          //If spot is -1, the current spawnlisting does not exist and should be assigned.
          if (spot == -1) {
            newCreep.memory.assignedSource = spawnListing;
          }
        }
        console.log("Spawned new harvester: " + name + "; Assgned to : " + newCreep.memory.assignedSource);
      }
    } else if(upgraders.length < NUM_UPGRADER) {
        var newName = Game.spawns.Spawn1.createUpgrader(maxEnergeyAvailable, "upgrader");
      }else if(builders.length < NUM_BUILDER){
        var newName = Game.spawns.Spawn1.createBuilder( maxEnergeyAvailable, "builder");
      }else if(movers.length < NUM_MOVER) {
        var newName = Game.spawns.Spawn1.createMover(maxEnergeyAvailable, "mover");
        if(movers.length == 0){
            var newName = Game.spawns.Spawn1.createMover(currentEnergyAvailable, "mover");
        }
      }else if (repairers.length < NUM_REPAIRER) {
          var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer' , repairing: false});
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
      }else if (creep.memory.role == 'repairer') {
      roleRepairer.run(creep);
    }


  }

    //Look for dead creeps and remove from memory
    for(var i in Memory.creeps) {
      if(!Game.creeps[i]) {
        delete Memory.creeps[i];
      }
    }
  }
}
