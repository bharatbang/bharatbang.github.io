
import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyA0iatbAISHRpiyuZxYGcW-62arRhTKPMI",
  authDomain: "genre-explorer-jquh4.firebaseapp.com",
  projectId: "genre-explorer-jquh4",
  storageBucket: "genre-explorer-jquh4.firebasestorage.app",
  messagingSenderId: "1076747997837",
  appId: "1:1076747997837:web:86bdc21a924a2727d2c8c4"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log('[Firebase] Firebase app initialized.');
} else {
  app = getApp();
  console.log('[Firebase] Firebase app re-used.');
}

const db = getFirestore(app);
console.log('[Firebase] Firestore instance obtained.');

export { app, db };
