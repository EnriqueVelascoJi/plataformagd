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


app.get('/procedure/glosary', async function(req, res) {
  const query = 'SELECT * FROM glosary order by id';
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

app.get('/procedure/glosary/:id', async function(req, res) {
    
    const id = req.params.id;

    const query = 'SELECT * FROM glosary where idproject=$1 order by id';
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


app.post('/procedure/glosary', async function(req, res) {
  
  const {glosary, userId, idProject} = req.body
    
  let data = ''
  const status = 3
  for(let i = 0; i < glosary.length; i++) {
      const term = glosary[i]
      data += `('${term.term}','${term.definition}','${term.abbreviattions}','${term.synonym}','${term.example}','${term.region}','${term.area}','${term.domain}','${term.subdomain}','${term.owner}','${term.status}','${term.creationDate}','${term.updateDate}','${term.documentationResponsible}','${term.updateResponsible}','${term.comment}',${idProject},'${status}'),`
  }
  
  const queryGlosary = `INSERT INTO glosary(term,definition,abbreviattions,synonym,example,region,area,domain,subdomain,owner,status,creationdate,updatedate,documentationresponsible,updateresponsible,comment,idproject,idstatus) values${data}`;
  const parseQueryGlosary = queryGlosary.substring(0, queryGlosary.length - 1);
  const responseGlosary = await pool.query(parseQueryGlosary);


  //Notificaction
  const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';
  const responseNotification = await pool.query(queryNotification, [
      userId,
      17,
      idProject,
      'glosary'


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

app.put('/procedure/glosary/:id', async function(req, res) {
  const idProject = req.params.id;
  const {glosary, userId} = req.body
    
  //Delete
  const queryDelete = 'DELETE FROM glosary where idproject=$1'
  // Create
  const responseDelete = await pool.query(queryDelete, [
      idProject
  ]);
  //Update
  const status = 3
  let data = ''
  for(let i = 0; i < glosary.length; i++) {
      const term = glosary[i]
      data += `('${term.term}','${term.definition}','${term.abbreviattions}','${term.synonym}','${term.example}','${term.region}','${term.area}','${term.domain}','${term.subdomain}','${term.owner}','${term.status}','${term.creationDate}','${term.updateDate}','${term.documentationResponsible}','${term.updateResponsible}','${term.comment}',${idProject},${status}),`
  }
  
  const queryGlosary = `INSERT INTO glosary(term,definition,abbreviattions,synonym,example,region,area,domain,subdomain,owner,status,creationdate,updatedate,documentationresponsible,updateresponsible,comment,idproject,idstatus) values${data}`;
  const parseQueryGlosary = queryGlosary.substring(0, queryGlosary.length - 1);
  const responseGlosary = await pool.query(parseQueryGlosary);

  //Notificaction
  const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';
  const responseNotification = await pool.query(queryNotification, [
      userId,
      17,
      idProject,
      'glosaryUpdated'


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



app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
