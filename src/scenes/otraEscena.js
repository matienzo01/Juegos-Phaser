var player;
var cursors;

class otraEscena extends Phaser.Scene {
	constructor() {
		super("otraEscena");
	}
	init() {
		this.respawn = 0;
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
			.audio("pop", "assets/sounds/pop.wav")
			.audio("shot", "assets/sounds/shot.wav")
			.audio("killed", "assets/sounds/killed.wav")
			.audio("rebound", "assets/sounds/rebound.wav")
			.audio("bgmusic", "assets/sounds/bgmusic.mp3");
	}
	create() {
		this.fondo = this.add.image(
			this.sys.game.canvas.width / 2,
			this.sys.game.canvas.height / 2,
			"background"
		);

		this.player = this.physics.add.sprite(
			this.sys.game.canvas.width / 2,
			this.sys.game.canvas.height - 20,
			"doggysprite"
		);
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);
		this.creaAnim();

		this.backgroundMusic = this.sound.add("bgmusic");
		/*this.backgroundMusic.loop = true;
		this.backgroundMusic.play();
		this.backgroundMusic.resume();*/

		this.killedSound = this.sound.add("killed");

		this.cursors = this.input.keyboard.createCursorKeys();

		this.bullets = this.physics.add.group({
			defaultKey: "bullet",
		});

		this.virus = this.physics.add.group({
			defaultKey: "virus",
			maxSize: 3,
		});

		this.physics.add.collider(
			this.player,
			this.virus,
			this.hitplayer,
			null,
			this
		);
		this.physics.add.collider(
			this.bullets,
			this.virus,
			this.hitvirus,
			null,
			this
		);
	}

	update(time, delta) {
		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-50);
			this.player.play("left", true);
		} else if (this.cursors.right.isDown) {
			this.player.setVelocityX(50);
			this.player.play("right", true);
		} else {
			this.player.play("turn", true);
			this.player.setVelocityX(0);
		}
		if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
			this.player.setVelocityX(0);
			this.player.play("turn", true);
			this.fire(this.player);
		}

		if (this.cursors.shift.isDown) {
			this.backgroundMusic.mute = true;
		}

		if (time > this.respawn) {
			this.newVirus();
			this.respawn += 3000;
		}
	}
	//--------------------------------------------
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

	fire(object) {
		var bullet = this.bullets.get(object.x + 17, object.y - 30);
		if (bullet) {
			bullet.setActive(true);
			bullet.setVisible(true);
			bullet.body.velocity.y = -200;
		}
		bullet.outOfBoundsKill = true;
	}

	newVirus() {
		var oneVirus = this.virus.get(
			Phaser.Math.Between(0, this.game.config.width),
			20
		);
		if (oneVirus) {
			oneVirus
				.setActive(true)
				.setVisible(true)
				.setGravity(300)
				.setCollideWorldBounds(true)
				.setCircle(45)
				.setBounce(1, 1)
				.setVelocityX(Phaser.Math.Between(0, 1) ? 100 : -100);
		}
	}

	hitplayer(player, virus) {
		this.killedSound.play();
		this.backgroundMusic.stop();
		this.scene.pause();
	}

	hitvirus(bullet, virus) {
		virus.destroy();
		bullet.destroy();
	}
}

export default otraEscena;
