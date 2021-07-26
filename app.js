const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const app = express();


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {

    // const url = "https://api.rootnet.in/covid19-in/hospitals/beds";
    // https.get(url, function(response) {
    //     console.log(res.statusCode);
    //     response.on("data", function(data) {
    //         console.log(JSON.parse(data));

    //     })
    // })
    var axios = require("axios").default;

    var options = {
        method: 'GET',
        url: 'https://corona-virus-world-and-india-data.p.rapidapi.com/api_india',
        headers: {
            'x-rapidapi-key': '0996084accmsh8af2dae1d07d60ep1bb034jsnaabce7f43771',
            'x-rapidapi-host': 'corona-virus-world-and-india-data.p.rapidapi.com'
        }
    };

    axios.request(options).then(function(response) {

        var CCase = response.data.total_values.confirmed;
        var ACase = response.data.total_values.active
        var DCase = response.data.total_values.deaths
        var RCase = response.data.total_values.recovered

        res.render("livecases", { Confirmed: CCase, Active: ACase, Deceased: DCase, Recovered: RCase });
    }).catch(function(error) {
        console.error(error);
    });
});



app.listen(3000, function() {
    console.log("server started");
});