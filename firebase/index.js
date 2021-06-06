import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/database'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

try {
    const firebaseConfig = {
        // apiKey: process.env.API_KEY,
        // authDomain: process.env.AUTH_DOMAIN,
        // databaseURL: process.env.DATABASE_URL,
        // projectId: process.env.PROJECT_ID,
        // storageBucket: process.env.STORAGE_BUCKET,
        // messagingSenderId: process.env.MESSAGING_SENDER_ID,
        // appId: process.env.APP_ID,
        // measurementId: process.env.MEASUREMENT_ID

        apiKey: "AIzaSyCizj_hKFU4s6cqVt3GTf18W9oMn9G-4pA",
        authDomain: "architectsstaffmanager.firebaseapp.com",
        databaseURL: "https://architectsstaffmanager-default-rtdb.firebaseio.com",
        projectId: "architectsstaffmanager",
        storageBucket: "architectsstaffmanager.appspot.com",
        messagingSenderId: "550911242330",
        appId: "1:550911242330:web:5c5fc2e0a60ea05c3be863",
        measurementId: "G-483Y28377N"
    };
    // Initialize Firebase    
    firebase.initializeApp(firebaseConfig);
    // firebase.firestore().settings({timesstampsInSnapshots:true}) 
} catch (error) {
    if (!/already exists/.test(error.message)) {
        console.log(`Firebase didnt initialize correctly: ${error.message}`)
    }
}

const storage = firebase.storage();

export {
    storage,
    firebase as default
}