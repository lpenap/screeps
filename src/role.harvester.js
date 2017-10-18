var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.structureNeedsEnergy = false;
        creep.memory.canBuild = false;
        creep.memory.canRepair = false;

        var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
        if (targets.length > 0) {
            creep.memory.structureNeedsEnergy = true;
            //console.log(creep.name + ' needs to fill structure');
        } else {
            var structures = creep.room.find(FIND_MY_STRUCTURES);
            targets = [];
            if (targets.length > 0) {
                for (var structure in structures) {
                    if (structures[structure].hits < structures[structure].hitsMax) {
                        console.log(creep.name + ' can can repair');
                        targets.push(structures[structure]);
                        creep.memory.canRepair = true;
                        break;
                    }
                }
            } else {
                targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
                if (targets > 0) {
                    creep.memory.canBuild = true;
                }
            }
        }

        if (creep.carry.energy == 0) {
            creep.memory.refilling = true;
        }
        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.refilling = false;
        }

        if ((creep.carry.energy < creep.carryCapacity) && creep.memory.refilling){
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                //console.log(creep.name + ' moving to source');
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            if (creep.memory.structureNeedsEnergy) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //console.log(creep.name + ' moving to structure to transfer');
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if (creep.memory.canRepair) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    //console.log(creep.name + ' moving to structure to repair');
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if (creep.memory.canBuild) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    //console.log(creep.name + ' moving to construction site');
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;