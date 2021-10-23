export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, sprite) {
		super(scene, x, y, sprite);
		this.scene = scene;
		this.scene.add.existing(this);
		this.scene.physics.world.enable(this);

		this.init();
		this.creaAnim();
	}

	init() {
		this.setBounce(0.2);
		this.setCollideWorldBounds(true);
		this.setGravity(300);
		this.setDepth(2);
		this.body.setSize(35, 66, 35, 30);
		this.creaAnim();
	}

	creaAnim() {
		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("doggysprite", {
				start: 0,
				end: 3,
			}),
			frameRate: 20,
			repeat: -1,
		});

		this.anims.create({
			key: "turn",
			frames: [{ key: "doggysprite", frame: 4 }],
		});

		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("doggysprite", {
				start: 5,
				end: 8,
			}),
			framerate: 10,
			repeat: -1,
		});
	}
}
