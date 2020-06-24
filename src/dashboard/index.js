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

$(document).ready(()=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            if(window.localStorage.getItem('__CTRACK_USER_EMAIL') == null && window.localStorage.getItem('__CTRACK_USER_EMAIL') == null){
                // Save user details in the local database
                window.localStorage.setItem('__CTRACK_USER_EMAIL__',user.email == null?user.phoneNumber:user.email)
                fetch('https://extreme-ip-lookup.com/json/')
                .then( res => res.json())
                .then(response => {
                    window.localStorage.setItem('__CTRACK_USER_COUNTRY__',response.country)
                    new JFormat({
                        uemail:localStorage.getItem('__CTRACK_USER_EMAIL__'),
                        ucountry:localStorage.getItem('__CTRACK_USER_COUNTRY__')
                    })
            })
            .catch((data, status) => {
                alert("Failed to retrieve country")
            })
            }
        }
        else{
            location.replace('../login')
        }
    })
    firebase.firestore().collection('user_communities').where('community_name','==','The Community').get().then(qs=>{
        let temp = [];
        qs.forEach(doc=>{
            temp.push(doc.data().members)
        });
        if(!(temp.includes(localStorage.getItem('__CTRACK_USER_EMAIL__')))){
            $('#__sponsor').css('display','none')
        }
    })
    firebase.firestore().collection('user_communities').where('owner_email',"==",localStorage.getItem('__CTRACK_USER_EMAIL__')).where('members','array-contains',localStorage.getItem('__CTRACK_USER_EMAIL__')).get().then(qs=>{
        if(qs.size == 0){
            $("#__selfCommunities").append(`
                <div class="col-xs-1">
                    <div class="card">
                    <div class="card-body">
                    <h3 class="card-title">You do not own any communities</h3>
                        <p class="card-text">You are not a member of any community</p>
                    </div>
                    </div>
                    </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
            `)
        }
        else{
            qs.forEach(doc=>{
                $("#__selfCommunities").append(`
                <div class="col-xs-1" onclick='__gotoCommunity("${doc.id}")'>
                    <div class="card">
                    <div class="card-body">
                    <h3 class="card-title">${doc.data().community_name}</h3>
                        <p class="card-text">${doc.data().followers.length} ${doc.data().followers.length == 1 ? 'follower':'followers'}</p>
                    </div>
                    </div>
                    </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
            `)
            })
        }
    })
    firebase.firestore().collection('user_communities').where('followers','array-contains',localStorage.getItem('__CTRACK_USER_EMAIL__')).get().then(qs=>{
        if(qs.size == 0){
            $("#communities_followed").append(`
                    <div class="col-xs-1" onclick='__gotoCommunity("${doc.id}")'>
                    <div class="card">
                    <div class="card-body">
                    <h3 class="card-title">You don't follow any communities</h3>
                        <p class="card-text">Go global to follow communities</p>
                    </div>
                    </div>
                    </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                `)
        }
        else{
            qs.forEach(doc=>{
                $("#communities_followed").append(`
                    <div class="col-xs-1" onclick='__gotoCommunity("${doc.id}")'>
                    <div class="card">
                    <div class="card-body">
                    <h3 class="card-title">${doc.data().community_name}</h3>
                        <p class="card-text">${doc.data().followers.length} ${doc.data().followers.length == 1 ? 'follower':'followers'}</p>
                    </div>
                    </div>
                    </div>
                &nbsp;&nbsp;&nbsp;&nbsp;
                `)
            })
        }
    })
});

class JFormat{
    constructor(obj){
        this.__obj = typeof(obj) == 'object'?obj:Error('Constructor is not an object');
        this.ftags();
    }
    ftags(){
        for (let index = 0; index < document.getElementsByTagName('jformat').length; index++) {
            const element = document.getElementsByTagName('jformat')[index];
            var tempWhole = element.innerHTML.split("{"+/.*/+"}")[0];
            var temp = (element.innerHTML.split("{"+/.*/+"}"))[0].substr(1,(element.innerHTML.split("{"+/.*/+"}"))[0].length-2)
            element.innerHTML = element.innerHTML.replace(tempWhole,element.innerHTML.replace(tempWhole,this.__obj[temp]))
        }
    }
}

let __gotoCommunity = (uid)=>{
    // ID of Official Community
    if(uid == "kbDNfFQzrqw3xGoKnNpF"){
        location.replace(`../community_page/`)
    }
    else{
        location.replace(`../community_page/${uid}`)
    }
}

let __logoutUser = ()=>{
    firebase.auth().signOut().then(function() {
        localStorage.removeItem('__CTRACK_USER_EMAIL__')
        localStorage.removeItem('__CTRACK_USER_COUNTRY__')
        location.replace('../index')
    }).catch(function(error) {
        alert('Couldn\'t sign out. Please try again later.')
        console.log(`${error.code}=>${error.message}`);
    });
}