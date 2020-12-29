import React from "react";
import { useGames } from "../data/games";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
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
            <div>{game.date}</div>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
