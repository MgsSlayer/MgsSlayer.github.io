// document.getElementById("emailForm").addEventListener("submit", async (e) => {
//     e.preventDefault();
//   });

var express = require("express");
var path = require("path");
var http = require("http");
var nodemailer = require("nodemailer");

var log = console.log;
var app = express();
var server = http.Server(app);
var port = 5000;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname));
app.use("/assets", express.static(path.join(__dirname, "assets")));

//Routing
app.get("/", function(req, response){
    response.sendFile(path.join(__dirname, "index.html"));
})

app.post("/send_email", function(req, response){
    var subjectname = req.body.subject;
    var message = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'michael.oboho@gmail.com',
            pass: 'iuaqjmclwwfghnst'
        }
    });

    var mailOptions = {
        from: "michael.oboho@gmail.com",
        to: "esio.oboho@gmail.com",
        subject: subjectname,
        text: message 
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            log(error +" Occurred")
        } else{
            log("Message sent Successfully " + info.response)
        }
        response.redirect("/")
    })
})

//Start Web Server
server.listen(port, function(){
    log("Starting Sever on Port " + port)
})
