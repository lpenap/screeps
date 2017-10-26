"use strict"

class Summary {
	constructor () {
	}
	print() {
		Logger.highlight("------------------------------------------------");
		Logger.log(" Summary for tick " + Game.time);
		Logger.highlight("------------------------------------------------");
	}

	run() {
		if (Game.time % TICKS_PER_SUMMARY === 0) {
			print();
		}
	}
}

module.exports = Summary;
