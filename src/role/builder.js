var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            var repairThreshold = 0.6;
            var buildNeeded = false;

            var closestTarget = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);

            if (closestTarget) {
                buildNeeded = true;
                console.log('target to build: ' + closestTarget.structureType);
            }
            if (!buildNeeded) {
                closestTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => ((s.hits / s.hitsMax) < repairThreshold) && s.structureType != STRUCTURE_WALL });
                if (!closestTarget) {
                    closestTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => ((s.hits / s.hitsMax) < repairThreshold) });
                }
                if (closestTarget) {
                    console.log('target to repair: ' + closestTarget.structureType);
                    //targets = _.sortBy(structures, 'hits');
                }
            }
            if (closestTarget) {
                if (!buildNeeded) {
                    if (creep.repair(closestTarget) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestTarget, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else {
                    if (creep.build(closestTarget) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestTarget, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleBuilder;
