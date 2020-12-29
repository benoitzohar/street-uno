import React from "react";
import { RouteComponentProps } from "react-router";
import { useGames } from "../data/games";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
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

        <IonList>
          {games.map((game) => (
            <IonItem
              key={game.id}
              onClick={() => history.push(`/game/${game.id}`)}
            >
              {game.date.toString()}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
