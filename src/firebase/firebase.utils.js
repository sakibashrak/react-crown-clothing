import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBY1mxANaGJ1g53lSfgoraKwi38jBRrW2Q",
  authDomain: "crwn-db-9aa54.firebaseapp.com",
  databaseURL: "https://crwn-db-9aa54.firebaseio.com",
  projectId: "crwn-db-9aa54",
  storageBucket: "crwn-db-9aa54.appspot.com",
  messagingSenderId: "795258132826",
  appId: "1:795258132826:web:955b1a0900124339a3bb63",
  measurementId: "G-1PRVY4PN5D"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    console.log("userAuth already exist");
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // console.log(snapShot);
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
