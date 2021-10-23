import Button from "../classes/button.js";
import Nivel from "./game.js";

export default class menu extends Phaser.Scene {
	constructor() {
		super("menu");
	}

	inti() {}
	preload() {
		this.load.spritesheet("botones", "./assets/menu/buttons.png", {
			frameWidth: 200,
			frameHeight: 100,
		});
	}
	create() {
		this.boton_inicio = new Button(this, 100, 100, "botones", "Nivel");
		this.mouse = this.input.activePointer;
	}
	update() {}
}
