import Player from "../clasess/player.js";
import Bacterium from "../clasess/bacterium.js";
import Virus from "../clasess/virus.js";
import Bullets from "../clasess/bullet.js";
import Powerup from "../clasess/powerup.js";

class otraEscena extends Phaser.Scene {
	constructor() {
		super("otraEscena");
	}
	init() {
		this.respawn = 0;
		this.respawnInterval = 3000;
		this.scoreText = "";
		this.score = 0;
		this.lifeCounter = 3;
		this.lifeText = "";
		this.newLife = 250;
		this.enemiesGlobalCounter = 0;
		this.invincible = false;
		this.ammo = 30;
		this.ammoText = "";
		this.powerupCounter = 0;
	}
	preload() {
		this.load
			.image("background", "./assets/backgrounds/background.png")
			.spritesheet("doggysprite", "./assets/sprites/doggysprite.png", {
				frameWidth: 50,
				frameHeight: 60,
			})
			.image("bullet", "./assets/sprites/bullet.png")
			.image("virus", "./assets/sprites/virus.png")
			.image("bacterium", "./assets/sprites/bacterium.png")
			.image("life", "./assets/sprites/life.png")
			.image("soap", "./assets/sprites/soap.png")
			.image("reload", "./assets/sprites/reload.png")
			.image("powerup", "./assets/sprites/powerup.png")

			.audio("pop", "assets/sounds/pop.wav")
			.audio("shot", "assets/sounds/shot.wav")
			.audio("killed", "assets/sounds/killed.wav")
			.audio("rebound", "assets/sounds/rebound.wav")
			.audio("bgmusic", "assets/sounds/bgmusic.mp3");
	}
	create() {
		this.scoreText = this.add.text(
			this.sys.game.canvas.width / 2 - 65,
			0,
			"Score: " + this.score,
			{ fontStyle: "strong", font: "19px Arial", fill: "#6368BC" }
		);
		this.scoreText.setDepth(1);
		this.lifeText = this.add.text(50, 10, "X " + this.lifeCounter, {
			fontStyle: "strong",
			align: "right",
			font: "24px Arial",
			fill: "beige",
		});
		this.lifeText.setDepth(1);
		this.ammoText = this.add.text(
			this.sys.game.canvas.width - 150,
			10,
			"AMMO: " + this.ammo,
			{
				fontStyle: "strong",
				align: "right",
				font: "24px Arial",
				fill: "beige",
			}
		);
		this.ammoText.setDepth(1);

		this.popSound = this.sound.add("pop");
		this.shotSound = this.sound.add("shot");
		this.killedSound = this.sound.add("killed");
		this.reboundSound = this.sound.add("rebound");

		/*this.backgroundMusic = this.sound.add("bgmusic");
		this.backgroundMusic.loop = true;
		this.backgroundMusic.play();*/

		this.cursors = this.input.keyboard.createCursorKeys();

		this.backgorund = this.add.image(
			this.sys.game.canvas.width / 2,
			this.sys.game.canvas.height / 2,
			"background"
		);
		this.lifeSprite = this.add.image(30, 18, "life").setDepth(1);
		this.soapImage = this.physics.add
			.image(50, this.sys.game.canvas.height - 30, "soap")
			.setActive(true)
			.setDepth(1)
			.setVisible(false);
		this.reloadImage = this.add
			.image(50, this.sys.game.canvas.height - 80, "reload")
			.setVisible(false);

		this.player = new Player(
			this,
			this.sys.game.canvas.width / 2,
			this.sys.game.canvas.height,
			"doggysprite"
		);

		this.virusGroup = new Virus(this.physics.world, this);
		this.bateriumGroup = new Bacterium(this.physics.world, this);
		this.bulletGroup = new Bullets(this.physics.world, this);
		this.powerupGroup = new Powerup(this.physics.world, this);

		this.physics.add.overlap(
			this.player,
			[this.virusGroup, this.bateriumGroup, this.powerupGroup],
			this.hitplayer,
			null,
			this
		);
		this.physics.add.collider(
			this.bulletGroup,
			[this.virusGroup, this.bateriumGroup],
			this.hitEnemies,
			null,
			this
		);
		this.physics.add.collider(
			this.bulletGroup,
			this.powerupGroup,
			this.hitPowerup,
			null,
			this
		);
		this.physics.add.overlap(
			this.player,
			this.soapImage,
			this.reloadAmmo,
			null,
			this
		);
	}

	update(time, delta) {
		if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
			this.player.setVelocityX(0);
			this.player.play("turn", true);
			this.fire();
		}

		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-160);
			this.player.play("left", true);
		} else if (this.cursors.right.isDown) {
			this.player.setVelocityX(160);
			this.player.play("right", true);
		} else {
			this.player.play("turn", true);
			this.player.setVelocityX(0);
		}

		if (time > this.respawnInterval && this.respawn == 0) {
			this.respawn = Math.trunc(time);
		}

		if (time > this.respawn) {
			if (
				this.enemiesGlobalCounter % 15 == 0 &&
				this.enemiesGlobalCounter != 0
			) {
				this.powerupGroup.newItem();
			}

			if (
				this.enemiesGlobalCounter % 5 == 0 &&
				this.enemiesGlobalCounter != 0
			) {
				if (this.respawnInterval > 600) {
					this.respawnInterval -= 100;
				}

				this.addEnemy(0);
			} else {
				this.addEnemy(1);
			}
			this.respawn += this.respawnInterval;
		}
	}
	//--------------------------------------------

	fire() {
		if (this.ammo > 0 && this.powerupCounter === 0) {
			this.bulletGroup.newItem();
			this.shotSound.play();
			this.ammo--;
			this.ammoText.setText("AMMO: " + this.ammo);
		}

		if (this.ammo == 0 && this.powerupCounter === 0) {
			this.reloadImage.setVisible(true).setActive(true);
			this.soapImage.setVisible(true).setActive(true);
		}

		if (this.powerupCounter > 0) {
			this.bulletGroup.newDoubleItem();
			this.shotSound.play();
			this.powerupCounter--;
		}
	}

	reloadAmmo() {
		if (this.ammo == 0) {
			this.ammo = 30;
			var randomX = Phaser.Math.Between(
				40,
				this.sys.game.canvas.width - 50
			);
			this.reloadImage.setX(randomX).setActive(false).setVisible(false);
			this.soapImage.setX(randomX).setActive(false).setVisible(false);
			this.ammoText.setText("AMMO: " + this.ammo);
		}
	}

	addEnemy(type) {
		this.reboundSound.play();
		this.enemiesGlobalCounter++;

		switch (type) {
			case 0:
				this.bateriumGroup.newItem();
				break;
			default:
				this.virusGroup.newItem();
		}
	}

	hitplayer(player, enemy) {
		if (!this.invincible) {
			this.invincible = true;
			this.killedSound.play();
			this.lifeCounter--;
			this.lifeText.setText("X " + this.lifeCounter);
			enemy.destroy();
			player.setTint(0x1abc9c);
			this.time.addEvent({
				delay: 1000,
				callback: () => {
					this.invincible = false;
					player.clearTint();
				},
			});
			if (this.lifeCounter < 0) {
				alert("GAME OVER");
				this.virusGroup.clear(true, true);
				this.bateriumGroup.clear(true, true);
				this.bulletGroup.clear(true, true);
				this.scene.restart();
			}
		}
	}

	hitEnemies(bullet, enemy) {
		bullet.setVisible(false);
		bullet.setActive(false);
		bullet.destroy();

		enemy.hitsToKill--;

		if (enemy.hitsToKill == 0) {
			enemy.destroy();
			this.popSound.play();
			this.score += 10;
			this.scoreText.setText("Score: " + this.score);
			if (this.score % this.newLife == 0) {
				this.lifeCounter++;
				this.lifeText.setText("X " + this.lifeCounter);
			}
		}
	}

	hitPowerup(bullet, bubble) {
		this.hitEnemies(bullet, bubble);
		this.powerupCounter = 10;
	}
}

export default otraEscena;
