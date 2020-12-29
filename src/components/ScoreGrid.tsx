import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import { Scores } from "../types";

import "./ScoreGrid.css";

interface Props {
  scores: Scores;
}

export default function ScoreGrid({ scores }: Props) {
  if (!scores) {
    return null;
  }
  const players = Object.keys(scores);
  if (!players.length) {
    return null;
  }
  const nbOfRows = scores[players[0]].length;

  return (
    <IonGrid id="score-grid">
      <IonRow>
        {players.map((player) => (
          <IonCol key={player} className="header">
            {player}
          </IonCol>
        ))}
      </IonRow>

      {nbOfRows === 0 && (
        <IonRow>
          <IonCol size="12" className="empty">
            No data just yet.
          </IonCol>
        </IonRow>
      )}

      {Array.from(Array(nbOfRows)).map((_, idx) => (
        <IonRow key={idx}>
          {players.map((player) => (
            <IonCol key={`${player}-${idx}`} className="cell">
              {scores[player][idx]}
            </IonCol>
          ))}
        </IonRow>
      ))}

      {nbOfRows > 0 && (
        <IonRow>
          {players.map((player) => (
            <IonCol key={player} className="total">
              {scores[player].reduce((acc, score) => {
                acc = acc + score;
                return acc;
              }, 0)}
            </IonCol>
          ))}
        </IonRow>
      )}
    </IonGrid>
  );
}
