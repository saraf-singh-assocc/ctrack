$(document).ready(()=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            // Save user details in the local database
            window.localStorage.setItem('__CTRACK_USER_EMAIL__',user.email)
        }
    });
});