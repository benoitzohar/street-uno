import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import "./NewGame.css";
import { createGame } from "../data/games";

interface Props extends RouteComponentProps {}

const NewGame: React.FC<Props> = ({ history }: Props) => {
  const [players, setPlayers] = useState<string[]>([
    "Alex",
    "Ben",
    "Katy",
    "Manon",
    "Nico",
    "Val",
  ]);

  const create = useCallback(async () => {
    const gameId = await createGame(players.filter((p) => !!p));
    if (!gameId) {
      alert("Oops something wen wrong.");
    }
    history.push(`/game/${gameId}`);
  }, [history, players]);

  return (
    <IonPage id="new-game">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Back" defaultHref="/"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList lines="full" className="ion-no-margin">
          {Array.from(Array(8)).map((_, idx) => (
            <IonItem lines="full" key={idx}>
              <IonInput
                type="text"
                value={players[idx]}
                placeholder={`Player ${idx + 1}`}
                onIonChange={(e) => {
                  const newPlayers = [...players];
                  newPlayers[idx] = e.detail.value!;
                  setPlayers(newPlayers);
                }}
              ></IonInput>
            </IonItem>
          ))}
        </IonList>
        <IonButton color="primary" expand="full" onClick={create}>
          Start the game!
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NewGame;
