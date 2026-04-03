import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4eorruo8ppVxIFYOrmoKujdm70gY04gw",
  authDomain: "khaalihai-auth-cf57f.firebaseapp.com",
  projectId: "khaalihai-auth-cf57f",
  storageBucket: "khaalihai-auth-cf57f.firebasestorage.app",
  messagingSenderId: "945130175809",
  appId: "1:945130175809:web:9c6063548266d4453675c0",
  measurementId: "G-P4E906QGS7"
};

console.log("API KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
