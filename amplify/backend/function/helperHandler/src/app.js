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

app.get('/helper/notifications/:id', async function(req, res) {
  const id = req.params.id;
  const query = `SELECT usgd.id iduser, ngd.id idnotification,* FROM  notificationgd ngd
inner join usuariogd usgd on ngd.idusersend = usgd.id
  WHERE ngd.iduserreceiver=$1 AND ngd.isactive=TRUE `;
  
  const response = await pool.query(query, [id]);
  
  res
  .status(201)
  .json({
    status: "success",
    msg: "Recording sucessfully",
    data: response.rows
  })
  .end()
});
app.get('/helper/complete/:id', async function(req, res) {
  const id = req.params.id;
  const complete = {
      glosary: false
  }

  const query = 'select isaccepted from glosary where idproject=$1';
  const response = await pool.query(query, [id]);
  const glosary = response.rows[0].isaccepted
  if(glosary) complete['glosary'] = true
  
  res
  .status(201)
  .json({
    status: "success",
    msg: "Recording sucessfully",
    data: complete
  })
  .end()
});
app.get('/helper/status/:id', async function(req, res) {
  const id = req.params.id;
  const complete = {
      glosary: {}
  }

  const query = 'select idstatus, statusname from glosary gl inner join statusgd st on gl.idstatus = st.id where gl.idproject=$1';
  const response = await pool.query(query, [id]);
  const glosary = response.rows[0]
  complete['glosary'] = glosary
  
  res
  .status(201)
  .json({
    status: "success",
    msg: "Recording sucessfully",
    data: complete
  })
  .end()
});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
