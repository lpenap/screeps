var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var structures = creep.room.find(FIND_MY_STRUCTURES);
	        var targets = [];
	        var repairNeeded = false;
	        for (var structure in structures) {
	            if (structure.hits < structure.hitsMax) {
	                creep.say('repair');
	                targets.push(structure);
	                repairNeeded = true;
	                break;
	            }
	        }
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