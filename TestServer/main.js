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
var worldManager = require('worldManager');


var NUM_BUILDER = 1;
var NUM_UPGRADER =2;
var NUM_MOVER = 3;
var NUM_REPAIRER = 1;
var NUM_ATTACKERS = 2;
var NUM_CLAIMERS = 1;

var logging = false;

module.exports.loop = function () {





  var roomsToScout = [];
  var roomsToHarvest = [];
  var roomToAttack = [];
  var roomTOClaim =[];
  var roomTOReserve =['W6N3','W7N4'];

  /*
  TO DO LIST for next major release
  - Add containers in the room to the spawn will be used to determine if movers are needed
  - Write code to clear out old memory on old build versions to not cause issues
  */


  for(var i in Memory.WorldManager.OperateRooms){
    var roomName = i;
    var roomInfo =  Memory.WorldManager.OperateRooms[i];
    var maxEnergeyAvailable = Game.rooms[i].energyCapacityAvailable;
    var currentEnergyAvailable = Game.rooms[i].energyAvailable;

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.homeRoom == i);
    var remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHarvester'  && creep.memory.homeRoom == i);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'  && creep.memory.homeRoom == i);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'  && creep.memory.homeRoom == i);
    var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover'  && creep.memory.homeRoom == i);
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'  && creep.memory.homeRoom == i);
    var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'Scout'  && creep.memory.homeRoom == i);
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker'  && creep.memory.homeRoom == i);
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.action == 'claim'  && creep.memory.homeRoom == i);
    var reservers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.action == 'reserve'  && creep.memory.homeRoom == i);

    var name;
    var standardHarvesterArray = [];
    for (var y in harvesters) {
      var harvest = harvesters[y].memory.assignedSource;
      standardHarvesterArray.push(harvest);
    }

    var remoteHarvesterArray = [];
    for (var y in remoteHarvesters) {
      var remoteHarvest = remoteHarvesters[y].memory.assignedSource;
      remoteHarvesterArray.push(remoteHarvest);
    }

    var scoutRoomArray = [];
    for (var y in scouts) {
      var scoutRoom = scouts[y].memory.targetRoom;
      scoutRoomArray.push(scoutRoom);
    }

    // Loop and build herversters
    for(var x in roomInfo.Spawns){0

      var spawnRaw = roomInfo.Spawns[x];
      var spawnRoomName = spawnRaw.name;
      var spawn = Game.spawns[spawnRoomName];

      for(var source in roomInfo.SourceIDS){
        var sourceID = roomInfo.SourceIDS[source];
        var spot = standardHarvesterArray.indexOf(sourceID);
        if (spot == -1) {
          if(harvesters.length == 0){
            name = spawn.createHarvester(currentEnergyAvailable,"harvester");
          }else{
            name = spawn.createHarvester(maxEnergeyAvailable,"harvester");
          }

          if (!(name < 0)){
            var newCreep = Game.creeps[name];
            newCreep.memory.homeSpawn = spawn.id;
            newCreep.memory.homeRoom = roomName;
            newCreep.memory.targetRoom = roomName;
            newCreep.memory.assignedSource = sourceID;
          }
        }
      }

      for(var remoteRoom in roomInfo.RemoteHarvestRooms){
        for(var source in roomInfo.RemoteHarvestRooms[remoteRoom]){
          var sourceID = roomInfo.RemoteHarvestRooms[remoteRoom][source];
          var spot = remoteHarvesterArray.indexOf(sourceID);
          if (spot == -1) {
            if(remoteHarvesters.length == 0){
              name = spawn.createRemoteHarvester(currentEnergyAvailable,"remoteHarvester");
            }else{
              name = spawn.createRemoteHarvester(maxEnergeyAvailable,"remoteHarvester");
            }

            if (!(name < 0)){
              var newCreep = Game.creeps[name];
              newCreep.memory.homeSpawn = spawn.id;
              newCreep.memory.homeRoom = roomName;
              newCreep.memory.targetRoom = remoteRoom;
              newCreep.memory.assignedSource = sourceID;
            }
          }
        }
      }

      for(var scoutRoom in roomInfo.ScoutRooms){
        var scoutRoomName = roomInfo.ScoutRooms[scoutRoom];
        var spot = scoutRoomArray.indexOf(scoutRoomName);
        if(spot == -1){
          var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'Scout' , homeRoom: roomName, targetRoom:scoutRoomName, scouting: false});
        }
      }

      for(var reserveRoom in roomInfo.ReserveRooms){
        var reserveRoomName = roomInfo.ReserveRooms[reserveRoom];
        var reservers = _.filter(Game.creeps, (creep) => creep.memory.action == 'reserve'  && creep.memory.homeRoom == i && creep.memory.targetRoom == reserveRoomName);

        if(typeof reservers.length == 'undefined' || reservers.length < 2){
          newName = spawn.createCreep([CLAIM,MOVE,MOVE,MOVE], undefined, {role: 'claimer' , action:'reserve', homeRoom: roomName, targetRoom:reserveRoomName});
        }
      }

      if(logging == true){
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
      }


    }
  }


for(var i in Game.spawns){

    var spawn = Game.spawns[i];
    var maxEnergeyAvailable = spawn.room.energyCapacityAvailable;
    var currentEnergyAvailable = spawn.room.energyAvailable;
    var spawnRoomName = spawn.room.name;

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'  && creep.memory.homeRoom == spawnRoomName);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'  && creep.memory.homeRoom == spawnRoomName);
    var movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover'  && creep.memory.homeRoom == spawnRoomName);
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'  && creep.memory.homeRoom == spawnRoomName);
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker'  && creep.memory.homeRoom == spawnRoomName);
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer' && creep.memory.action == 'claim'  && creep.memory.homeRoom == spawnRoomName);

if(movers.length < NUM_MOVER) {
  var newName = spawn.createMover(maxEnergeyAvailable, "mover");
  if(movers.length == 0){
    var newName = spawn.createMover(currentEnergyAvailable, "mover");
  }
}

if(roomToAttack.length > 0 && attackers.length < NUM_ATTACKERS){
  var newName = spawn.createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,TOUGH,ATTACK,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'attacker' , homeRoom: spawnRoomName, targetRoom:roomToAttack[0]});
}

if(roomTOClaim.length > 0 && claimers.length < NUM_CLAIMERS){
  var newName = spawn.createCreep([CLAIM,MOVE,MOVE,MOVE], undefined, {role: 'claimer' , action:'claim', homeRoom: spawnRoomName, targetRoom:roomToAttack[0]});
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
    roleUpgrader.run(creep);
  }else if(creep.memory.role == 'builder') {
    roleBuilder.run(creep);
  }else if(creep.memory.role == 'mover'){
    roleMover.run(creep)
  }else if (creep.memory.role == 'repairer') {
    roleRepairer.run(creep);
  }else if (creep.memory.role == 'remoteHarvester') {
    roleRemoteHarvester.run(creep);
  }else if (creep.memory.role == 'Scout') {
    var result = roleScout.run(creep, creep.memory.targetRoom);
    if(result == "Success"){
      roomsToScout = [];
    }
  }else if(creep.memory.role == 'attacker'){
    roleAttacker.attackLocation(creep, roomToAttack[0]);
  }else if(creep.memory.role == 'claimer'){
    if(creep.memory.action == 'claim'){
      roleClaimer.claimLocation(creep, roomTOClaim[0]);
    }else if(creep.memory.action == 'reserve'){
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
