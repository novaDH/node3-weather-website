const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geolocation = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


// console.log(__dirname)
// console.log(path.join(__dirname,'../public '))

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectory = path.join(__dirname,'../templates/views')
const partialsDirectory = path.join(__dirname,'../templates/partials')

//setup handle bars ans view locations
app.set('view engine','hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name: 'a Wizard'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message:'This is the page where you can get help',
        title: 'help',
        name: 'a Wizard'
    })
})

// app.get('/help',(req,res)=>{
//     res.send([{
//         name: 'Andrew'},
//         {name: 'Sarah'}
//     ])
// })

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'a Wizard'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must enter an address'
        })
    }
    geolocation(req.query.address,(error,{latitude,longitude,location} ={})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                state: forecastData,
                location,
                address: req.query.address    
            }
            )
          })
    })

    
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must enter a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('error',{
        name: 'a Wizard',
        title: '404',
        error: 'Help article not found!'
    })
    // res.send('Help Page not found!')
})

app.get('*',(req,res)=>{
    res.render('error',{
        name: 'a Wizard',
        title: '404',
        error: 'Page not found!'
    })
    // res.send('404!')
})
//app.com
//app.com/help
//app.com/about

app.listen(port, ()=> {
    console.log('Server is up on port'+port)
})