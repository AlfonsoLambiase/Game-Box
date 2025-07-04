// BootScene.ts
export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    // Qui solo carico asset, niente testo
    
  }

  create() {
    // Qui mostro testo o altre cose
    this.add.text(300, 250, "Loading...", {
      font: "50px monospace",
      color: "#ffffff",
    });

    // Passo alla scena di gioco
    this.time.delayedCall(3000, () => {
    this.scene.start("GameScene");this.scene.start("GameScene");}
    )}
}
