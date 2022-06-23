require("dotenv").config();
const express = require("express");

const https = require("https");
const fs  = require("fs");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendFile( __dirname + "/index.html");

});

app.post("/",function(req,res){

  const city = req.body.cityName;
  const appKey = process.env.APP_KEY;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +",india&appid=" +appKey+ "&units=" +unit;
  https.get(url,function(response){
//  console.log(response);

  response.on("data",function(data){ //'data' is an one of the event, if data is available in response then that callback function will called.
    const weather = JSON.parse(data);
    // console.log(weather);
    const temp = weather.main.temp; //Temprature
    const description  = weather.weather[0].description //description
    const icon = weather.weather[0].icon;//image
    const wind = weather.wind.speed * 3.6; //3.6 is converting wind speed from m/s to kmph.
    const url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"; 

    res.write("<h1>The Temprature in "+city+" is " +temp+ " Celcius </h1>");
    res.write("<img src=" +url+ ">");
    res.write("<h3> The Weather in "+city +" " +description+ "</h3>");
    res.write("<h4>The wind speed is " +wind+ " Kmph </h4>");
      });

    });
  });
  



app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
