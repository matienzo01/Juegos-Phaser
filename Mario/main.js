import menu from "./src/scenes/menu.js";
import Nivel from "./src/scenes/game.js";

var config = {
	width: 820,
	height: 420,
	type: Phaser.AUTO,
	backgroundcolor: "#ffffff",
	parent: "container",
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		},
	},
	scene: [menu, Nivel],
};

const game = new Phaser.Game(config);
