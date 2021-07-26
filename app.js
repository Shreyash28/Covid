const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {

    const url = "https://api.covid19india.org/data.json";
    https.get(url, function(response) {
        console.log(res.statusCode);
        response.on("data", function(data) {
            console.log(data);
            // const liveCases = JSON.parse(data)
            // console.log(liveCases)
        })
    })
    res.render("livecases");
});



app.listen(3000, function() {
    console.log("server started");
});