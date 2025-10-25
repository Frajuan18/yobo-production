// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-XXLa-c7CLHM-gDv_H0JxgFagWITtxqM",
  authDomain: "yobo-production-6c1fb.firebaseapp.com",
  projectId: "yobo-production-6c1fb",
  storageBucket: "yobo-production-6c1fb.firebasestorage.app",
  messagingSenderId: "591328448237",
  appId: "1:591328448237:web:0846067f3b3e8323f186e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the app instance
export { app };