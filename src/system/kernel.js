"use strict"

const Scheduler = require("system_scheduler");

class Kernel {
    constructor() {
        global.kernel = this;

        if (!Memory.system) {
            Memory.system = {};
        }

        this.scheduler = new Scheduler();
    }

    init() {
        if (Game.time % MEMORY_CLEAN_INTERVAL === 0) {
            this.cleanMemory();
        }
    }

    run() {

    }

    cleanup() {

    }

    cleanMemory() {
        let name;
        for (name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }
}

module.exports = Kernel;
