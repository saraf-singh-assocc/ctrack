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

firebase.auth().onAuthStateChanged(function(user) { //or use firebase.auth().currentUser;
    if (user) {
        location.replace('../dashboard')
    }
});

// $(document).ready(()=>{
    // setTimeout(()=>{
    //    $('.main').css('display','none')
    //    $('.parent').css('display','block')
    // },15000)
// })

/* Get Corona Data */

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
        /* Store data from last fetch to show something
            if a problem occurs next time */
        localStorage.setItem("__ND",data['Global']['NewDeaths'])
        localStorage.setItem("__NC",data['Global']['NewConfirmed'])
        localStorage.setItem("__TD",data['Global']['TotalDeaths'])
        localStorage.setItem("__TC",data['Global']['TotalConfirmed'])
        $('#__newCasesConfirmed').html(data['Global']['NewConfirmed']);
        $('#__NewDeaths').html(data['Global']['NewDeaths']);
        $("#__totalCases").html(data['Global']['TotalConfirmed'])
        $("#__totalDeaths").html(data['Global']['TotalDeaths'])
    })
})
let __createDataOnChart = ()=>{
    let caDataTC = {};
    let caDataNC = {};
    let caDataTD = {};
    let caDataND = {};
    let caDataTR = {};
    let caDataNR = {};
    let reqCountries = ['China', 'India', 'United States of America', 'Indonesia', 'Pakistan', 'Brazil'];
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
        console.log(data['Countries']);
        for(x in data['Countries']){
            if(reqCountries.includes(data['Countries'][x]['Country'])){
                console.log(data['Countries'][x]['Country'] + "=>" + data['Countries'][x]['TotalConfirmed']);
                caDataTC[data['Countries'][x]['Country']] = data['Countries'][x]['TotalConfirmed'];
                caDataNC[data['Countries'][x]['Country']] = data['Countries'][x]['NewConfirmed'];
                caDataTD[data['Countries'][x]['Country']] = data['Countries'][x]['TotalDeaths'];
                caDataND[data['Countries'][x]['Country']] = data['Countries'][x]['NewDeaths'];
                caDataTR[data['Countries'][x]['Country']] = data['Countries'][x]['TotalRecovered'];
                caDataNR[data['Countries'][x]['Country']] = data['Countries'][x]['NewRecovered'];
                console.log(data['Countries'][x]['TotalDeaths'])
            }
        }
    }).then(data=>{
        // console.log(caData['India'])
        var ctx = document.getElementById('cdata_on_chart').getContext('2d');
        var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: reqCountries.map(doc=>doc+"("+caDataTC[doc]+")"),
            datasets: [{
                label: 'Total Cases in prominent countries',
                data: [parseInt(caDataTC['China']), parseInt(caDataTC['India']), parseInt(caDataTC['United States of America']), parseInt(caDataTC['Indonesia']), parseInt(caDataTC['Pakistan']), parseInt(caDataTC['Brazil'])],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    var ctx1 = document.getElementById('cdata_on_chart_nc').getContext('2d');
    var myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: reqCountries.map(doc=>doc+"("+caDataNC[doc]+")"),
        datasets: [{
            label: 'New Cases in prominent countries',
            data: [parseInt(caDataNC['China']), parseInt(caDataNC['India']), parseInt(caDataNC['United States of America']), parseInt(caDataNC['Indonesia']), parseInt(caDataNC['Pakistan']), parseInt(caDataNC['Brazil'])],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
    var ctx2 = document.getElementById('cdata_on_chart_td').getContext('2d');
    var myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: reqCountries.map(doc=>doc+"("+caDataTD[doc]+")"),
        datasets: [{
            label: 'Total Cases in prominent countries',
            data: [parseInt(caDataTD['China']), parseInt(caDataTD['India']), parseInt(caDataTD['United States of America']), parseInt(caDataTD['Indonesia']), parseInt(caDataTD['Pakistan']), parseInt(caDataTD['Brazil'])],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
    var ctx3 = document.getElementById('cdata_on_chart_nd').getContext('2d');
    var myChart3 = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: reqCountries.map(doc=>doc+"("+caDataND[doc]+")"),
        datasets: [{
            label: 'New Deaths in prominent countries',
            data: [parseInt(caDataND['China']), parseInt(caDataND['India']), parseInt(caDataND['United States of America']), parseInt(caDataND['Indonesia']), parseInt(caDataND['Pakistan']), parseInt(caDataND['Brazil'])],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
    var ctx4 = document.getElementById('cdata_on_chart_tr').getContext('2d');
    var myChart4 = new Chart(ctx4, {
    type: 'bar',
    data: {
        labels: reqCountries.map(doc=>doc+"("+caDataTR[doc]+")"),
        datasets: [{
            label: 'Total Recovered in prominent countries',
            data: [parseInt(caDataTR['China']), parseInt(caDataTR['India']), parseInt(caDataTR['United States of America']), parseInt(caDataTR['Indonesia']), parseInt(caDataTR['Pakistan']), parseInt(caDataTR['Brazil'])],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
    var ctx5 = document.getElementById('cdata_on_chart_nr').getContext('2d');
    var myChart5 = new Chart(ctx5, {
    type: 'bar',
    data: {
        labels: reqCountries.map(doc=>doc+"("+caDataNR[doc]+")"),
        datasets: [{
            label: 'New Recovered in prominent countries',
            data: [parseInt(caDataNR['China']), parseInt(caDataNR['India']), parseInt(caDataNR['United States of America']), parseInt(caDataNR['Indonesia']), parseInt(caDataNR['Pakistan']), parseInt(caDataNR['Brazil'])],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
    })
})
}