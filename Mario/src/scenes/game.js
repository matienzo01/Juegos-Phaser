import Player from "../classes/player.js";
import Enemy from "./enemigo.js";

export default class Nivel extends Phaser.Scene {
	constructor() {
		super({ key: "Nivel" });
	}

	init() {
		this.gameOver = false;
	}
	preload() {
		this.load.spritesheet("mario", "./assets/mario.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
		this.load.spritesheet("enemy", "./assets/enemigo.png", {
			frameWidth: 64,
			frameHeight: 64,
		});
	}
	create() {
		this.player = new Player(this, 50, 200, "mario");
		this.cursors = this.input.keyboard.createCursorKeys();
		this.enemies = new Enemy(this.physics.world, this);
		this.enemies.newItem();

		//this.physics.add.overlap()
		var colisionJ = this.physics.add.collider(
			this.player,
			this.enemies,
			this.colisionJ,
			null,
			this
		);
	}

	update() {
		if (!this.gameOver) {
			if (this.cursors.left.isDown) {
				this.player.setVelocityX(-100);
				this.player.play("left", true);
				this.player.flipX = true;
			} else if (this.cursors.right.isDown) {
				this.player.setVelocityX(100);
				this.player.play("left", true);
				this.player.flipX = false;
			} else {
				this.player.setVelocityX(0);
				this.player.play("turn", true);
			}

			if (
				this.input.keyboard.checkDown(this.cursors.space, 500) &&
				//this.player.y + 32 == this.sys.game.canvas.height
				this.player.body.onFloor()
			) {
				this.player.setAccelerationY(-1000);
				this.time.addEvent({
					delay: 300,
					callback: () => {
						this.player.setAccelerationY(0);
					},
				});
			}
		}
	}

	//------------------

	colisionJ(player, enemy) {
		if (this.player.body.touching.down) {
			enemy.destroy();
		} else {
			player.destroy();
			this.gameOver = true;
		}
	}
}
