
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyDF8p7VESBGMIfrprb264hxZBZ3REMS-b8",
  authDomain: "question1-66b51.firebaseapp.com",
  databaseURL: "https://question1-66b51-default-rtdb.firebaseio.com",
  projectId: "question1-66b51",
  storageBucket: "question1-66b51.firebasestorage.app",
  messagingSenderId: "589099969017",
  appId: "1:589099969017:web:95cedb8d0b9ae18b0d3528"
};


const app = initializeApp(firebaseConfig);


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


const database = getDatabase(app);

export { auth, database };