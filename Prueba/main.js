import otraEscena from "./src/scenes/otraEscena.js";

var config = {
	width: 920,
	height: 360,
	type: Phaser.AUTO,
	backgroundcolor: "#ffffff",
	parent: "container",
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
			debug: true,
		},
	},
	scene: [otraEscena],
};

const game = new Phaser.Game(config);
