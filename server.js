const express= require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const membersRoutes = require('./routes/members-routes');
const axios = require('axios');
const config = require('./config')
const app = express();

var upcoming = [];
var live = [];
var ids = [
    "UC1CfXB_kRs3C-zaeTG3oGyg",
    "UCD8HOxPs4Xvsm8H0ZxXGiBw",
    "UCQ0UDLQCjY0rmuxCDE38FGg",
    "UCFTLzh12_nrtzqBPsTCqenA",
    "UCdn5BQ06XqgXoAxIhbqw5Rg",
    "UCvzGlP9oQwU--Y0r9id_jnA",
    "UC1suqwovbL1kzsoaZgFZLKg",
    "UCXTpFs_3PqI41qX2d9tL2Rw",
    "UC7fk0CB07ly8oSl0aqKkqFg",
    "UC1opHUrw8rvnsadT-iGp7Cg",
    "UCp-5t9SrOQwXMU7iIjQfARg",
    "UCvaTdHTWBGv3MKj3KVqJVCw",
    "UChAnqc_AY5_I3Px5dig3X1Q",
    "UC1DCedRgGHBdm81E1llLhOQ",
    "UCl_gCybOJRIgOXw6Qb4qJzQ",
    "UCvInZx9h3jC2JzsIzoOebWg",
    "UCdyqAaZDKHXg4Ahi7VENThQ",
    "UCCzUftO8KOVkV4wQG1vkUvg",
    "UCqm3BQLlJfvkTsX_hvm0UmA",
    "UC1uv2Oq6kNxgATlCiez59hw",
    "UCS9uQI-jC3DE0L4IpXyvr6w",
    "UCZlDXzGoo7d44bwdNObFacg",
    "UCa9Y57gfeY0Zro_noHRVrnw"
        ]

//check if anything in items array
//find upcoming streams
setInterval(() => {
    console.log("Getting")
    ids.map(id => {
        axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&fields=items(id(videoId),snippet(title,thumbnails,publishedAt))&channelId='+id+'&eventType=upcoming&maxResults=1&type=video&key='+config.youtube.apiKey)
        .catch(err => {
            throw err;
        })
        .then(result => {
            if(result.data.items.length !== 0){
                upcoming.push({
                    videoId: result.data.items[0].id.videoId,
                    thumbnail: result.data.items[0].snippet.thumbnails.high.url,
                    title: result.data.items[0].snippet.title
                })
            }
        })
    })
}, 60 * 1000 * 60 * 24)

//initial call (i think)
ids.map(id => {
    axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&fields=items(id(videoId),snippet(title,thumbnails,publishedAt))&channelId='+id+'&eventType=upcoming&maxResults=1&type=video&key='+config.youtube.apiKey)
    .catch(err => {
        throw err;
    })
    .then(result => {
        if(result.data.items.length !== 0){
            upcoming.push({
                videoId: result.data.items[0].id.videoId,
                thumbnail: result.data.items[0].snippet.thumbnails.high.url,
                title: result.data.items[0].snippet.title
            })
        }
    })
})




app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/upcoming', (req,res)=> {
    res.send(upcoming)
})
/*app.get('/live', (req,res)=> {
    res.send(live)
})
app.use('/members', membersRoutes);

app.use('/getids', (req, res) => {
    res.send(ids)
})*/

//routes

app.use(express.static(path.join(__dirname, 'client/build')));


const port = process.env.PORT || 5000;

var server = app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = server;