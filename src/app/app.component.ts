import { Component } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCa9q0TenldDuVp3NMq9G-fzqbE0G1mVg",
  authDomain: "family-secret-santa-generator.firebaseapp.com",
  projectId: "family-secret-santa-generator",
  storageBucket: "family-secret-santa-generator.appspot.com",
  messagingSenderId: "912157532914",
  appId: "1:912157532914:web:160d45257ba50cc9f2a66b",
  measurementId: "G-BYMYGHJ770"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'secret-santa-maker';
}
