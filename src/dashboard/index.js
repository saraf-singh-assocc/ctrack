$(document).ready(()=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            // Save user details in the local database
            window.localStorage.setItem('__CTRACK_USER_EMAIL__',user.email)
            // $(".__top_name").text(window.localStorage.getItem('__CTRACK_USER_EMAIL__'))
        }
        else{
            location.replace('../login')
        }
    });
    
    new JFormat({
        uemail:localStorage.getItem('__CTRACK_USER_EMAIL__'),
        ucountry:localStorage.getItem('__CTRACK_USER_COUNTRY__')
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

let __getCountry = ()=>{
    fetch('https://extreme-ip-lookup.com/json/')
    .then( res => res.json())
    .then(response => {
        window.localStorage.setItem('__CTRACK_USER_COUNTRY__',response.country)
    })
    .catch((data, status) => {
        alert("Failed to retrieve country")
    })
}

let __fetchDataNewCasesOfSelf = ()=>{
    
}

let __logoutUser = ()=>{
    firebase.auth().signOut().then(function() {
        location.replace('../index')
    }).catch(function(error) {
        alert('Couldn\'t sign out. Please try again later.')
        console.log(`${error.code}=>${error.message}`);
        
    });
}

__getCountry()