/* globals window, _, VIZI */
(function() {
	"use strict";

	VIZI.Loop = function() {
		VIZI.Log("Inititialising application loop");

		_.extend(this, VIZI.Mediator);

		this.stopLoop = false;

		this.publish("addToDat", this, {name: "Loop", properties: ["start", "stop"]});

		this.start();
	};

	VIZI.Loop.prototype.start = function() {
		VIZI.Log("Starting application loop");
		this.stopLoop = false;
		this.tick();
	};

	VIZI.Loop.prototype.stop = function() {
		VIZI.Log("Stopping application loop");
		this.stopLoop = true;
	};

	VIZI.Loop.prototype.tick = function() {
		this.publish("fpsTickStart", "Main Loop");
		
		this.publish("update");
		this.publish("render");

		if (!this.stopLoop) {
			// Should probably be a bit more obvious that this comes from Three.js
			// http://stackoverflow.com/questions/6065169/requestanimationframe-with-this-keyword
			window.requestAnimationFrame( this.tick.bind(this) );
		}

		this.publish("fpsTickEnd", "Main Loop");
	};
}());