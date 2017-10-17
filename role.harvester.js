var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var building = false;
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.say('harvest');
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            console.log('targets: ' + targets.length);
            if (targets.length == 0) {
                /** help building **/
                targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
                creep.say('build');
                building = true;
            }
            if ((targets.length > 0) && !building){
                var result = creep.transfer(targets[0], RESOURCE_ENERGY);
                console.log('Harvester: new targets ' + result + ' - ' + ERR_NOT_IN_RANGE);
                if (result == ERR_NOT_IN_RANGE) {
                    console.log('Harvester: moving ...')
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            if ((targets.length > 0) && building) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;