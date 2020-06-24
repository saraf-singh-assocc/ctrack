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

let __init__ = (id)=>{
    firebase.firestore().collection('user_communities').doc(id).get().then(qs=>{
        $(".community_name").text(qs.data().community_name)
        $("#community_runners").text(`Run by ${qs.data().members.length} `+(qs.data().members.length == 1 ? "person":"people"))
        $("#community_info").text(qs.data().community_info)
        $("#comm-followers").text(`${qs.data().followers.length} `+(qs.data().followers.length == 1 ? "follower":"followers"))
    })
}

let __addFollower = (id)=>{
    firebase.firestore().collection('user_communities').doc(id).update({
        followers:firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('__CTRACK_USER_EMAIL__'))
    }).then(()=>{
        alert(`Follow request successful`)
    })
}