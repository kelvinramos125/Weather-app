const request = require("request")
const express = require("express")
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config()

let apiKey = process.env.APIKEY

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index');
})

app.post('/', (req, res)=>{
    let city = req.body.city
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url, (err, response, body) =>{
        if(err){
            res.sender('index', {weather : null, error : 'Error please try again'})
        }
        else{
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.sender('index', {weather : null, error : 'Error please try again'})
            }
            else{
                let weatherText = `Its ${weather.main.temp} degrees ouside in ${weather.name}`
                res.render('index', {weather : weatherText, err : null})
            }
        }
    })
})
// request(url, function(err, response, body){
//     if(err){
//         console.log("error:", err)
//     }
//     else {
//         // console.log("body:", body)

//         let weather = JSON.parse(body)

//         let message = `It is ${weather.main.temp} degrees ouside in ${weather.name}`
    
//         console.log(message)
//     }
// })

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`This server is runing on ${port}`)
})