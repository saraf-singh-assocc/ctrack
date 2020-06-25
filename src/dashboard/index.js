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

let __showChart = (idName)=>{
    $('.charts-line').css('display','none')
    $(`#${idName}`).css('display','block')
    document.getElementById('dropdownId').innerHTML='Total new cases';
}

let addChart = ()=>{
    let cdataWorld = {}
    let cdataSelf = {}
    fetch('https://api.covid19api.com/summary').then(response=>{
        if(response.status != 200){
            console.log("Error occurred: "+response.status);
            /* Error has occurred, display data from last visit and tell the user he/she is offline */
            document.getElementById('__cstat').innerHTML+="(Offline)";
            $('#__newCasesConfirmed').html(localStorage.getItem('__NC') + "(Data from last visit)");
            $('#__NewDeaths').html(localStorage.getItem('__ND') + "(Data from last visit)");
            $("#__totalCases").html(localStorage.getItem('__TC') + "(Data from last visit)");
            $("#__totalDeaths").html(localStorage.getItem('__TD') + "(Data from last visit)");
            return;
        }
        response.json().then(data=>{
            console.log(data)
            console.log(data['Global'])
            console.log(data['Countries']);
            let selfDataTD = {};
            let selfDataTR = {};
            let selfDataTC = {};
            let selfDataTNC = {};
            let globalTD = data['Global']['TotalDeaths'];
            for(x in data['Countries']){
                if((data['Countries'][x]['Country']) == localStorage.getItem('__CTRACK_USER_COUNTRY__')){
                    selfDataTD[data['Countries'][x]['Country']] = data['Countries'][x]['TotalDeaths']
                    selfDataTR[data['Countries'][x]['Country']] = data['Countries'][x]['TotalRecovered']
                    selfDataTC[data['Countries'][x]['Country']] = data['Countries'][x]['TotalConfirmed']
                    selfDataTNC[data['Countries'][x]['Country']] = data['Countries'][x]['NewConfirmed']
                }
            }
        })
    })
}
let __createMaps = ()=>{
    firebase.firestore().collection('user_locations').doc(localStorage.getItem('__CTRACK_USER_EMAIL__')).get().then(qs=>{
        navigator.geolocation.getCurrentPosition(pos=>{
            lat = pos.coords.latitude
            long = pos.coords.longitude
            mapboxgl.accessToken = 'pk.eyJ1Ijoic2hyZWhhbnJhanNpbmdoIiwiYSI6ImNrYnVhZjdobTBpMzEzNW42ZWoxYzY5amUifQ.bKQ76HBwi_Df9Go7AuAcSQ';
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
            zoom:18,
            center:[pos.coords.longitude,pos.coords.latitude]
        });
        map.on('load', function() {
            map.addSource('points', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
            'features': [
            {
                // feature for Mapbox DC
            'type': 'Feature',
            'geometry': {
            'type': 'Point',
            'coordinates': [
                pos.coords.longitude,
                pos.coords.latitude
            ]
        },
        'properties': {
            'title': 'Mapbox DC',
            'icon': 'monument'
        }
    },
    {
            // feature for Mapbox SF
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': [-122.414, 37.776]
            },
            'properties': {
                'title': 'Mapbox SF',
            'icon': 'harbor'
        }
    }
            ]
        }
            });
            map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
                // get the icon name from the source's "icon" property
                // concatenate the name to get an icon from the style's sprite sheet
                'icon-image': ['concat', ['get', 'icon'], '-15'],
                // get the title name from the source's "title" property
            'text-field': ['get', 'title'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top'
        }
    });
});
})
})
}

function init(){
    var myLatLng = {lat: -25.363, lng: 131.044};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });

}

let __addDataSelf = ()=>{
    let selfDataOfMonths = [];
    fetch(`https://api.covid19api.com/country/${localStorage.getItem('__CTRACK_USER_COUNTRY__')}/status/confirmed/live`).then(res=>{
        if(res.status != 200){
            return;
        }
        let jan = 0, feb = 0, mar = 0, apr = 0, may = 0, june = 0, july = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;
        res.json().then(data=>{
            data.map(doc=>{
                // console.log(doc['Cases'])
                if(doc['Date'].split('-')[1] == '01'){
                    // January
                    jan+=doc['Cases']
                }
                else if(doc['Date'].split('-')[1] == '02'){
                    // February
                    feb+=parseInt(doc['Cases'])
                }
                else if(doc['Date'].split('-')[1] == '03'){
                    // March
                    mar+=parseInt(doc['Cases'])
                }
                else if(doc['Date'].split('-')[1] == '04'){
                    // April
                    apr+=parseInt(doc['Cases'])
                }
                else if(doc['Date'].split('-')[1] == '05'){
                    // May
                    may+=parseInt(doc['Cases'])
                }
                else if(doc['Date'].split('-')[1] == '06'){
                    // June
                    june+=parseInt(doc['Cases'])
                }
                else if(doc['Date'].split('-')[1] == '07'){
                    // July
                    july+=parseInt(doc['Cases'])
                }
                else if(doc['Date'].split('-')[1] == '08'){
                    // August
                    aug+=parseInt(doc['Cases'])
                }
                else if(doc['Date'].split('-')[1] == '09'){
                    // September
                    sep+=parseInt(doc['Cases'])
                }
                else if(doc['Date'].split('-')[1] == '10'){
                    // October
                    oct+=parseInt(doc['Cases'])
                }
                else if(doc['Date'].split('-')[1] == '11'){
                    // November
                    nov+=parseInt(doc['Cases'])
                }
                else if(doc['Date'].split('-')[1] == '12'){
                    // December
                    dec+=parseInt(doc['Cases'])
                }
            })
                zingchart.render({
                    id: 'selfChart1',
                    data: 
                    {
                        type: "area",
                        "plotarea": {
                            "margin-left": "8%"
                        },
                        "title":{  
                            "text":`${localStorage.getItem('__CTRACK_USER_COUNTRY__')}\'s Corona Analysis`  
                        },
                        "scale-x":{  
                            "values":["January","February","March","April","May",  
                                "June","July","August","September",  
                                "October","November","December"],  
                        },
                        series: [
                        { values: [jan,feb,mar,apr,may,june,july,aug,sep,oct,nov,dec]}
                        ]
                    },
                    height: '100%',
                    width: '100%'
                });
            })
        })
    })
}