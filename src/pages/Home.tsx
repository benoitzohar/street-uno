import React from "react";
import { RouteComponentProps } from "react-router";
import { deleteGame, useGames, useStats } from "../data/games";
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
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";

export default function Home({ history }: RouteComponentProps) {
  const games = useGames();
  const stats = useStats(games);

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
          <IonListHeader>
            <IonLabel color="primary">Stats</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel color="secondary">Games played </IonLabel>
            <IonLabel>
              {Number(
                Object.values(stats.gameWins || {}).reduce(
                  (acc: any, w: any) => acc + w,
                  0
                )
              )}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel color="secondary">Rounds played </IonLabel>
            <IonLabel>
              {Number(
                Object.values(stats.roundWins || {}).reduce(
                  (acc: any, w: any) => acc + w,
                  0
                )
              )}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel color="secondary">Most won games </IonLabel>
            <IonLabel>
              {stats.wonGames} ({stats.wonGamesNb})
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel color="secondary">Most won rounds </IonLabel>
            <IonLabel>
              {stats.wonRounds} ({stats.wonRoundsNb})
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel color="secondary">Highest score in one round </IonLabel>
            <IonLabel>
              {stats.highScore} ({stats.highScoreNb})
            </IonLabel>
          </IonItem>
          {Object.keys(stats.roundWins || {})
            .sort()
            .map((pl) => (
              <IonItem key={pl}>
                <IonLabel color="secondary">Stats for {pl}</IonLabel>
                <IonLabel>
                  Games won: {stats.gameWins[pl] || 0}
                  <br />
                  Rounds won: {stats.roundWins[pl]}
                  <br />
                  Highest round score: {stats.roundScores[pl]}
                </IonLabel>
              </IonItem>
            ))}
          <IonListHeader>
            <IonLabel color="primary">Games</IonLabel>
          </IonListHeader>
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
