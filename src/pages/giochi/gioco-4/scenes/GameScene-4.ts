import Phaser from "phaser";

export default class GameScene4 extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private coins!: Phaser.Physics.Arcade.Group;
  private enemies!: Phaser.Physics.Arcade.Group;
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private lives: number = 3; // vite del player

  constructor() {
    super("GameScene-4");
  }

  preload() {
    // Caricamento delle immagini
    this.load.image("sky", "/Gioco-4/jungle.jpg"); 
    this.load.image("ground", "/Gioco-4/platform.png");
    this.load.image("player", "/Gioco-4/drake.png");
    this.load.image("coin", "/Gioco-4/coin.png");
    this.load.image("enemy", "/Gioco-4/soldier.png");
    this.load.image("skull", "/Gioco-4/skull.png"); // sprite finale per game over
  }

  create() {
    // --- Sfondo centrato ---
    this.add.image(400, 300, "sky").setDisplaySize(800, 600);

    // --- Piattaforme statiche ---
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(200, 500, "ground").setScale(0.1).refreshBody();
    this.platforms.create(600, 400, "ground").setScale(0.1).refreshBody();
    this.platforms.create(50, 250, "ground").setScale(0.1).refreshBody();
    this.platforms.create(750, 220, "ground").setScale(0.1).refreshBody();

    // --- Inizializza gruppi per monete e nemici ---
    this.coins = this.physics.add.group();
    this.enemies = this.physics.add.group();

    // --- Creazione monete e nemici sopra ogni piattaforma ---
    this.platforms.children.iterate((child) => {
      const plat = child as Phaser.Physics.Arcade.Sprite;

      // --- Nemico sopra la piattaforma ---
      const enemyX = plat.x + 200;
      const enemyY = plat.y - plat.displayHeight / 2 - 20;
      const enemy = this.enemies.create(enemyX, enemyY, "enemy") as Phaser.Physics.Arcade.Sprite;
      enemy.setCollideWorldBounds(true);
      enemy.setVelocityX(50);   // movimento orizzontale
      enemy.setBounce(1, 0);    // rimbalzo sui bordi
      enemy.setScale(0.2);

      // --- Moneta sopra la piattaforma ---
      const numCoins = 1;   // numero di monete per piattaforma
      const spacing = 40;   // distanza tra monete
      for (let i = 0; i < numCoins; i++) {
        const coinX = plat.x - (spacing * (numCoins - 1)) / 2 + i * spacing;
        const coinY = plat.y - plat.displayHeight / 2 - 20;
        const coin = this.coins.create(coinX, coinY, "coin") as Phaser.Physics.Arcade.Image;
        coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        coin.setScale(0.1);
      }

      return null;
    });

    // --- Player ---
    this.player = this.physics.add.sprite(100, 450, "player");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.1);

    // --- Cursori ---
    this.cursors = this.input.keyboard!.createCursorKeys();

    // --- Collider ---
    this.physics.add.collider(this.player, this.platforms);      // player piattaforme
    this.physics.add.collider(this.coins, this.platforms);       // monete piattaforme
    this.physics.add.collider(this.enemies, this.platforms);     // nemici piattaforme

    // --- Raccolta monete ---
    this.physics.add.overlap(
      this.player,
      this.coins,
      (_playerObj, coinObj) => {
        const coin = coinObj as Phaser.Physics.Arcade.Image;
        coin.disableBody(true, true);  // nascondi moneta raccolta
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);

        // Se non ci sono più monete, scena GameOver
        if (this.coins.countActive(true) === 0) {
          this.scene.start("GameOverScene-4");
        }
      },
      undefined,
      this
    );

    // --- Collisione player/nemici con lampeggio ---
 this.physics.add.collider(this.player, this.enemies, () => {
  // Inizia il lampeggio del player per 3 secondi
  this.tweens.add({
    targets: this.player,
    alpha: 0,          // diventa trasparente
    duration: 100,     // 100ms per ogni transizione
    yoyo: true,        // torna normale
    repeat: -1         // ripeti indefinitamente fino a quando non fermiamo il tween
  });

  // Dopo 3 secondi, ferma il lampeggio e ripristina visibilità
  this.time.delayedCall(2000, () => {
    this.player.alpha = 1;
    this.tweens.killTweensOf(this.player);
  });
});

    // --- Testo punteggio ---
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      color: "#fff",
    });
  }

  update() {
    // --- Movimento orizzontale ---
    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    // --- Salto ---
   if (Phaser.Input.Keyboard.JustDown(this.cursors.up!)) {
    this.player.setVelocityY(-330);
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down!)) {
    this.player.setVelocityY(300);
    }
    
  }
}
