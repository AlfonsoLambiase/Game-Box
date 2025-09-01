"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";
import BootScene4 from "./scenes/BootScene-4";
import GameScene4 from "./scenes/GameScene-4";
import GameOverScene4 from "./scenes/GameOverScene-4";


const PhaserGame2 = () => {
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
      scene: [BootScene4, GameScene4, GameOverScene4],
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

export default PhaserGame2;
