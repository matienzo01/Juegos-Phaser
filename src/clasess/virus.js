export default class Virus extends Phaser.Physics.Arcade.Group {
	constructor(physicsWorld, scene) {
		super(physicsWorld, scene);
	}

	newItem() {
		this.create(Phaser.Math.Between(0, this.scene.scale.width), 80, "virus")
			.setActive(true)
			.setVisible(true)
			.setGravity(400)
			.setCollideWorldBounds(true)
			.setDepth(2)
			.setCircle(45)
			.setBounce(1, 1)
			.setVelocityX(Phaser.Math.Between(0, 1) ? 100 : -100);
		this.hitsToKill = 1;
	}
}
