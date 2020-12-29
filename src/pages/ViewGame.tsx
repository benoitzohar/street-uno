import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonModal,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import "./ViewGame.css";
import ScoreGrid from "../components/ScoreGrid";
import { useGame } from "../data/games";
import ScoreInput from "../components/ScoreInput";

export default function ViewGame({ match }: RouteComponentProps) {
  //@ts-ignore
  const id = match.params.id;
  const game = useGame(id);
  const [showModal, setShowModal] = useState(false);

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
        <IonLoading isOpen={!game} message={"Loading..."} />
        <ScoreGrid scores={game?.scores ?? {}} />
        <IonButton
          color="primary"
          expand="full"
          onClick={() => setShowModal(true)}
        >
          New round
        </IonButton>
      </IonContent>

      <IonModal isOpen={showModal}>
        {game?.players && (
          <ScoreInput
            id={id}
            players={game.players}
            closeModal={() => setShowModal(false)}
          />
        )}
      </IonModal>
    </IonPage>
  );
}
