"use strict"

class Scheduler {
    constructor() {
        if (!Memory.system.scheduler) {
            Memory.system.scheduler = {};
        }
    }
}

module.exports = Scheduler;
