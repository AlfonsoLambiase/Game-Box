"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";
import BootScene5 from "./scenes/BootScene-5";
import GameScene5 from "./scenes/GameScene-5";
import GameOverScene5 from "./scenes/GameOverScene-5";


const PhaserGame5 = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameInstanceRef.current || !gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      width: 800,
      height: 600,
      parent: gameRef.current,
      backgroundColor: "#1d1d1d",
      scene: [BootScene5, GameScene5, GameOverScene5],
      physics: { default: "arcade" },
    };

    gameInstanceRef.current = new Phaser.Game(config);

    return () => {
      gameInstanceRef.current?.destroy(true);
      gameInstanceRef.current = null;
    };
  }, []);

  return <div ref={gameRef} style={{ width: 800, height: 600 }} />;
};

export default PhaserGame5;
