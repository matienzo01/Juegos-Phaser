export default class Button extends Phaser.Physics.Arcade.Sprite {
	constructor(sceneBelong, x, y, sprite, scentoTO) {
		super(sceneBelong, x, y, sprite);
		this.sceneBelong = sceneBelong;
		this.sceneBelong.add.existing(this);
		this.scentoTO = scentoTO;
		this.init();
	}

	init() {
		this.setInteractive().on("pointerdown", () => {
			console.log("llegamos al click");
			this.sceneBelong.scene.start(this.scentoTO);
		});
	}
}
