import Button from "../classes/button.js";

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
		this.boton_inicio = new Button(
			this,
			this.sys.game.canvas.width / 2,
			100,
			"botones",
			"Nivel"
		);
		this.mouse = this.input.activePointer;
	}
	update() {}
}
