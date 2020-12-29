import firebase from "firebase";
import "firebase/firestore";
import { useEffect, useState } from "react";
import { Game, RoundScores } from "../types";
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
    const data = doc.data();
    data!.id = doc.id;
    data!.date = data!.date.toDate();
    return data as Game;
  } catch (err) {
    console.error(err);
    alert("An error occured while fetching the game. Check the logs.");
  }
  return;
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

export const createGame = async (players: string[]) => {
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
};

export const updateGame = async (id: string, roundScores: RoundScores) => {
  try {
    const ref = db.collection("games").doc(id);
    const game = (await ref.get()).data() as Game;
    const scores = game.players.reduce((acc, player) => {
      acc[player].push(roundScores[player] || 0);
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
};
