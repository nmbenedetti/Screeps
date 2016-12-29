require('prototype.spawn')();
var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder');
var roleMover = require('roleMover');
var roleRepairer = require('roleRepairer');
var roleRemoteHarvester = require('roleRemoteHarvester');
var roleScout = require('roleScout');

var NUM_BUILDER = 2;
var NUM_HARVESTER = 2;
var NUM_UPGRADER = 4;
var NUM_MOVER = 2;
var NUM_REPAIRER = 2;
var NUM_SCOUTS = 1;

module.exports.loop = function () {
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester');
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
  var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
  var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'Scout');
  /*
  console.log("*****CREEP COUNTS*****");
  console.log("HARVESTERS: " + harvesters.length);
  console.log("BUILDERS:   " + builders.length);
  console.log("UPGRADERS:  " + upgraders.length);
  console.log("MOVERS:     " + movers.length);
  console.log("**********************");
  */
  var maxEnergeyAvailable = Game.spawns.Spawn1.room.energyCapacityAvailable;
  var currentEnergyAvailable = Game.spawns.Spawn1.room.energyAvailable;

  var roomsToScout = ["W7N4"];
  var roomsToHarvest = [];

  /*
  TO DO LIST for next major release
  - Add containers in the room to the spawn will be used to determine if movers are needed
  - Finish defender rool out
  - Multi room harvesting
  */

  for(var i in Game.spawns){

    var spawn = Game.spawns[i];
    var spawnRoomName = spawn.room.name;

    if(roomsToScout.length > 0 && scouts.length < NUM_SCOUTS){
      var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'Scout' , homeRoom: spawnRoomName, targetRoom:roomsToScout[0], scouting: false});
    }

    if ( typeof spawn.memory.isOld == 'undefined') {
      var sourcesObj = spawn.room.find(FIND_SOURCES)
      var sourceObjects = {}
      var sources = [];
      for (var i in sourcesObj) {
        var source = sourcesObj[i];
        sources.push(source.id);
      }
      sourceObjects[spawnRoomName] = sources;
      spawn.memory.roomSources = sourceObjects;
      spawn.memory.isOld = true;
    }

    var name;
    var harvesterIDArray = [];
    for (var i in harvesters) {
      var harvest = harvesters[i].memory.assignedSource;
      harvesterIDArray.push(harvest);
    }

    for (var i in remoteHarvesters) {
      var harvest = remoteHarvesters[i].memory.assignedSource;
      harvesterIDArray.push(harvest);
    }
    //console.log(harvesterIDArray);
    for(var i in spawn.memory.roomSources){
      //  console.log("Room " + i);

      for(var t in spawn.memory.roomSources[i]){
        var spawnListing = spawn.memory.roomSources[i][t];
        //console.log(spawnListing);
        var spot = harvesterIDArray.indexOf(spawnListing);
        if (spot == -1) {
          if(spawnRoomName == i ){
            // spawn normal harvester
            name = Game.spawns["Spawn1"].createHarvester(maxEnergeyAvailable,"harvester");
            if(harvesters.length == 0){
              name = Game.spawns["Spawn1"].createHarvester(currentEnergyAvailable,"harvester");
            }
            if (!(name < 0)){
              var newCreep = Game.creeps[name];
              newCreep.memory.homeSpawn = spawn.id;
              newCreep.memory.homeRoom = spawnRoomName;
              newCreep.memory.targetRoom = spawnRoomName;
              newCreep.memory.assignedSource = spawnListing;
            }
          }else{
            // spawn long distance
            name = Game.spawns["Spawn1"].createRemoteHarvester(maxEnergeyAvailable,"remoteHarvester");
            if (!(name < 0)){
              var newCreep = Game.creeps[name];
              newCreep.memory.homeSpawn = spawn.id;
              newCreep.memory.homeRoom = spawnRoomName;
              newCreep.memory.targetRoom = i;
              newCreep.memory.assignedSource = spawnListing;
            }
          }

        }
      }
    }




    if(upgraders.length < NUM_UPGRADER) {
      var newName = Game.spawns.Spawn1.createUpgrader(maxEnergeyAvailable, "upgrader");
      if(upgraders.length == 0){
        var newName = Game.spawns.Spawn1.createUpgrader(currentEnergyAvailable, "upgrader");
      }
    }else if(builders.length < NUM_BUILDER){
      var newName = Game.spawns.Spawn1.createBuilder( maxEnergeyAvailable, "builder");
      if(builders.length == 0){
        var newName = Game.spawns.Spawn1.createBuilder(currentEnergyAvailable, "builder");
      }
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
      }else if(creep.memory.role == 'upgrader') {
        //console.log("im an upgrader");
        roleUpgrader.run(creep);
      }else if(creep.memory.role == 'builder') {
        roleBuilder.run(creep);
      }else if(creep.memory.role == 'mover'){
        roleMover.run(creep)
      }else if (creep.memory.role == 'repairer') {
        roleRepairer.run(creep);
      }else if (creep.memory.role == 'remoteHarvester') {
        //console.log("Am I a remote harvester");
        roleRemoteHarvester.run(creep);
      }else if (creep.memory.role == 'Scout') {
        var result = roleScout.run(creep, roomsToScout,spawn);
        if(result == "Success"){
          roomsToScout = [];
        }
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
