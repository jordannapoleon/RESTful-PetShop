const express = require('express');                                                    //Requests Express Module
const { Client } = require('pg');                                                      //Request postgres and grabs the objects.
const config = require('./config.json')[process.env.NODE_ENV || "dev"];
const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/petstoredb';     //Connects to database
const client = new Client({connectionString: connectionString,});                      //Uses connected database to connect to a client.
client.connect();                                                                      //Uses connects app.js to postgres database client
const app = express();                                                                 //Assigns Express variable
const PORT = 5050;                                                                     //Assigns Port

app.get('/', (req,res) =>{
    res.send('Hello World, Welcome to the PetShop');
});

app.get('/api/petstore', (req, res) => {
    client.query('SELECT * FROM petstore ORDER BY pet_id ASC')
    .then(result => {
        console.log(result.rows[0])
        res.send(result.rows);
    })
    .catch(e => console.error(e.stack))
});

app.post('api/petstore/:', (req,res) => {
    
});






//Server On
app.listen(PORT, (err) => {

    if(err){console.log(err)}
    console.log('listening...', PORT) 

});