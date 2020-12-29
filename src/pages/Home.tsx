import React from "react";
import { RouteComponentProps } from "react-router";
import { deleteGame, useGames } from "../data/games";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";

export default function Home({ history }: RouteComponentProps) {
  const games = useGames();

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Street Uno Games</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/new-game">Add</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Street Uno Games</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList lines="full" className="ion-no-margin">
          {games.map((game) => (
            <IonItemSliding key={game.id}>
              <IonItem onClick={() => history.push(`/game/${game.id}`)}>
                <IonLabel>{game.date}</IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption
                  color="danger"
                  expandable
                  onClick={() => deleteGame(game.id)}
                >
                  Delete
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
