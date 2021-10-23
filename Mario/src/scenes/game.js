export default class Nivel extends Phaser.Scene {
	constructor() {
		super({ key: "Nivel" });
	}

	init() {
		console.log("cambiamos");
	}
	preload() {
		this.load.image("button", "../assets/menu/Button.png");
	}
	create() {
		this.add.image(500, 500, "button");
	}
}
