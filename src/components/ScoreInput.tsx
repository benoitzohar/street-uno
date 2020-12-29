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
import { updateGame } from "../data/games";
import { RoundScores } from "../types";

import "./ScoreGrid.css";

interface Props {
  id: string;
  players: string[];
  closeModal: () => void;
}

export default function ScoreInput({ id, players, closeModal }: Props) {
  const [scores, setScores] = useState<RoundScores>({});
  const [winner, setWinner] = useState<string | null>(null);
  const updateScore = useCallback(
    (player: string, value: number) => {
      if (isNaN(value)) {
        return;
      }
      scores[player] = value;
      setScores({ ...scores });
    },
    [scores, setScores]
  );

  const saveScore = useCallback(async () => {
    await updateGame(id, scores);
    closeModal();
  }, [closeModal, id, scores]);

  return (
    <>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>New round</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={closeModal}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList lines="full" className="ion-no-margin">
          {players.map((player) => (
            <IonItem lines="full" key={player}>
              <IonLabel>{player}</IonLabel>
              <IonInput
                type="number"
                value={scores[player]}
                placeholder={winner === player ? "" : "0"}
                onIonChange={(e) =>
                  updateScore(player, parseInt(e.detail.value!, 10))
                }
                disabled={winner === player}
              ></IonInput>
              {!winner && (
                <IonButton onClick={() => setWinner(player)}>Winner!</IonButton>
              )}
              {winner === player && <IonLabel>Winner!</IonLabel>}
            </IonItem>
          ))}
        </IonList>
        <IonButton
          color="primary"
          expand="full"
          onClick={saveScore}
          disabled={
            Object.keys(scores).length !== players.length - 1 || !winner
          }
        >
          Done
        </IonButton>
      </IonContent>
    </>
  );
}
