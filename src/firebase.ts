import { initializeApp } from "firebase/app";
import { browserLocalPersistence, debugErrorMap, indexedDBLocalPersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtUh_BsU8drCb1hFh3VUuVXOLAsKClv98",
  authDomain: "vue-todo-5f891.firebaseapp.com",
  projectId: "vue-todo-5f891",
  storageBucket: "vue-todo-5f891.firebasestorage.app",
  messagingSenderId: "476209330392",
  appId: "1:476209330392:web:92ae156f819691559ebfad"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence, browserLocalPersistence],
  errorMap: debugErrorMap
});

const db = getFirestore(app);

export { auth, db };