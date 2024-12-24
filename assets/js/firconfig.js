//fireConfig 
var firebaseConfig = {
    apiKey: "AIzaSyCvctj0GbvamxFo3F0jtSNROxaNbMHTQyo",
    authDomain: "plyofit-3798c.firebaseapp.com",
    databaseURL: "https://plyofit-3798c-default-rtdb.firebaseio.com",
    projectId: "plyofit-3798c",
    storageBucket: "plyofit-3798c.appspot.com",
    messagingSenderId: "170636040021",
    appId: "1:170636040021:web:a167a444d8471a7c9201dc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const database = firebase.database();