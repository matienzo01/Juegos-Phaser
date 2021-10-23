export default class Bullets extends Phaser.Physics.Arcade.Group {
	constructor(physicsWorld, scene) {
		super(physicsWorld, scene);
		this.scene = scene;
	}

	newItem(x = 17, y = 30) {
		var item = this.create(
			this.scene.player.x + x,
			this.scene.player.y - y,
			"bullet"
		)
			.setActive(true)
			.setVisible(true)
			.setDepth(2);
		item.body.velocity.y = -200;
		item.outOfBoundsKill = true;
	}
}
