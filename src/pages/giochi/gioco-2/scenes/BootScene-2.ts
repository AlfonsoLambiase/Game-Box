import Phaser from "phaser";

export default class BootScene2 extends Phaser.Scene {
  constructor() {
    super("BootScene-2");
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
      this.scene.start("GameScene-2"); // Avvia la scena di gioco principale
    });
  }
}
