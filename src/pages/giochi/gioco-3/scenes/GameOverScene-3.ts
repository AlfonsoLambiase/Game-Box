import Phaser from "phaser";

export default class GameOverScene3 extends Phaser.Scene {
  constructor() {
    super("GameOverScene-3");
  }

  create() {
    this.add.text(250, 150, "Hai Vinto!", {
      font: "50px monospace",
      color: "#ffffff",
    });

    const menuButton = this.add.text(280, 280, "Menu", {
      font: "30px monospace",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        window.location.href = "/home"; // torna alla homepage Next.js
      });

    const restartButton = this.add.text(270, 350, "Riavvia", {
      font: "30px monospace",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("GameScene-3"); // riavvia la scena principale
      });

    [menuButton, restartButton].forEach((btn) => {
      btn.on("pointerover", () => btn.setStyle({ backgroundColor: "#444444" }));
      btn.on("pointerout", () => btn.setStyle({ backgroundColor: "#000000" }));
    });
  }
}
