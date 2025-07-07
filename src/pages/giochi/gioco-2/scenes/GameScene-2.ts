import Phaser from "phaser";

export default class GameScene2 extends Phaser.Scene {
  constructor() {
    super("GameScene-2");
  }

  preload() {
    this.load.image("sfondo", "/Gioco-2/sfondo.png");
    this.load.image("bottle", "/Gioco-2/barattolo.png");
    this.load.image("pro1", "/Gioco-2/pro1.png");
    this.load.image("pro2", "/Gioco-2/pro2.png");
    this.load.image("pro3", "/Gioco-2/pro3.png");
    this.load.image("pro4", "/Gioco-2/pro4.png");
  }

  create() {
    this.add.image(400, 300, "sfondo");

    const bottleScale = 0.5;
    const ballYOffset = -40;

    // Barattoli Sopra
    const topBottlesX = [250, 400, 550];
    const topBottlesY = 300;  // Altezza barattoli sopra
    const topBalls = ["pro2", "pro4", "pro1"];

    // Barattoli Sotto
    const bottomBottlesX = [300, 500];
    const bottomBottlesY = 550;  // Altezza barattoli sotto
    const bottomBalls = ["pro3", null];

    // Disegna sopra
    topBottlesX.forEach((x, i) => {
      this.add.image(x, topBottlesY, "bottle").setOrigin(0.5, 1).setScale(bottleScale);
      this.add.image(x, topBottlesY + ballYOffset, topBalls[i]).setOrigin(0.5, 0.5).setScale(bottleScale);
    });

    // Disegna sotto
    bottomBottlesX.forEach((x, i) => {
      this.add.image(x, bottomBottlesY, "bottle").setOrigin(0.5, 1).setScale(bottleScale);
      if (bottomBalls[i]) {
        this.add.image(x, bottomBottlesY + ballYOffset, bottomBalls[i]).setOrigin(0.5, 0.5).setScale(bottleScale);
      }
    });
  }
}
