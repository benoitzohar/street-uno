import React, { useMemo, useState } from "react";
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
  IonTitle,
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

  const round = useMemo(() => {
    if (!game || !game.players.length) {
      return 0;
    }
    return game.players.reduce(
      (r, player) => Math.min(r, game.scores[player].length),
      0
    );
  }, [game]);

  return (
    <IonPage id="new-game">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Back" defaultHref="/"></IonBackButton>
            <IonTitle size="small">{game?.date}</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading isOpen={!game} message={"Loading..."} />
        <ScoreGrid game={game} />
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
            round={round}
          />
        )}
      </IonModal>
    </IonPage>
  );
}
