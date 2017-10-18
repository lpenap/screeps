var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
	        var repairThreshold = 0.8;
	        var repairNeeded = false;
	        var structures = creep.room.find(FIND_STRUCTURES, {filter: (s) => ((s.hits / s.hitsMax)<repairThreshold)});
	        var targets = _.sortBy(structures, 'hits')
	        if (targets.length > 0) {
	            var repairNeeded = true;
	        }
	        console.log('targets to repair: '+targets.length);
	        if (!repairNeeded) {
	            targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
	        }
            if(targets.length) {
            	if (repairNeeded) {
            		if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    	creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                	}
            	} else {
                	if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    	creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                	}
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;