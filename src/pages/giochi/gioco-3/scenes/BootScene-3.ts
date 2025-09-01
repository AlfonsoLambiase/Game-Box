import Phaser from "phaser";

export default class BootScene3 extends Phaser.Scene {
  constructor() {
    super("BootScene-3");
  }

  preload() {
    // qui potresti caricare assets globali se vuoi
  }

  create() {
    this.add.text(300, 250, "Loading...", {
      font: "50px monospace",
      color: "#ffffff",
    });

    this.time.delayedCall(2000, () => {
      this.scene.start("GameScene-3"); // Avvia la scena di gioco principale
    });
  }
}
