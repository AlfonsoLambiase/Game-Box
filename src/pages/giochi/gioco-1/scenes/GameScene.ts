// Definisco l'interfaccia per i tasti WASD, così TypeScript è contento
interface WasdKeys {
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
}

export default class GameScene extends Phaser.Scene {
  zombies!: Phaser.Physics.Arcade.Group;
  ufo!: Phaser.Physics.Arcade.Sprite;

  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  wasd!: WasdKeys;

  rays!: Phaser.Physics.Arcade.Group;
  spaceKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("sfondo", "/Gioco-1/sfondo.png");
    this.load.image("ufo", "/Gioco-1/ufo.png");
    this.load.image("zombie1", "/Gioco-1/zombie1.png");
    this.load.image("zombie2", "/Gioco-1/zombie2.png");
    this.load.image("zombie3", "/Gioco-1/zombie3.png");
    this.load.image("zombie4", "/Gioco-1/zombie4.png");
    this.load.image("zombie5", "/Gioco-1/zombie5.png");
    this.load.image("ray", "/Gioco-1/ray.png");
  }

  create() {
    this.add.text(20, 20, "Elimina gli Zombie!", {
      font: "16px monospace",
      color: "#ffffff",
    });

    this.add.image(400, 300, "sfondo").setScale(0.7);

    this.ufo = this.physics.add.sprite(400, 100, "ufo").setScale(0.1);
    this.ufo.setCollideWorldBounds(true);

    // Definisco cursori freccia (standard Phaser)
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Definisco i tasti WASD con tipo corretto
    this.wasd = this.input.keyboard!.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as WasdKeys;

    this.rays = this.physics.add.group();

    this.spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.zombies = this.physics.add.group();

    const zombieData = [
      { key: "zombie1", x: 100 },
      { key: "zombie2", x: 200 },
      { key: "zombie3", x: 300 },
      { key: "zombie4", x: 400 },
      { key: "zombie5", x: 500 },
    ];

    // Qui creo direttamente gli zombie dentro il gruppo per farli muovere
    zombieData.forEach(({ key, x }) => {
      let vx = Phaser.Math.Between(-100, 100);
      while (vx === 0) vx = Phaser.Math.Between(-100, 100);

      const zombie = this.zombies.create(x, 500, key) as Phaser.Physics.Arcade.Sprite;
      zombie
        .setScale(0.2)
        .setCollideWorldBounds(true)
        .setBounce(1)
        .setVelocityX(vx);
    });


    // Collisione tra raggi e zombie
    this.physics.add.overlap(this.rays, this.zombies, this.hitZombie, undefined, this);
  }

  update() {
    // Gira gli zombie verso sinistra se vanno a sinistra
    this.zombies.getChildren().forEach((zombie) => {
      const z = zombie as Phaser.Physics.Arcade.Sprite;
      if (z.body) {
        z.flipX = z.body.velocity.x < 0;
      }
    });

    // Reset velocità UFO
    this.ufo.setVelocity(0);

    // Leggo input cursori e WASD
    const leftDown = this.cursors?.left?.isDown || this.wasd?.left?.isDown;
    const rightDown = this.cursors?.right?.isDown || this.wasd?.right?.isDown;
    const upDown = this.cursors?.up?.isDown || this.wasd?.up?.isDown;
    const downDown = this.cursors?.down?.isDown || this.wasd?.down?.isDown;

    if (leftDown) this.ufo.setVelocityX(-200);
    else if (rightDown) this.ufo.setVelocityX(200);

    if (upDown) this.ufo.setVelocityY(-200);
    else if (downDown) this.ufo.setVelocityY(200);

    // Sparo se premo barra spaziatrice
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.shoot();
    }
  }

  shoot() {
    const ray = this.rays.create(this.ufo.x, this.ufo.y, "ray");
    ray.setVelocityY(300);
    ray.setScale(0.1);
    ray.setCollideWorldBounds(false);
    ray.setBounce(1);
  }

  hitZombie(ray: Phaser.GameObjects.GameObject, zombieGO: Phaser.GameObjects.GameObject) {
    const raySprite = ray as Phaser.Physics.Arcade.Sprite;
    const zombieSprite = zombieGO as Phaser.Physics.Arcade.Sprite;

    raySprite.destroy();
    zombieSprite.destroy();

    // Rimuovo lo zombie dal gruppo
    this.zombies.remove(zombieSprite, true, true);

    console.log("Zombie rimasti:", this.zombies.getLength());

    // Cambio scena se tutti gli zombie sono eliminati
    if (this.zombies.getLength() === 0) {
      console.log("Cambio scena a GameOverScene");
      this.scene.start("GameOverScene");
    }
  }
}
