import firebase from "firebase";
import { useState } from "react";
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

export interface Game {
  id: number;
  date: Date;
  players: string[];
  scores: {
    [player: string]: number[];
  };
  winner: string;
}

const games: Game[] = [];

export const getGames = () => games;

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  db.collection("ganes").onSnapshot(function (querySnapshot) {
    const games: Game[] = [];
    querySnapshot.forEach(function (doc) {
      games.push(doc.data() as Game);
    });
    console.log("[DEBUG] games:", games);
    setGames(games);
  });
  return games;
};

export const getGame = (id: number) => games.find((m) => m.id === id);

export const createGame = (players: string[]) => {
  db.collection("games").add({
    date: new Date(),
    players,
    scores: players.reduce((acc: { [player: string]: number[] }, p) => {
      acc[p] = [];
      return acc;
    }, {}),
    winner: "",
  });
};
