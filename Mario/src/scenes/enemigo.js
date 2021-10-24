export default class Enemy extends Phaser.Physics.Arcade.Group {
	constructor(physicWorld, scene) {
		super(physicWorld, scene);
		this.scene = scene;
	}

	newItem() {
		var item = this.create(700, 400, "enemy");
		this.creaAnim();
		item.setActive(true).setVisible(true);
		item.outOfBoundsKill = true;
		item.setGravityY(200);
		item.setCollideWorldBounds(true);
		item.setVelocityX(-150);
	}

	creaAnim() {
		this.scene.anims.create({
			key: "camina",
			frames: this.scene.anims.generateFrameNumbers("enemy", {
				start: 0,
				end: 1,
			}),
			frameRate: 10,
			repeat: -1,
		});
	}
}
