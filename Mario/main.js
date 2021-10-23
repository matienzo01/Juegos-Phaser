import menu from "./src/scenes/menu.js";
import Nivel from "./src/scenes/game.js";

var config = {
	width: 420,
	height: 420,
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
	scene: [menu, Nivel],
};

const game = new Phaser.Game(config);
