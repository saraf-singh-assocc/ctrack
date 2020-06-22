const express = require('express')
const app = express()
const router = express.Router()
const fs = require('fs')
const hbs = require('express-hbs')
const path = require('path')
const bodyParser = require('body-parser')
 
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/src/partials'
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname + '/src/'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

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
app.get('/login', (request, res) =>{
  res.render('login/login',{none:null})
})
console.log("> App is running on http://localhost:8000/");
app.listen(8000)
/* Port:            8000
   Full website:    http://localhost:8000/
   Network:         http://127.0.0.1:8000/
*/