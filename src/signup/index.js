var firebaseConfig = {
    apiKey: "AIzaSyBaIwLYQionwFwlFCPtGmBNhg9JZ0_mqZA",
    authDomain: "corona-index-db.firebaseapp.com",
    databaseURL: "https://corona-index-db.firebaseio.com",
    projectId: "corona-index-db",
    storageBucket: "corona-index-db.appspot.com",
    messagingSenderId: "622446950632",
    appId: "1:622446950632:web:a6d2af3bda10eb97d4315d",
    measurementId: "G-HS31KZHBCP"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const auth = firebase.auth();

let __getLocation = ()=>{
    
}

let __signupUser = (em, upass)=>{
    if(em == "" || upass == "")
    {
        alert("Either username or password is empty")
    }
    else{
        auth.createUserWithEmailAndPassword(em,upass).catch(err=>{
            alert(`${err.code}=>${err.message}`)
        })
        location.replace('../dashboard')
    }
}