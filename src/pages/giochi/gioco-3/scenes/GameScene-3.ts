import Phaser from "phaser";

export default class GameScene3 extends Phaser.Scene {
  // Variabili del gioco
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody; // il personaggio
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys; // tastiera per muoversi
  private stars!: Phaser.Physics.Arcade.Group; // gruppo di stelle
  private score: number = 0; // punteggio iniziale
  private scoreText!: Phaser.GameObjects.Text; // testo del punteggio

  constructor() {
    super("GameScene-3"); // nome della scena
  }

  preload() {
    // Carica immagini/sprite del gioco
    this.load.image("sky", "https://labs.phaser.io/assets/skies/space3.png"); // sfondo
    this.load.image("star", "https://labs.phaser.io/assets/demoscene/star.png"); // stella
    this.load.image(
      "player",
      "/Gioco-3/robot.png"
    ); // personaggio
  }

  create() {
    // Aggiunge sfondo statico al centro dello schermo
    this.add.image(400, 300, "sky");

    // Crea il player con fisica, posizione iniziale e blocco ai bordi
   this.player = this.physics.add
  .sprite(400, 500, "player")
  .setScale(0.1) 
  .setCollideWorldBounds(true);

    // Cattura input della tastiera (frecce)
    this.cursors = this.input.keyboard!.createCursorKeys();

    // Crea un gruppo vuoto per le stelle
    this.stars = this.physics.add.group();

    // Timer per generare stelle automaticamente ogni 2 secondi
    this.time.addEvent({
      delay: 2000, // intervallo in millisecondi
      loop: true, // ripete all’infinito
      callback: () => {
        const numStars = Phaser.Math.Between(2, 3); // genera 2-3 stelle alla volta
        for (let i = 0; i < numStars; i++) {
          const x = Phaser.Math.Between(50, 750); // posizione X casuale
          const y = Phaser.Math.Between(-50, 0); // posizione Y sopra lo schermo
          const star = this.stars.create(x, y, "star") as Phaser.Physics.Arcade.Image;
          star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); // effetto rimbalzo
          star.setGravityY(200); // gravità verticale per farla cadere
          star.setActive(true).setVisible(true); // attiva la stella
          star.scale = 2; // riduce la dimensione della stella
        }
      },
    });

    // Definisce cosa succede quando il player tocca una stella
    this.physics.add.overlap(
      this.player, // oggetto 1
      this.stars,  // oggetto 2
      (player, star) => {
        const s = star as Phaser.Physics.Arcade.Image;
        s.disableBody(true, true); // nasconde la stella e disattiva la fisica

        this.score += 10; // aumenta punteggio
        this.scoreText.setText("Score: " + this.score); // aggiorna il testo

        // Controlla se il punteggio totale raggiunge 100 (10 stelle)
        if (this.score >= 100) {
          // passa alla scena GameOverScene-3
          this.scene.start("GameOverScene-3", { score: this.score });
        }
      },
      undefined,
      this
    );

    // Aggiunge il testo punteggio in alto a sinistra
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      color: "#fff",
    });
  }

  update() {
    // Controlla input e muove il player
    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-160); // muove a sinistra
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(160); // muove a destra
    } else {
      this.player.setVelocityX(0); // fermo
    }
  }
}
