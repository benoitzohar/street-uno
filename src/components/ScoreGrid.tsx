import { IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
import React from "react";
import { Game } from "../types";

import "./ScoreGrid.css";

interface Props {
  game: Game | null;
  onEdit: (round: number) => void;
}

export default function ScoreGrid({ game, onEdit }: Props) {
  if (!game) {
    return null;
  }

  return (
    <IonGrid id="score-grid" className="ion-no-margin">
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
        <IonRow
          key={idx}
          onClick={() => {
            onEdit(idx);
          }}
        >
          {game.players.map((player) => (
            <IonCol key={`${player}-${idx}`} className="cell">
              {game.scores[player][idx] === -1 ? (
                <IonLabel color="secondary">Win!</IonLabel>
              ) : (
                game.scores[player][idx]
              )}
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
