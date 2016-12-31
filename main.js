require('prototype.spawn')();
var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder');
var roleMover = require('roleMover');
var roleRepairer = require('roleRepairer');
var roleAttacker = require('roleAttacker');
var roleClaimer = require('roleClaimer');

var NUM_BUILDER = 1;
var NUM_HARVESTER = 2;
var NUM_UPGRADER = 2;
var NUM_MOVER = 2;
var NUM_REPAIRER = 2;
var NUM_ATTACKERS = 5;
var NUM_CLAIMERS = 3;

module.exports.loop = function () {
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
  var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
  var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
  var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');

console.log("*****CREEP COUNTS*****");
console.log("HARVESTERS: " + harvesters.length);
console.log("BUILDERS:   " + builders.length);
console.log("UPGRADERS:  " + upgraders.length);
console.log("MOVERS:     " + movers.length);
console.log("**********************");

var maxEnergeyAvailable = Game.spawns.Spawn1.room.energyCapacityAvailable;
var currentEnergyAvailable = Game.spawns.Spawn1.room.energyAvailable;
var roomToAttack = [];

  for(var i in Game.spawns){
    var spawn = Game.spawns[i];
    var spawnRoomName = spawn.room.name;
    if ( typeof spawn.memory.isOld == 'undefined') {
      var sources = spawn.room.find(FIND_SOURCES)
      spawn.memory.sources = [];
      for (var i in sources) {
        var source = sources[i];
        spawn.memory.sources.push(source.id);
      }
      spawn.memory.isOld = true;
    }

    if(roomToAttack.length > 0 && attackers.length < NUM_ATTACKERS){
    var newName = Game.spawns['Spawn1'].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,TOUGH,ATTACK,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'attacker' , homeRoom: spawnRoomName, targetRoom:roomToAttack[0]});
  }

  if(roomToAttack.length > 0 && claimers.length < NUM_CLAIMERS){
  var newName = Game.spawns['Spawn1'].createCreep([CLAIM,MOVE,MOVE,MOVE], undefined, {role: 'claimer' , homeRoom: spawnRoomName, targetRoom:roomToAttack[0]});
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
      }else if(creep.memory.role == 'attacker'){
          roleAttacker.attackLocation(creep, roomToAttack[0]);
      }else if(creep.memory.role == 'claimer'){
          roleClaimer.claimLocation(creep, roomToAttack[0]);
      }


  }

  var hostiles = Game.spawns.Spawn1.room.find(FIND_HOSTILE_CREEPS);

  if(hostiles.length > 0) {
      var username = hostiles[0].owner.username;
      Game.notify(`User ${username} spotted in Spawn1`);
      var towers = Game.spawns.Spawn1.room.find(
          FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
      towers.forEach(tower => tower.attack(hostiles[0]));
  }

    //Look for dead creeps and remove from memory
    for(var i in Memory.creeps) {
      if(!Game.creeps[i]) {
        delete Memory.creeps[i];
      }
    }
  }
}
