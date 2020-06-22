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
    navigator.geolocation.getCurrentPosition((pos)=>{
        window.sessionStorage.setItem('ctrack-pos-lat',pos.coords.latitude)
        window.sessionStorage.setItem('ctrack-pos-long',pos.coords.longitude)
    })
}

let __signupUser = (em, upass)=>{
    if(em == "" || upass == "")
    {
        alert("Either username or password is empty")
    }
    else{
        auth.createUserWithEmailAndPassword(em,upass).catch(err=>{
            alert(`${err.code}=>${err.message}`)
        }).then(()=>{

            db.collection('user_locations').doc(em).set({
                location:{
                    lat:window.sessionStorage.getItem('ctrack-pos-lat'),
                    long:window.sessionStorage.getItem('ctrack-pos-long')
                }
        }).then(()=>{
            window.sessionStorage.removeItem('ctrack-pos-lat')
            window.sessionStorage.removeItem('ctrack-pos-long')
            location.replace('../login')
        })
    })
    }
}