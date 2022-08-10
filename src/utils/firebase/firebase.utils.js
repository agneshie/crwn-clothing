import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDT7YgXWPIwHWgqz5BitGyhxrBbSj7bIvc",
  authDomain: "crwn-clothing-db-f2ce7.firebaseapp.com",
  projectId: "crwn-clothing-db-f2ce7",
  storageBucket: "crwn-clothing-db-f2ce7.appspot.com",
  messagingSenderId: "905393186811",
  appId: "1:905393186811:web:3a51b2439972730a2ecd5e"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return;

  const userDocRef = await doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  if(!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    console.log("No email and/or password passed to the function");
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
}