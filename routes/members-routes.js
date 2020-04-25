const router = require('express').Router();
const connection = require('../sqlConn');
const axios = require('axios');
const config = require('../config')


connection.connect((err)=>{
    if(err){
        res.send(err)
    } else {
        console.log("Connected");      
        /*req.body.map(member => {
        var quote = `INSERT INTO Members(memberName,kanjiName,youtubeId,profilePic) VALUES`+
        ``
        connection.query(``, (err, result, fields)=>{
            if(err) throw err;
        })
    })*/
    
    }
})
//get list of members
/*router.get('/', async (req, res) => {
    connection.connect((err)=>{
        if(err) throw err;
        console.log("Connected");
        connection.query(`SELECT * FROM Members`, (err, result, fields)=>{
            if(err) throw err;
            res.send(result)
        })

    var ids = ["UC5CwaMl1eIgY8h02uZw7u8A","UCQ0UDLQCjY0rmuxCDE38FGg","UCDqI2jOz0weumE8s7paEk6g"]
    var result = []
    const host = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCQ0UDLQCjY0rmuxCDE38FGg&eventType=upcoming&maxResults=1&type=video&key='+config.youtube.apiKey

    

    var someFunction = function(channelId){
        return new Promise(function(resolve, reject){
            var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+channelId+'&eventType=upcoming&maxResults=1&type=video&key'+config.youtube.apiKey;
            const response = axios.get(url);

            response
            .catch(err => {
                reject(err)
            })
            .then(result => {
                resolve(result.data)
            })
        })
    }
    

    ids.map(id => {
        someFunction(id)
        .then(bigData =>{
            result.push({
                videoId: bigData.items[0].id.videoId,
                thumbnail: bigData.items[0].snippet.thumbnails.high.url
            })
        })
    })
})
*/

router.post('/add', (req, res) => {
    var quote =`INSERT INTO Members(memberName, kanjiName, youtubeId, profilePic) VALUES `;
        req.body.members.map(member => {
            quote += `("${member.memberName}", "${member.kanjiName}", "${member.youtubeId}", "${member.profilePic}"),`
        })
        connection.query(quote.substring(0, quote.length-1)+';', (err, result, fields) => {
            if(err){
                res.send(err)
            } else {
                res.send("Success");
            }
    })
})




router.get('/', (req, res) => {
    console.log("Getting");
    connection.query(`SELECT * FROM Members;`, (err, result, fields) => {
        res.send(result);
    })
})

//test for checking if youtubeIds matched the users WAS GOOD
router.get('/youtubes', (req,res) => {
    console.log("Getting");
    connection.query(`SELECT memberName, youtubeId FROM Members;`, (err, result, fields) => {
        res.send(result);
    })
})





module.exports = router