"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";
import BootScene2 from "./scenes/BootScene-2";
import GameScene2 from "./scenes/GameScene-2";
import GameOverScene2 from "./scenes/GameOverScene-2";


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
      scene: [BootScene2, GameScene2, GameOverScene2],
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
