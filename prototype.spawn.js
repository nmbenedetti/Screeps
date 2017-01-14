module.exports = function() {
    StructureSpawn.prototype.createBuilder =
        function(energy, roleName) {
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            for (var i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (var i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (var i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            return this.createCreep(body, undefined, {
                role: roleName,
                building: false,
                homeRoom: this.room.name
            });
        };
//TODO: TEST
    StructureSpawn.prototype.createRemoteHarvester =
        function(energy, roleName) {
            var numberOfParts = Math.floor(energy / 300);
            var body = [];
            for (var i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (var i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (var i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            return this.createCreep(body, undefined, {
                role: roleName,
                working: false,
                homeRoom: this.room.name
            });
        };

    StructureSpawn.prototype.createUpgrader =
        function(energy, roleName) {
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            for (var i = 0; i < numberOfParts; i++) {
                body.push(WORK);
            }
            for (var i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (var i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            return this.createCreep(body, undefined, {
                role: roleName,
                upgrading: false,
                homeRoom: this.room.name
            });
        };

    StructureSpawn.prototype.createMover =
        function(energy, roleName) {
            var numberOfParts = Math.floor(energy / 200);
            var body = [];
            for (var i = 0; i < numberOfParts; i++) {
                body.push(CARRY);
            }
            for (var i = 0; i < numberOfParts; i++) {
                body.push(MOVE);
            }
            return this.createCreep(body, undefined, {
                role: roleName,
                homeRoom: this.room.name
            });
        };

    StructureSpawn.prototype.createHarvester =
        function(energy, roleName) {
            if (energy >= 300) {
                var energyForCarryAndMove = 100;
                var energyReamining = energy - 100;
                var numberOfWorkPartsrw = Math.floor(energyReamining / 100);
                var numberOfparts = (numberOfWorkPartsrw > 5 ? 5 : numberOfWorkPartsrw);
                var body = [];
                for (var i = 0; i < numberOfparts; i++) {
                    body.push(WORK);
                }
                body.push(CARRY);
                body.push(MOVE);
                return this.createCreep(body, undefined, {
                    role: roleName,
                    working: false,
                    homeRoom: this.room.name
                });
            } else {
                return -6;
            }

        };
};
