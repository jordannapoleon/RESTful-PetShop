const express = require('express');                                                    //Requests Express Module import express from 'express;
const { Client } = require('pg');                                                      //Request postgres and grabs the objects.
const config = require('./config.json')[process.env.NODE_ENV || "dev"];
const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/petstoredb';     //Connects to database
const client = new Client({connectionString: connectionString});                       //Uses connected database to connect to a client.
client.connect();                                                                      //Uses connects app.js to postgres database client
const app = express();                                                                 //Assigns Express variable
const PORT = 5050;                                                                     //Assigns Port
app.use(express.json());                                                               //Parses the "body" into a JSON object that can be used


//GETS
app.get('/', (req, res) =>{
    res.send('Hello World, Welcome to the PetShop');
});
app.get('/api/pets', (req, res) => {

    client.query('SELECT * FROM petstore ORDER BY pet_id ASC')
    .then(result => {
        console.log(result.rows)
        res.send(result.rows);
    })
    .catch(e => console.error(e.stack))

});
app.get('/api/pets/:pet_id', (req, res) => {
    let id = req.params.pet_id;
    client.query(`SELECT * FROM petstore WHERE pet_id=${id} ORDER BY pet_id ASC`)
    .then(result => {
        console.log(result.rows)
        res.send(result.rows);
    })
    .catch(e => console.error(e.stack))
});



//POSTS
app.post('/api/pets', (req, res) => {

    //check post request for uniqueness
    
        client.query(`INSERT INTO petstore (name, kind, age) VALUES ('${req.body.name}','${req.body.kind}',${req.body.age})`)
        .then((result) => {
            console.log("added pet")
            res.send(result.rows);
        })
        .catch((e) => console.log(e.stack));
});


//PATCHES
app.patch('/api/pets/:pet_id', (req, res)=>{
    var patchRequest = "SET";

    client.query(`SELECT * FROM petstore WHERE pet_id=${req.params.pet_id}`)
    .then((result) => {

        var checkedKey = [];
        for(let i = 0; i < result.fields.length; i++){
            checkedKey.push(result.fields[i].name);    
        }
        
        for(ele in req.body) {
            let key = ele;
            let value = req.body[key];
                if(checkedKey.includes(key) === false){
                    res.writeHead(400, {'Content-Type': 'text/plain'});
                    return res.end(`Bad Request ${key} is invalid`);
                } else if(typeof req.body[key] === 'number'){
                    patchRequest += ` ${key}=${value},`;
                } else {
                    patchRequest += ` ${key}='${value}',`;
                }
            
        }
            let finalQuery = patchReq.slice(0,-1);
        
                client.query(`UPDATE petstore ${finalQuery} WHERE pet_id=${req.params.pet_id}`)
                .then(() => {
                    res.writeHead(200, {'Content-Type': 'text/plain'})
                    res.end(`You've successfully ${finalQuery}`);
                })
                .catch((e) => console.log(e.stack));

    })
    .catch((e) => console.error(e.stack));

})


//DELETE
app.delete('/api/pets/:pet_id', (req,res) =>{
    client.query(`DELETE FROM petstore WHERE pet_id=${req.params.pet_id}`)
    .then((result) =>{
        console.log('Pet deleted');
        res.send(result.rows);
    }).catch((e) => console.error(e.stack))
})




//Server Ons
app.listen(PORT, (err) => {

    if(err){console.log(err)}
    console.log('listening...', PORT) 

});