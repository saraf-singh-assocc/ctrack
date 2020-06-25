const express = require('express')
const app = express()
const router = express.Router()
const fs = require('fs')
const hbs = require('express-hbs')
const path = require('path')
const bodyParser = require('body-parser')
const admin = require('firebase-admin')
const accKey = require('./src/resources/serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(accKey),
  databaseURL: "https://corona-index-db.firebaseio.com"
})

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/src/partials'
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname + '/src/'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post('/newCommunityRequest',(req,res)=>{
  admin.firestore().collection('user_locations').get().then(qs=>{
      admin.firestore().collection('user_communities').add({
        community_name:req.body.comm_name,
        followers:[],
        members:admin.firestore.FieldValue.arrayUnion(req.body.comm_user),
        owner_email:req.body.comm_user,
        owner_name:"Free Account",
        community_info:req.body.comm_info,
        user_posts:[]
      }).then(()=>{
        res.end('Access granted')
      }).catch(()=>{
        res.end('Access denied. Failed to make community')
      })
    }).catch(err=>{
      res.end(`[ERROR]:${err.message}`)
    })
})
app.get('/',(req,res)=>{
  res.render('index/index',{none:null})
})
app.get('/about_us',(req,res)=>{
  res.render('about_us/about-us'),{none:null}
})
app.get('/dashboard',(req,res)=>{
  res.render('dashboard/dashboard'),{none:null}
})
app.get('/signup',(req,res)=>{
  res.render('signup/signup'),{none:null}
})
app.get('/community_page/:uid',(req,res)=>{
  res.render('community_page/community_of_users',{comm_id:req.params.uid})
})
app.get('/community_page',(req,res)=>{
  res.render('community_page/community-page',{none:null})
})
app.get('/images/:loc/:fname',(req,res)=>{
  res.sendFile(path.join(__dirname+'/src/'+req.params.loc+'/'+req.params.fname))
})
app.get('/index-homepage', (request, res) =>{
  res.render('index-homepage/gmaps',{none:null})
})
app.get('/contact_us', (request, res) =>{
  res.render('contact_us/contact-us',{none:null})
})
app.get('/google_maps', (request, res) =>{
  res.render('google_maps/indexMaps',{none:null})
})
app.get('/login/:et', (request, res) =>{
  res.render('login/loginPH',{none:null})
})
app.get('/login', (request, res) =>{
  res.render('login/login',{none:null})
})
app.get('/community_new', (request, res) =>{
  res.render('community_new/index',{none:null})
})
console.log("> App is running on http://localhost:8000/");
app.listen(8000)
/* Port:            8000
   Full website:    http://localhost:8000/
   Network:         http://127.0.0.1:8000/
*/