import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCFQDALnOtzc1y7gdNLWWzXqZuQpQRN8Y4",
  authDomain: "zelari-core.firebaseapp.com",
  projectId: "zelari-core",
  storageBucket: "zelari-core.firebasestorage.app",
  messagingSenderId: "834293638071",
  appId: "1:834293638071:web:11a4d747ca1ba7e4a6fe32"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

