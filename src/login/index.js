auth.useDeviceLanguage()

auth.onAuthStateChanged(user=>{
if(user){
    location.replace('../dashboard')
}
})

let __userLogin = (em,pass)=>{
    auth.signInWithEmailAndPassword(em, pass).catch(err=>{
        alert(`${err.code}=>${err.message}`)
    }).then(()=>{
        location.replace('../dashboard')
    })
}