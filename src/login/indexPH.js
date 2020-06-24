window.onload = ()=>{
    firebase.auth().onAuthStateChanged(function(user) { //or use firebase.auth().currentUser;
        if (user) {
            location.replace('../dashboard')
        } else {
            // No user is signed in.
        }
    });
    render()
}
let render = ()=>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-verify')
    recaptchaVerifier.render()
}
let __getLocation = ()=>{
    navigator.geolocation.getCurrentPosition((pos)=>{
        window.sessionStorage.setItem('ctrack-pos-lat',pos.coords.latitude)
        window.sessionStorage.setItem('ctrack-pos-long',pos.coords.longitude)
    })
}
let __sub = ()=>{
    var code = $('#__vcode').val()
    codeResult.confirm(code).then(res=>{
        firebase.firestore().collection('user_locations').doc($('#usern').val()).set({
            location:{
                lat:window.sessionStorage.getItem('ctrack-pos-lat'),
                long:window.sessionStorage.getItem('ctrack-pos-long')
            }
        }).then(()=>{
            location.replace("../dashboard")
        }).catch(err=>{
            alert(err.message)
        })
    }).catch(err=>{
        alert(err.message)
    })
}
let __vc = ()=>{
    firebase.auth().signInWithPhoneNumber($('#usern').val(),window.recaptchaVerifier).then((confirmation)=>{
        window.confirmationResult = confirmation
        codeResult = confirmationResult
        console.log(codeResult)
        alert("Message sent")
    }).catch(err=>{
        console.log(err)
    })
}