export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  create() {
    // Messaggio di vittoria
    this.add.text(250, 150, "Hai Vinto!", {
      font: "50px monospace",
      color: "#ffffff",
    });

    // Bottone: Vai al Menu
    const menuButton = this.add.text(280, 280, "Menu", {
      font: "30px monospace",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    })
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", () => {
       window.location.href = "/";
    });

    // Bottone: Riavvia Gioco
    const restartButton = this.add.text(270, 350, "Riavvia", {
      font: "30px monospace",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 20, y: 10 },
    })
    .setInteractive({ useHandCursor: true })
    .on("pointerdown", () => {
      this.scene.start("BootScene");
    });

    // Effetto hover
    [menuButton, restartButton].forEach((btn) => {
      btn.on("pointerover", () => btn.setStyle({ backgroundColor: "#444444" }));
      btn.on("pointerout", () => btn.setStyle({ backgroundColor: "#000000" }));
    });
  }
}
