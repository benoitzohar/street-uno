import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useCallback, useState } from "react";
import { updateRound } from "../data/games";
import { RoundScores, Scores } from "../types";

import "./ScoreGrid.css";

interface Props {
  id: string;
  players: string[];
  round: number;
  closeModal: () => void;
  currentScores: Scores;
}

export default function ScoreInput({
  id,
  players,
  round,
  closeModal,
  currentScores,
}: Props) {
  const [currentRound] = useState(round);
  const [currentPlayers] = useState(players);
  const [scores, setScores] = useState<RoundScores>(
    currentPlayers.reduce((acc, p) => {
      acc[p] = currentScores[p][currentRound] || undefined;
      return acc;
    }, {} as RoundScores)
  );
  const [winner, setWinner] = useState<string | null>(
    players.find((p) => scores[p] === -1) || null
  );
  const updateScore = useCallback(
    async (player: string, value: number) => {
      if (isNaN(value)) {
        return;
      }
      scores[player] = value;
      setScores({ ...scores });
      await updateRound(id, player, value, currentRound);
    },
    [id, currentRound, scores]
  );

  return (
    <>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Round #{currentRound}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={closeModal}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList lines="full" className="ion-no-margin">
          {currentPlayers.map((player) => (
            <IonItem lines="full" key={player}>
              <IonLabel>{player}</IonLabel>
              <IonInput
                type="number"
                value={scores[player] === -1 ? "" : scores[player]}
                placeholder={winner === player ? "" : "0"}
                onIonChange={(e) =>
                  updateScore(player, parseInt(e.detail.value!, 10))
                }
                disabled={winner === player}
              ></IonInput>
              {!winner && (
                <IonButton
                  onClick={() => {
                    setWinner(player);
                    updateScore(player, -1);
                  }}
                >
                  Winner!
                </IonButton>
              )}
              {winner === player && <IonLabel>Winner!</IonLabel>}
            </IonItem>
          ))}
        </IonList>
        <IonButton
          color="primary"
          expand="full"
          onClick={closeModal}
          disabled={
            Object.keys(scores).length !== currentPlayers.length || !winner
          }
        >
          Done
        </IonButton>
      </IonContent>
    </>
  );
}
