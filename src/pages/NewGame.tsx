import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import "./NewGame.css";
import { createGame } from "../data/games";

interface Props extends RouteComponentProps {}

const NewGame: React.FC<Props> = ({ history }: Props) => {
  useEffect(() => {
    async function temporaryShortcut() {
      const gameId = await createGame([
        "Alex",
        "Ben",
        "Katy",
        "Manon",
        "Nico",
        "Val",
      ]);
      if (!gameId) {
        alert("Oops something wen wrong.");
      }
      history.push(`/game/${gameId}`);
    }
    temporaryShortcut();
  }, [history]);

  return (
    <IonPage id="new-game">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Back" defaultHref="/"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>New game</IonContent>
    </IonPage>
  );
};

export default NewGame;
