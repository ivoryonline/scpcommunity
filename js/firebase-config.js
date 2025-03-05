const firebaseConfig = {

    apiKey: "AIzaSyC7JieiGfDWojBoizuEbSgFi8yDG7sgGGw",
  
    authDomain: "scpproject-9e670.firebaseapp.com",
  
    projectId: "scpproject-9e670",
  
    storageBucket: "scpproject-9e670.firebasestorage.app",
  
    messagingSenderId: "680542110701",
  
    appId: "1:680542110701:web:bc7f7d6a822f5f9f94dde4",
  
    measurementId: "G-FD69KTM11P"
  
};
  
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();