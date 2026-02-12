import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCUUXHQ5DDY_zz_VMsNN2Szf8nLCBD_7-o",
    authDomain: "the-hub-b1f69.firebaseapp.com",
    projectId: "the-hub-b1f69",
    storageBucket: "the-hub-b1f69.firebasestorage.app",
    messagingSenderId: "205501157930",
    appId: "1:205501157930:web:57e3d6f211d64edc90e953",
    measurementId: "G-KRHTZ00CXT"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };