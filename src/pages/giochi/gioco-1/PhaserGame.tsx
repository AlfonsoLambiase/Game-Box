"use client"; // Serve per non far scoppiare il gioco

import { useEffect, useRef } from "react"; // Serve per far partire in gioco al Mounth e per avere un riferimento
import * as Phaser from 'phaser';          // Importa Phaser per poterlo usare

import BootScene from "./scenes/BootScene"; // Importa la scena di avvio
import GameScene from "./scenes/GameScene"; // Importa la scena di gioco
import GameOverScene from "./scenes/GameOverScene"; // Importa la scena di Game Over

const PhaserGame = () => {
  const gameRef = useRef<HTMLDivElement>(null); // Riferimento per il div del gioco
  const gameInstanceRef = useRef<Phaser.Game | null>(null); // Riferimento per l'istanza del gioco

  useEffect(() => {
    if (gameInstanceRef.current) return; // Evita doppioni
    if (!gameRef.current) return; // Controlla che il riferimento al div esista già

    const config: Phaser.Types.Core.GameConfig = {  // TypeScript ti segnala l’errore se c'è
      type: Phaser.AUTO, // Usa il tipo di rendering automatico (WebGL o Canvas)
      width: 800, // Larghezza del gioco
      height: 600, // Altezza del gioco
      parent: gameRef.current, // Il div in cui il gioco sarà montato
      backgroundColor: "#1d1d1d", // Colore di sfondo del gioco
      scene: [BootScene, GameScene, GameOverScene], // Le scene del gioco
      physics: {           // Configurazione della fisica
        default: "arcade", // Usa il sistema di fisica arcade
        arcade: {
          debug: false, // Disabilita la visualizzazione del debug
        },
      },
    };

    gameInstanceRef.current = new Phaser.Game(config); // Crea una nuova istanza di Phaser.Game con la configurazione

    return () => {
      gameInstanceRef.current?.destroy(true); // Distruggi l'istanza del gioco al momento dello smontaggio
      gameInstanceRef.current = null; // Resetta il riferimento all'istanza del gioco
    };
  }, []);

  return <div ref={gameRef} />; // Ritorna un div vuoto con il riferimento per il gioco
};

export default PhaserGame;
