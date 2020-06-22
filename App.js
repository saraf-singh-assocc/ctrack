const express = require('express')
const app = express()
const fs = require('fs')
const hbs = require('express-hbs')
const path = require('path')
 
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/src/partials'
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname + '/src/'))

app.get('/',(req,res)=>{
    res.render('index/index',{none:null})
})

app.get('/about_us',(req,res)=>{
  res.render('about_us/about-us.hbs'),{none:null}
})

app.get('/community_page',(req,res)=>{
  res.render('community_page/community-page.hbs',{none:null})
})

app.get('/images/:loc/:fname',(req,res)=>{
  res.sendFile(path.join(__dirname+'/src/'+req.params.loc+'/'+req.params.fname))
})
app.get('/index-homepage', (request, response) =>{
  response.render('/index-homepage/gmaps.hbs',{none:null})
})
app.get('about_us', (request, response) =>{
  response.render('about_us/about-us.hbs',{none:null})
})
app.get('/community_page', (request, response) =>{
  response.render('/community_page/community-page.hbs',{none:null})
})
app.get('/contact_us', (request, response) =>{
  response.render('/contact_us/contact-us.hbs',{none:null})
})
app.get('/login', (request, response) =>{
  response.render('/login/login.hbs',{none:null})
})
console.log("> App is running on http://localhost:8000/");
app.listen(8000)
/* Port:            8000
   Full website:    http://localhost:8000/
   Network:         http://127.0.0.1:8000/
*/