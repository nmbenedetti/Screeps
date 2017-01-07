require('prototype.spawn')();
var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder');
var roleMover = require('roleMover');
var roleRepairer = require('roleRepairer');
var roleRemoteHarvester = require('roleRemoteHarvester');
var roleScout = require('roleScout');
var roleAttacker = require('roleAttacker');
var roleClaimer = require('roleClaimer');

var NUM_BUILDER = 1;
var NUM_HARVESTER = 2;
var NUM_UPGRADER =4;
var NUM_MOVER = 2;
var NUM_REPAIRER = 1;
var NUM_SCOUTS = 1;
var NUM_ATTACKERS = 2;
var NUM_CLAIMERS = 1;
var NUM_RESERVERS = 2;

module.exports.loop = function () {
 /*var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  var remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester');
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
  var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
  var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'Scout');
  var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
  var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.action == 'claim');
  var reservers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.action == 'reserve');*/

 
 


  var roomsToScout = [];
  var roomsToHarvest = [];
  var roomToAttack = [];
  var roomTOClaim =[];
  var roomTOReserve =['E73N77'];

  /*
  TO DO LIST for next major release
  - Add containers in the room to the spawn will be used to determine if movers are needed
  */

  for(var i in Game.spawns){

   var spawn = Game.spawns[i];
     var maxEnergeyAvailable = spawn.room.energyCapacityAvailable;
  var currentEnergyAvailable = spawn.room.energyAvailable;
    var spawnRoomName = spawn.room.name;


  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.homeRoom == spawnRoomName);
  var remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester'  && creep.memory.homeRoom == spawnRoomName);
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'  && creep.memory.homeRoom == spawnRoomName);
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'  && creep.memory.homeRoom == spawnRoomName);
  var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover'  && creep.memory.homeRoom == spawnRoomName);
  var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'  && creep.memory.homeRoom == spawnRoomName);
  var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'Scout'  && creep.memory.homeRoom == spawnRoomName);
  var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker'  && creep.memory.homeRoom == spawnRoomName);
  var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.action == 'claim'  && creep.memory.homeRoom == spawnRoomName);
  var reservers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.action == 'reserve'  && creep.memory.homeRoom == spawnRoomName);

 console.log("*****CREEP COUNTS FOR ROOM"+ spawnRoomName +"*****");
  console.log("HARVESTERS: " + harvesters.length);
  console.log("REMOTE HARVESTERS: " + remoteHarvesters.length);
  console.log("BUILDERS:   " + builders.length);
  console.log("UPGRADERS:  " + upgraders.length);
  console.log("MOVERS:     " + movers.length);
  console.log("scouts:     " + scouts.length);
  console.log("attackers:     " + attackers.length);
  console.log("claimers:     " + claimers.length);
  console.log("reservers:     " + reservers.length);
  console.log("**********************");



 


    if ( typeof spawn.memory.isOld == 'undefined' || spawn.memory.isOld == false) {
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
            
            if(harvesters.length == 0){
                name = spawn.createHarvester(currentEnergyAvailable,"harvester");
             // name = Game.spawns["Spawn1"].createHarvester(currentEnergyAvailable,"harvester");
            }else{
               name = spawn.createHarvester(maxEnergeyAvailable,"harvester");
              //name = Game.spawns["Spawn1"].createHarvester(maxEnergeyAvailable,"harvester");
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

            if(harvesters.length == 0){
                 name = spawn.createRemoteHarvester(currentEnergyAvailable,"remoteHarvester");
             // name = Game.spawns["Spawn1"].createRemoteHarvester(currentEnergyAvailable,"remoteHarvester");
            }else{
              //name = Game.spawns["Spawn1"].createRemoteHarvester(maxEnergeyAvailable,"remoteHarvester");
             name = spawn.createRemoteHarvester(maxEnergeyAvailable,"remoteHarvester");
            }
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

    if(movers.length < NUM_MOVER) {
      var newName = spawn.createMover(maxEnergeyAvailable, "mover");
      if(movers.length == 0){
        var newName = spawn.createMover(currentEnergyAvailable, "mover");
      }
    }

    if(roomToAttack.length > 0 && attackers.length < NUM_ATTACKERS){
      var newName = spawn.createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,TOUGH,ATTACK,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'attacker' , homeRoom: spawnRoomName, targetRoom:roomToAttack[0]});
    }


    if(roomsToScout.length > 0 && scouts.length < NUM_SCOUTS){
      var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'Scout' , homeRoom: spawnRoomName, targetRoom:roomsToScout[0], scouting: false});
    }

    if(roomTOClaim.length > 0 && claimers.length < NUM_CLAIMERS){
      var newName = spawn.createCreep([CLAIM,MOVE,MOVE,MOVE], undefined, {role: 'claimer' , action:'claim', homeRoom: spawnRoomName, targetRoom:roomToAttack[0]});
    }else if (roomTOReserve.length > 0 && reservers.length < NUM_RESERVERS) {
      var newName = spawn.createCreep([CLAIM,MOVE,MOVE,MOVE], undefined, {role: 'claimer' , action:'reserve', homeRoom: spawnRoomName, targetRoom:roomTOReserve[0]});
    }

    if(builders.length < NUM_BUILDER){
      console.log("Builder");
      var newName = spawn.createBuilder( maxEnergeyAvailable, "builder");
      console.log(newName);
      if(builders.length == 0){
        var newName = spawn.createBuilder(currentEnergyAvailable, "builder");
      }
    }else if(upgraders.length < NUM_UPGRADER) {
      var newName = spawn.createUpgrader(maxEnergeyAvailable, "upgrader");
      if(upgraders.length == 0){
        var newName = spawn.createUpgrader(currentEnergyAvailable, "upgrader");
      }
    }else  if (repairers.length < NUM_REPAIRER) {
      var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer' , repairing: false,homeRoom: spawn.room.name});
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
      }else if(creep.memory.role == 'attacker'){
        roleAttacker.attackLocation(creep, roomToAttack[0]);
      }else if(creep.memory.role == 'claimer'){
        if(creep.memory.action == 'claim'){
          roleClaimer.claimLocation(creep, roomTOClaim[0]);
        }else if(creep.memory.action == 'reserve'){
          //console.log('I am a claimer with the reserve role');
          roleClaimer.claimLocation(creep, roomTOReserve[0]);
        }

      }
    }

    var hostiles = spawn.room.find(FIND_HOSTILE_CREEPS);

    if(hostiles.length > 0) {
      var username = hostiles[0].owner.username;
      Game.notify(`User ${username} spotted in spawn`);
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
