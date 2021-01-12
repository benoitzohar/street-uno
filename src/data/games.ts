import firebase from "firebase";
import "firebase/firestore";
import { useEffect, useState } from "react";
import { Game, GameDoc, RoundScores, Scores, Totals } from "../types";
const firebaseConfig = {
  apiKey: "AIzaSyAd3iKW2j_fchyMYpz6M6HB6aT1ineaduA",
  authDomain: "street-uno.firebaseapp.com",
  projectId: "street-uno",
  storageBucket: "street-uno.appspot.com",
  messagingSenderId: "386543145378",
  appId: "1:386543145378:web:72087023f0af87e150a2fb",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function getDataFromDoc(
  doc:
    | firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
    | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
): Game | undefined {
  try {
    const data = doc.data() as GameDoc;
    const vals = Object.values(data.scores);
    const totals = data.players.reduce((acc, player) => {
      acc[player] = getTotal(player, data.scores);
      return acc;
    }, {} as Totals);
    const players = data.players.sort((a, b) => totals[a] - totals[b]);

    const game = {
      id: doc.id,
      rawDate: data.date.toDate(),
      date: new Intl.DateTimeFormat("default", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(data.date.toDate()),
      players,
      scores: data.scores,
      rounds: vals[0]?.length || 0,
      totals,
      winner: getWinner(totals),
    };
    return game as Game;
  } catch (err) {
    console.error(err);
    alert("An error occured while fetching the game. Check the logs.");
  }
  return;
}

function getWinner(totals: Totals): string {
  const players = Object.keys(totals);
  if (!players.length) {
    return "";
  }
  return players.reduce((winner: string, player: string) => {
    if (winner && totals[player] > totals[winner]) {
      return player;
    }
    return winner || player;
  }, "");
}

export function getTotal(player: string, scores: Scores) {
  if (!scores[player] || !scores[player].length) {
    return 0;
  }
  return scores[player].reduce((sum, score) => {
    if (score === -1) {
      //win
      return sum;
    }
    return sum + score;
  }, 0);
}

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("games")
      .onSnapshot(function (querySnapshot) {
        const games: Game[] = [];
        querySnapshot.forEach(function (doc) {
          const data = getDataFromDoc(doc);
          if (data) {
            games.push(data);
          }
        });
        games.sort((a, b) => +(b.rawDate) - (+a.rawDate));
        setGames(games);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return games;
};

export const useGame = (id: string) => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const unsubscribe = db
      .collection("games")
      .doc(id)
      .onSnapshot(function (doc) {
        const data = getDataFromDoc(doc);
        if (data) {
          setGame(data);
        }
      });
    return () => {
      unsubscribe();
    };
  }, [id]);

  return game;
};

export async function createGame(players: string[]) {
  const res = await db.collection("games").add({
    date: new Date(),
    players,
    scores: players.reduce((acc: { [player: string]: number[] }, p) => {
      acc[p] = [];
      return acc;
    }, {}),
    winner: "",
  });
  return res.id;
}

// unused for now
export async function updateGame(id: string, roundScores: RoundScores) {
  try {
    const ref = db.collection("games").doc(id);
    const game = (await ref.get()).data() as Game;
    const scores = game.players.reduce((acc, player) => {
      acc[player].push(roundScores[player] || -0);
      return acc;
    }, game.scores);
    await ref.update({
      scores,
      date: new Date(),
    });
    return true;
  } catch (err) {
    console.error(err);
    alert("An error occured. Check the logs");
    return false;
  }
}

export async function updateRound(
  id: string,
  player: string,
  score: number,
  round: number
) {
  try {
    const ref = db.collection("games").doc(id);
    const game = (await ref.get()).data() as Game;
    const scores = {
      ...game.scores,
    };
    scores[player][round] = score;

    await ref.update({
      scores,
      date: new Date(),
    });
    return true;
  } catch (err) {
    console.error(err);
    alert("An error occured. Check the logs");
    return false;
  }
}

export async function deleteGame(id: string) {
  try {
    await db.collection("games").doc(id).delete();
    return true;
  } catch (err) {
    console.error(err);
    alert("An error occured. Check the logs");
    return false;
  }
}
