export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, sprite) {
		super(scene, x, y, sprite);
		this.scene = scene;
		this.scene.add.existing(this);
		this.scene.physics.world.enable(this);

		this.init();
	}

	init() {
		this.creaAnim();
		this.setInteractive();
		this.setCollideWorldBounds(true);
		this.setGravity(0, 200);
	}

	creaAnim() {
		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("mario", {
				start: 1,
				end: 3,
			}),
			frameRate: 20,
			repeat: -1,
		});

		this.anims.create({
			key: "turn",
			frames: [{ key: "mario", frame: 0 }],
		});
	}
}
