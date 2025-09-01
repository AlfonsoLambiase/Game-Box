import Phaser from "phaser";

export default class GameScene5 extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private walls!: Phaser.Physics.Arcade.StaticGroup;
  private goal!: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super("GameScene-5");
  }

  preload() {
    // Caricamento immagini
    this.load.image("back", "/Gioco-5/tlou.webp");
    this.load.image("joel", "/Gioco-5/joel(2).png");
    this.load.image("ellie", "/Gioco-5/ellie(3).png");
    this.load.image("brick", "/Gioco-5/wall.png"); 
    this.load.image("Winners", "/Gioco-5/JeE.png");
  }

  create() {
    // --- Sfondo ---
    this.add.image(400, 300, "back").setDisplaySize(800, 600);

    // --- Tastiera ---
    this.cursors = this.input.keyboard!.createCursorKeys();

    // --- Muri del labirinto ---
 // --- Gruppo muri ---
this.walls = this.physics.add.staticGroup();

// Lista muri con larghezza, altezza, posizione relativa al centro
const wallPositions = [
  { x: 400, y: 100, width: 600, height: 20 }, // muro orizzontale superiore
  { x: 400, y: 500, width: 600, height: 20 }, // muro orizzontale inferiore
  { x: 100, y: 350, width: 20, height: 300 }, // muro verticale sinistro
  { x: 700, y: 200, width: 20, height: 200 }, // muro verticale destro
  { x: 400, y: 300, width: 400, height: 20 }, // muro centrale orizzontale
  { x: 500, y: 350, width: 20, height: 100 }, // muro centrale verticale destro
  { x: 300, y: 120, width: 20, height: 60 }, // muro centrale verticale sinistro
  { x: 420, y: 270, width: 20, height: 60 }, // muro centrale verticale centrale 
  { x: 530, y: 120, width: 20, height: 60 }, // muro centrale verticale iniziale
  { x: 200, y: 300, width: 20, height: 100 }, // muro centrale verticale finale
];

wallPositions.forEach((w) => {
  const wall = this.add.tileSprite(w.x, w.y, w.width, w.height, "brick");
  this.physics.add.existing(wall, true); // static body
  this.walls.add(wall);
});

    // --- Player all’ingresso ---
    this.player = this.physics.add.sprite(1000, 800, "joel");
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.03);
    this.physics.add.collider(this.player, this.walls);

    // --- Goal all’uscita ---
    this.goal = this.physics.add.sprite(60, 130, "ellie");
    this.goal.setScale(0.03);
    this.physics.add.overlap(this.player, this.goal, this.reachGoal, undefined, this);
  }

  update() {
    const speed = 150;
    this.player.setVelocity(0);

    if (this.cursors.left?.isDown) this.player.setVelocityX(-speed);
    else if (this.cursors.right?.isDown) this.player.setVelocityX(speed);

    if (this.cursors.up?.isDown) this.player.setVelocityY(-speed);
    else if (this.cursors.down?.isDown) this.player.setVelocityY(speed);
  }

private reachGoal() {
    // Ferma il movimento del player
    this.player.setVelocity(0);

    // Posizione al centro dello schermo
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Mostra lo sprite "Winners" al centro
    const winnerSprite = this.add.sprite(centerX, centerY, "Winners");
    winnerSprite.setOrigin(0.5); // centra l'immagine
    winnerSprite.setScale(0.5); // regola la scala se serve

    // Ferma la fisica
    this.physics.pause();

    // Dopo 3 secondi, passa alla GameOverScene-5
    this.time.delayedCall(3000, () => {
        this.scene.start("GameOverScene-5");
    });
  }
}
