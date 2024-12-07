const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const sessionPool = require('pg').Pool
const pool = new sessionPool({
    user: 'postgres',
    password: 't8kE36ZR^mPKLCaC',
    host: 'appmsn.cvofrq8gjce2.us-east-2.rds.amazonaws.com',
    port: '5432',
    database: 'postgres'
})


// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});



app.get('/user', async function(req, res) {

  const query = 'SELECT * FROM usuariogd order by id';
  const response = await pool.query(query);
  
  res
  .status(201)
  .json({
    status: "success",
    msg: "Recording sucessfully",
    data: response.rows
  })
  .end()
  
});

app.get('/user/:id', async function(req, res) {
  
  const id = req.params.id;
  const query = 'SELECT * FROM usuariogd WHERE id=$1';
  const response = await pool.query(query, [id]);

  
  res
  .status(201)
  .json({ 
    status: "success",
    msg: "Recording sucessfully",
    data: response.rows[0]
  })
  .end()
});

function newPassword () {
    
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 8;
  let password = "";

  for (let i = 0; i <= passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber +1);
     }
     return password
  }
app.post('/user', async function(req, res) {
  const {
      name,
      firstSurname,
      secondSurname,
      email,
      domain,
      subdomain,
      area,
      profile,
      isActive
    } = req.body 

    const query = 'INSERT INTO usuariogd(name,password,firstsurname,secondsurname,email,domain,subdomain,area,profile,isactive) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);';
        const password = newPassword()
        const response = await pool.query(query, [
            name,
            password, 
            firstSurname,
            secondSurname,
            email,
            domain,
            subdomain,
            area,
            profile,
            isActive
        ]);
            
        res
        .status(201)
        .json({
        status: "success",
        msg: "Recording sucessfully",
        data: req.body
        })
        .end()
});

app.put('/user/:id', async function(req, res) {

  const {
    name,
    firstSurname,
    secondSurname,
    email,
    domain,
    subdomain,
    area,
    profile,
    isActive
  } = req.body 

  const id = req.params.id;
  const query = 'UPDATE usuariogd SET name=$1, firstsurname=$2, secondsurname=$3, email=$4, domain=$5, subdomain=$6, area=$7, profile=$8, isactive=$9 WHERE id=$10;';
  const response = await pool.query(query, [
      name,
      firstSurname,
      secondSurname,
      email,
      domain,
      subdomain,
      area,
      profile,
      isActive,
      id
  ]);
      
  res
  .status(201)
  .json({
    status: "success",
    msg: "Recording sucessfully",
    data: req.body
  })
  .end()
});

app.delete('/user/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
