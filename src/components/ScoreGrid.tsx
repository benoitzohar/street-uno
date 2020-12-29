import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import { Game } from "../types";

import "./ScoreGrid.css";

interface Props {
  game: Game | null;
}

export default function ScoreGrid({ game }: Props) {
  if (!game) {
    return null;
  }

  return (
    <IonGrid id="score-grid">
      <IonRow>
        {game.players.map((player) => (
          <IonCol key={player} className="header">
            {player}
          </IonCol>
        ))}
      </IonRow>

      {game.rounds === 0 && (
        <IonRow>
          <IonCol size="12" className="empty">
            No data just yet.
          </IonCol>
        </IonRow>
      )}

      {Array.from(Array(game.rounds)).map((_, idx) => (
        <IonRow key={idx}>
          {game.players.map((player) => (
            <IonCol key={`${player}-${idx}`} className="cell">
              {game.scores[player][idx]}
            </IonCol>
          ))}
        </IonRow>
      ))}

      {game.rounds > 0 && (
        <IonRow>
          {game.players.map((player) => (
            <IonCol key={player} className="total">
              {game.totals[player]}
            </IonCol>
          ))}
        </IonRow>
      )}
    </IonGrid>
  );
}