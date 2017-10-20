/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('main.hooks');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    cleanMemory: function() {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },
    spawnCreeps: function() {
        var spawn = Game.spawns['LatinBalls01'];
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);

        if (harvesters.length < 2) {
            var newName = 'Harvester' + Game.time;
            var creepCreated = spawn.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'harvester' } });
            if (creepCreated == ERR_NOT_ENOUGH_ENERGY) {
                console.log('Not enough energy to spawn Harvester creep.')
            } else {
                console.log('Creep spawned with id: ' + newName)
            }
        }

        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length);

        if (builders.length < 5) {
            var newName = 'Builder' + Game.time;
            var creepCreated = spawn.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'builder' } });
            if (creepCreated == ERR_NOT_ENOUGH_ENERGY) {
                console.log('Not enough energy to spawn Builder creep.')
            } else {
                console.log('Creep spawned with id: ' + newName)
            }
        }

        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length);

        if (upgraders.length < 4) {
            var newName = 'Upgrader' + Game.time;
            var creepCreated = spawn.spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'upgrader' } });
            if (creepCreated == ERR_NOT_ENOUGH_ENERGY) {
                console.log('Not enough energy to spawn Upgrader creep.')
            } else {
                console.log('Creep spawned with id: ' + newName)
            }
        }

        if (spawn.spawning) {
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                'Ã°ÂÂÂ Ã¯Â¸Â' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y, { align: 'left', opacity: 0.8 });
        }
    }
};
