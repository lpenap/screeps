"use stritc"

const Summary = require("programs_summary");

class Boot {
	constructor() {
		this.summary = new Summary();
	}

	run() {
		this.summary.run();
	}
}