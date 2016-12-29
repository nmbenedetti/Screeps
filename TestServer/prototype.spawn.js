module.exports = function(){
  StructureSpawn.prototype.createBuilder =
    function(energy,roleName){
      var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for(var i = 0; i < numberOfParts; i++){
        body.push(WORK);
      }
      for(var i = 0; i < numberOfParts; i++){
        body.push(CARRY);
      }
      for(var i = 0; i < numberOfParts; i++){
        body.push(MOVE);
      }
      return this.createCreep(body, undefined, {role: roleName, building: false });
    };

    StructureSpawn.prototype.createRemoteHarvester =
      function(energy,roleName){
        var numberOfParts = Math.floor(energy / 200);
        var body = [];
        for(var i = 0; i < numberOfParts; i++){
          body.push(WORK);
        }
        for(var i = 0; i < numberOfParts; i++){
          body.push(CARRY);
        }
        for(var i = 0; i < numberOfParts; i++){
          body.push(MOVE);
        }
        return this.createCreep(body, undefined, {role: roleName, working: false });
      };


    StructureSpawn.prototype.createUpgrader =
      function(energy,roleName){
        var numberOfParts = Math.floor(energy / 200);
        var body = [];
        for(var i = 0; i < numberOfParts; i++){
          body.push(WORK);
        }
        for(var i = 0; i < numberOfParts; i++){
          body.push(CARRY);
        }
        for(var i = 0; i < numberOfParts; i++){
          body.push(MOVE);
        }
        return this.createCreep(body, undefined, {role: roleName, upgrading: false });
      };

    StructureSpawn.prototype.createMover =
      function(energy,roleName){
        // If there are no containers then do not spawn a creep
        var numberOfParts = Math.floor(energy/200);
        var body = [];
        for(var i = 0; i < numberOfParts; i++){
          body.push(CARRY);
        }
        for(var i = 0; i < numberOfParts; i++){
          body.push(MOVE);
        }
        return this.createCreep(body, undefined,{role: roleName});
      };

    StructureSpawn.prototype.createHarvester =
      function(energy,roleName){
        var energyForCarryAndMove = 100;
        var energyReamining = energy - 100;
        var numberOfWorkPartsrw = Math.floor(energyReamining / 100);
        var numberOfparts = (numberOfWorkPartsrw > 5? 5: numberOfWorkPartsrw);
        var body = [];
        for(var i = 0; i < numberOfparts; i++){
          body.push(WORK);
        }
        body.push(CARRY);
        body.push(MOVE);
        console.log(body);
        return this.createCreep(body, undefined,{role: roleName, working: false});
      };
};
