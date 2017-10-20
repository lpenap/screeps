var roleHarvester = require('role_harvester');
var roleUpgrader = require('role_upgrader');
var roleBuilder = require('role_builder');
var mainHooks = require('main.hooks');
require('version')

module.exports.loop = function() {

    var tower = Game.getObjectById('59e958b99ebea034ce082963');
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure && ((tower.energy / tower.energyCapacity) > 0.5)) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

    if (!Memory.SCRIPT_VERSION || Memory.SCRIPT_VERSION != SCRIPT_VERSION) {
        Memory.SCRIPT_VERSION = SCRIPT_VERSION
        console.log('New code uplodated')
    }
    mainHooks.cleanMemory();
    mainHooks.spawnCreeps();

    console.log('tickLimit: ' + Game.cpu.tickLimit);
    console.log('cpu limit: ' + Game.cpu.limit);

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
