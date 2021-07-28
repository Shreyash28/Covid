require('dotenv').config();
const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const app = express();



app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    var axios = require("axios").default;

    var options = {

        method: 'GET',
        url: 'https://corona-virus-world-and-india-data.p.rapidapi.com/api_india',
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': process.env.RAPID_API_HOST
        }
    };

    axios.request(options).then(function(response) {

        const statelist = response.data.state_wise;
        var CCase = response.data.total_values.confirmed;
        var ACase = response.data.total_values.active
        var DCase = response.data.total_values.deaths
        var RCase = response.data.total_values.recovered
        console.log(response.data.total_values.confirmed)

        var Case = []
        var ActiveCaseStateWise = []
        for (const property in statelist) {

            var states = `${property}`;
            Case.push(states)
        }
        console.log(Case)




        // res.render("livecases", {
        //     Confirmed: CCase,
        //     Active: ACase,
        //     Deceased: DCase,
        //     Recovered: RCase,
        //     Statelist: Case,
        //     ActiveCase: ActiveCaseStateWise

        // });


    });




})


//  res.send(Case);
// Case.forEach(function(states) {
//     console.log(statelist.states)

// });






app.listen(3000, function() {
    console.log("server started");
});