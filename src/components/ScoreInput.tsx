import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
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
      <IonContent>
        <IonList lines="full" className="ion-no-margin">
          <IonItem lines="full">
            {players.map((player) => (
              <IonInput
                key={player}
                type="number"
                value={scores[player]}
                placeholder={player}
                onIonChange={(e) =>
                  updateScore(player, parseInt(e.detail.value!, 10))
                }
              ></IonInput>
            ))}
          </IonItem>
        </IonList>
        <IonButton
          color="primary"
          expand="full"
          onClick={saveScore}
          disabled={Object.keys(scores).length !== players.length}
        >
          Done
        </IonButton>
      </IonContent>
    </>
  );
}
