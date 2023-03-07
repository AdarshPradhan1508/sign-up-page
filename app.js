//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(res,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  
    const firstName =req.body.fname;
    const lastName =req.body.lname;
    const email =req.body.email;
    // console.log(firstName , lastName , email);
    const data ={
        members: [

            {
                email_address: email,
                status: "subscribed",
                merge_fields: { 
                 FNAME: firstName,
                 LNAME :lastName   
                }
            }
        ]
    };
   const jsonData = JSON.stringify(data);
 const url = "https://us17.api.mailchimp.com/3.0/lists/1857c793db";


 const options ={
    method:"POST",
    auth: "noob1:afb468f25b661c1b71f9b09850466fbcc-us17"

 }

     const request = https.request(url, options, function(response){

      if(response.statusCode === 200)  {
        // res.send("Successfully Subscribed!");
        res.sendFile(__dirname +"/success.html");
      } else{
        // res.send("There was an error with signing up, please try again!");
        res.sendFile(__dirname+"/failure.html");
      }

 response.on("data",function(data){
    console.log(JSON.parse(data));
 })
     })
     request.write(jsonData);
     request.end();
});

//failure route post request

app.post("/failure", function(req, res){
res.redirect("/");
});
app.listen(3000,function() {
    console.log("server is running on port 3000");
});




//api key
//fb468f25b661c1b71f9b09850466fbcc-us17
//list id
//1857c793db