import Phaser from "phaser";

type BottleData = {
  pro: string[];
  sprites: Phaser.GameObjects.Image[];
};

export default class GameScene2 extends Phaser.Scene {
  private bottles: Phaser.GameObjects.Image[] = [];
  private bottleData: BottleData[] = [];
  private winText: Phaser.GameObjects.Text | null = null;

  private floatingPro: Phaser.GameObjects.Image | null = null;
  private floatingProType: string | null = null;
  private floatingProOriginIndex: number | null = null;

  constructor() {
    super("GameScene-2");
  }

  preload(): void {
    this.load.image("sfondo", "/Gioco-2/sfondo.png");
    this.load.image("bottle", "/Gioco-2/barattolo.png");
    this.load.image("pro1", "/Gioco-2/pro1.png");
    this.load.image("pro2", "/Gioco-2/pro2.png");
    this.load.image("pro3", "/Gioco-2/pro3.png");
    this.load.image("pro4", "/Gioco-2/pro4.png");
  }

  create(): void {
    this.add.image(400, 300, "sfondo");

    const bottlePositions = [
      { x: 100, y: 500 },
      { x: 250, y: 500 },
      { x: 400, y: 500 },
      { x: 550, y: 500 },
      { x: 700, y: 500 }, // barattolo vuoto
    ];

    const proTypes = ["pro1", "pro2", "pro3", "pro4"];

    // Ogni barattolo (tranne l'ultimo) ha 4 pro dello stesso tipo, diversi tra loro
    for (let i = 0; i < bottlePositions.length; i++) {
      const pos = bottlePositions[i];
      const sprite = this.add.image(pos.x, pos.y, "bottle")
        .setOrigin(0.5, 1)
        .setScale(0.5)
        .setInteractive();

      let contents: string[] = [];
      if (i < 4) {
        contents = Array(4).fill(proTypes[i]);
      }

      this.bottles.push(sprite);
      this.bottleData.push({ pro: contents, sprites: [] });
    }

    this.winText = this.add.text(400, 50, '', {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 10, y: 10 },
    }).setOrigin(0.5).setVisible(false);

    this.renderAllBottles();
  }

  private renderAllBottles() {
    for (let i = 0; i < this.bottleData.length; i++) {
      this.renderBottleContents(i);
    }
  }

  private renderBottleContents(index: number): void {
    const container = this.bottleData[index];
    container.sprites.forEach(s => s.destroy());
    container.sprites = [];

    const baseX = this.bottles[index].x;
    const baseY = this.bottles[index].y;

    container.pro.forEach((proType, i) => {
      const sprite = this.add.image(baseX, baseY - 40 - i * 40, proType)
        .setOrigin(0.5)
        .setScale(0.5)
        .setInteractive();

      sprite.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
        pointer.event.stopPropagation();
        this.pickUpPro(index, i);
      });

      container.sprites.push(sprite);
    });
  }

  private pickUpPro(bottleIndex: number, proIndex: number) {
    if (this.floatingPro) return;

    const container = this.bottleData[bottleIndex];
    const proType = container.pro[proIndex];
    if (!proType) return;

    container.pro.splice(proIndex, 1);
    this.renderBottleContents(bottleIndex);

    this.floatingPro = this.add.image(this.bottles[bottleIndex].x, this.bottles[bottleIndex].y - 40 - proIndex * 40, proType)
      .setOrigin(0.5)
      .setScale(0.6)
      .setDepth(1000)
      .setInteractive();

    this.floatingProType = proType;
    this.floatingProOriginIndex = bottleIndex;

    this.input.on('pointermove', this.moveFloatingPro, this);

    // Listener globale per rilasciare il pro sul barattolo
    this.input.once('pointerup', (pointer: Phaser.Input.Pointer) => {
      const targetIndex = this.bottles.findIndex(bottleSprite =>
        bottleSprite.getBounds().contains(pointer.x, pointer.y)
      );

      if (targetIndex !== -1) {
        this.placeFloatingPro(targetIndex);
      } else {
        this.cancelFloatingPro();
      }
    });
  }

  private moveFloatingPro(pointer: Phaser.Input.Pointer) {
    if (!this.floatingPro) return;
    this.floatingPro.x = pointer.x;
    this.floatingPro.y = pointer.y;
  }

  private placeFloatingPro(targetBottleIndex: number) {
    if (!this.floatingPro || this.floatingProType === null || this.floatingProOriginIndex === null) return;

    const targetData = this.bottleData[targetBottleIndex];

    if (targetData.pro.length >= 4) {
      this.shakeBottle(targetBottleIndex);
      this.cancelFloatingPro();
      return;
    }

    this.tweens.add({
      targets: this.floatingPro,
      x: this.bottles[targetBottleIndex].x,
      y: this.bottles[targetBottleIndex].y - 40 - targetData.pro.length * 40,
      duration: 300,
      ease: 'Power2',
      onComplete: () => {
        targetData.pro.push(this.floatingProType!);
        this.renderBottleContents(targetBottleIndex);

        this.floatingPro?.destroy();
        this.floatingPro = null;
        this.floatingProType = null;
        this.floatingProOriginIndex = null;

        this.checkWinCondition();
      }
    });

    this.input.off('pointermove', this.moveFloatingPro, this);
  }

  private cancelFloatingPro() {
    if (!this.floatingPro || this.floatingProOriginIndex === null || this.floatingProType === null) return;

    this.bottleData[this.floatingProOriginIndex].pro.push(this.floatingProType);
    this.renderBottleContents(this.floatingProOriginIndex);

    this.floatingPro.destroy();
    this.floatingPro = null;
    this.floatingProType = null;
    this.floatingProOriginIndex = null;

    this.input.off('pointermove', this.moveFloatingPro, this);
  }

  private shakeBottle(index: number): void {
    this.tweens.add({
      targets: this.bottles[index],
      x: this.bottles[index].x + 10,
      duration: 100,
      yoyo: true,
      repeat: 2,
    });
  }

  private checkWinCondition(): void {
    const isWin = this.bottleData.every(b =>
      b.pro.length === 0 || (b.pro.length === 4 && b.pro.every(p => p === b.pro[0]))
    );

    if (isWin) {
      this.winText?.setText("🎉 Hai vinto!").setVisible(true);
    }
  }
}
