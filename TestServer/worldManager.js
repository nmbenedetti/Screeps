var WorldManager = {

  //First run: Call from console line only one to kick off
  memoryInitialize: function(){
    console.log('~~~~~ Initializing World Manager Memory ~~~~~');
    Memory.WorldManager = {};
    if (!Memory.WorldManager){Memory.WorldManager = {}; console.log('++ Memory.WorldManager: CREATED') }
    if (!Memory.WorldManager.flags) {Memory.WorldManager.flags = {}; console.log('++ Memory.WorldManager.flags: CREATED')}
    if (!Memory.WorldManager.OperateRooms) {Memory.WorldManager.OperateRooms = {}; console.log('++ Memory.WorldManager.rooms: CREATED')}
    if (!Memory.WorldManager.spawns) {Memory.WorldManager.spawns = {};  console.log('++ Memory.WorldManager.spawns: CREATED')}
    var roomInfo ={
      Spawns: [],
      DefendRooms: [],
      AttackRooms: [],
      ClaimRooms: [],
      ReserveRooms: [],
      ScoutRooms: [],
      RemoteHarvestRooms: {},
      SourceIDs: []
    };
    console.log('~~~~~ World Manager Memory COMPLETED ~~~~~');
    this.initializeWorld(roomInfo);

  },

  initializeWorld: function (roomInfo){
    console.log('~~~~~ START: Building Game Manager From Existing Spawns ~~~~~');
    try{
      for(var i in Game.spawns){
        var spawn = Game.spawns[i];
        var room = spawn.room.name;
        var roomObject = {};
        roomObject[room] = roomInfo;
        Memory.WorldManager.OperateRooms = Object.assign(Memory.WorldManager.OperateRooms, roomObject);

        console.log('ROOM: ' + room + ' Has Been Found.');
        var sources = spawn.room.find(FIND_SOURCES);

        var sourceIDs = [];
        for(var source in sources){
          var  sourceObject = sources[source];
          sourceIDs.push(sourceObject.id);
        }
        Memory.WorldManager.OperateRooms[room].SourceIDS = sourceIDs;
        Memory.WorldManager.OperateRooms[room].Spawns.push(spawn);
        Memory.WorldManager.OperateRooms = Object.assign(Memory.WorldManager.OperateRooms, roomObject);
      }
      console.log('~~~~~ COMPLETED: Building Game Manager From Existing Spawns ~~~~~');
      console.log('Room Manager has found the following info: ' + JSON.stringify(Memory.WorldManager.OperateRooms));
    }catch(err){
      return '~~~~~ ERROR: Could Not Complete ~~~~~';
      // TO Do: Create code to worldManger Object
    }

  },

  initializeNewSpawn: function(newSpawnName){
    console.log('~~~~~ START: Adding New Spawn ~~~~~');
    try{
        var spawn = Game.spawns[newSpawnName];
        var room = spawn.room.name;
        var roomInfo ={
          Spawns: [],
          DefendRooms: [],
          AttackRooms: [],
          ClaimRooms: [],
          ReserveRooms: [],
          ScoutRooms: [],
          RemoteHarvestRooms: {},
          SourceIDs: []
        };
        var roomObject = {};
        roomObject[room] = roomInfo;
        Memory.WorldManager.OperateRooms = Object.assign(Memory.WorldManager.OperateRooms, roomObject);

        console.log('ROOM: ' + room + 'Has Been Found.');
        var sources = spawn.room.find(FIND_SOURCES);

        var sourceIDs = [];
        for(var source in sources){
          var  sourceObject = sources[source];
          sourceIDs.push(sourceObject.id);
        }
        Memory.WorldManager.OperateRooms[room].SourceIDS = sourceIDs;
        Memory.WorldManager.OperateRooms[room].Spawns.push(spawn);
        Memory.WorldManager.OperateRooms = Object.assign(Memory.WorldManager.OperateRooms, roomObject);

      console.log('~~~~~ COMPLETED: Building Game Manager From Existing Spawns ~~~~~');
      console.log('Room Manager has found the following info: ' + JSON.stringify(Memory.WorldManager.OperateRooms));
    }catch(err){
      return '~~~~~ ERROR: Could Not Complete ~~~~~';
      // TO Do: Create code to worldManger Object
    }
  },

  reserveRoom: function(operateRoom, targetRoom){
    Memory.WorldManager.OperateRooms[operateRoom].ReserveRooms.push(targetRoom);
    return '~~~~~ COMPLETED: '+targetRoom+' Has Been Added ~~~~~';

  },

  stopReserveRoom: function(operateRoom,targetRoom){
    var index = Memory.WorldManager.OperateRooms[operateRoom].ReserveRooms.indexOf(targetRoom);
    if(index > - 1){
      Memory.WorldManager.OperateRooms[operateRoom].ReserveRooms.splice(index, 1);
      return '~~~~~ COMPLETED: '+targetRoom+' Has Been Removed ~~~~~';
    }else{
      return '~~~~~ ERROR: '+targetRoom+' Has Not Been Found ~~~~~';
    }
  },

  scoutRoom: function(operateRoom, targetRoom){
    Memory.WorldManager.OperateRooms[operateRoom].ScoutRooms.push(targetRoom);
    return '~~~~~ COMPLETED: '+targetRoom+' Has Been Added ~~~~~';

  },

  stopScoutRoom: function(operateRoom,targetRoom){
    var index = Memory.WorldManager.OperateRooms[operateRoom].ScoutRooms.indexOf(targetRoom);
    if(index > - 1){
      Memory.WorldManager.OperateRooms[operateRoom].ScoutRooms.splice(index, 1);
      return '~~~~~ COMPLETED: '+targetRoom+' Has Been Removed ~~~~~';
    }else{
      return '~~~~~ ERROR: '+targetRoom+' Has Not Been Found ~~~~~';
    }
  },

  claimRoom: function(operateRoom, targetRoom){
    Memory.WorldManager.OperateRooms[operateRoom].ClaimRooms.push(targetRoom);
    return '~~~~~ COMPLETED: '+targetRoom+' Has Been Added ~~~~~';

  },

  stopClaimRoom: function(operateRoom,targetRoom){
    var index = Memory.WorldManager.OperateRooms[operateRoom].ClaimRooms.indexOf(targetRoom);
    if(index > - 1){
      Memory.WorldManager.OperateRooms[operateRoom].ClaimRooms.splice(index, 1);
      return '~~~~~ COMPLETED: '+targetRoom+' Has Been Removed ~~~~~';
    }else{
      return '~~~~~ ERROR: '+targetRoom+' Has Not Been Found ~~~~~';
    }
  },

  stopRemoteHarvestRoom: function(operateRoom,targetRoom){
    var index = Memory.WorldManager.OperateRooms[operateRoom].RemoteHarvestRooms;
    Memory.WorldManager.OperateRooms[operateRoom].RemoteHarvestRooms = _.omit(index, [targetRoom]);

  },
};
module.exports = WorldManager;
