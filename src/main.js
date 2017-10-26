"use strict"

const Kernel = require('system_kernel');
const Logger = require('lib_logger');
require('version')
require('constants');

global.logger = new Logger();

module.exports.loop = function() {
    const kernel = new Kernel();
    kernel.init();
    kernel.run();
    kernel.cleanup();
}
/**
module.exports.loop = function() {
    var tower = Game.getObjectById('59e958b99ebea034ce082963');
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits / structure.hitsMax) < 0.6
        });
        if (closestDamagedStructure && ((tower.energy / tower.energyCapacity) > 0.5)) {
            console.log('Tower to repair ' + closestDamagedStructure.structureType);
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
**/
