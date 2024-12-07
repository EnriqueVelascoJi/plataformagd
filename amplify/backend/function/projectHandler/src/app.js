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


app.get('/project/:id', async function(req, res) {
  const id = req.params.id;


  const queryProject = `select *,p.id idproject from project p  
                          inner join usuariogd u on p.idusuario = u.id 
                          WHERE p.id=$1 order by p.id`
  const responseProject = await pool.query(queryProject, [id]);
  const queryParticipants = `select * from project p
                              inner join participant pa on p.id = pa.idproject
                              WHERE p.id=$1 order by p.id`
  const responseParticipants = await pool.query(queryParticipants, [id]);
  
  const response = {
      projectInformation: responseProject.rows,
      participants: responseParticipants.rows
  }
  res
  .status(201)
  .json({
    status: "success",
    msg: "Recording sucessfully",
    data: response
  })
  .end()
});
app.get('/project/projects/:id', async function(req, res) {
  const id = req.params.id;

    const query = 'select *,p.id idproject from project p  inner join usuariogd u  on p.idusuario = u.id WHERE p.idusuario=$1 order by p.id';
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

app.post('/project', async function(req, res) {
  const projectInformation = req.body
  const {personalInformation, context, participants} = projectInformation
  const {
      projectName,
      projectDescription ,
      projectScopeDescription,
      projectObjective,
      region,
      startDate,
      finalDate,
      informationUse,
      deliverables,
      aditionalInformation,
      userId 
  } = context 

       try {
        const queryProject = 'INSERT INTO project(projectname,projectdescription,projectscopedescription,projectobjective,region,startdate,finaldate,informationuse,deliverables,aditionalinformation,idusuario,idstatus) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id;';

        const responseProject = await pool.query(queryProject, [
            projectName,
            projectDescription ,
            projectScopeDescription,
            projectObjective,
            region,
            startDate,
            finalDate,
            informationUse,
            deliverables,
            aditionalInformation,
            userId,
            2
        ]);


        //Notificaction
        const idProject = responseProject.rows[0].id;
        const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';
        const responseNotification = await pool.query(queryNotification, [
            userId,
            17,
            idProject,
            'project'


        ]);
            
        //Participants
        let data = ''
        for(let i = 0; i < participants.length; i++) {
            const participant = participants[i]
            data += `('${participant.name}','${participant.surname}','${participant.email}','${participant.position}','${participant.area}',${participant.rol},${idProject}),`
        }
        
        const queryParticipant = `INSERT INTO participant(name,surname,email,position,area,rol,idproject) values${data}`;
        const parseQueryParticipant = queryParticipant.substring(0, queryParticipant.length - 1);
        const responseParticipant = await pool.query(parseQueryParticipant);

        res
        .status(201)
        .json({
        status: "success",
        msg: "Recording sucessfully",
        data: req.body
        })
        .end()
       } catch (error) {
        console.log(error)
       }
     
});

app.put('/project/:id', async function(req, res) {
  const projectInformation = req.body
  const idProject = req.params.id;
  const {personalInformation, context, participants} = projectInformation
  const {
      projectName,
      projectDescription ,
      projectScopeDescription,
      projectObjective,
      region,
      startDate,
      finalDate,
      informationUse,
      deliverables,
      aditionalInformation,
      userId 
  } = context 

  const queryProject = 'UPDATE project SET projectname=$1,projectdescription=$2,projectscopedescription=$3,projectobjective=$4,region=$5,startdate=$6,finaldate=$7,informationuse=$8,deliverables=$9,aditionalinformation=$10,idusuario=$11,idstatus=$12 WHERE id=$13;';

  const responseProject = await pool.query(queryProject, [
      projectName,
      projectDescription ,
      projectScopeDescription,
      projectObjective,
      region,
      startDate,
      finalDate,
      informationUse,
      deliverables,
      aditionalInformation,
      userId,
      2,
      idProject
  ]);
  //Notificaction
  const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';
  const responseNotification = await pool.query(queryNotification, [
      userId,
      17,
      idProject,
      'projectUpdated'


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

app.put('/project/helper/status', async function(req, res) {
   
  const {
    idNotification,
    idProject,
    idUserSend,
    idUserReceiver,
    flag,
    rejected
} = req.body


    if(flag === 'accepted') {
        const queryProject = 'UPDATE project SET isprojectaccepted=$1, idstatus=$2 WHERE id=$3;';
        const response = await pool.query(queryProject, [
            true,
            4,
            idProject
        ]);

        const queryUpdateNotification = 'UPDATE notificationgd SET isactive=$1, isanswered=$2 WHERE id=$3 ';

        // Create
        const responseUpdateNotification = await pool.query(queryUpdateNotification, [
            false,
            true,
            idNotification,



        ]);

        const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';

        // Create
        const responseNotification = await pool.query(queryNotification, [
            idUserSend,
            idUserReceiver,
            idProject,
            'projectAccepted'


        ]);
        res
        .status(201)
        .json({
        status: "success",
        msg: "Recording sucessfully",
        data: req.body
        })
        .end()
    } 
    if(flag === 'rejected') {
        const queryProject = 'UPDATE project SET isprojectaccepted=$1, idstatus=$2, rejected=$3 WHERE id=$4;';
        const response = await pool.query(queryProject, [
            false,
            5,
            rejected,
            idProject
        ]);

        const queryUpdateNotification = 'UPDATE notificationgd SET isactive=$1, isanswered=$2 WHERE id=$3 ';
        const responseUpdateNotification = await pool.query(queryUpdateNotification, [
            false,
            true,
            idNotification
        ]);

        const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';
        const responseNotification = await pool.query(queryNotification, [
            idUserSend,
            idUserReceiver,
            idProject,
            'projectRejected'
        ]);
        res
        .status(201)
        .json({
        status: "success",
        msg: "Recording sucessfully",
        data: req.body
        })
        .end()
    }

    if(flag === 'view') {
       
        const queryUpdateNotification = 'UPDATE notificationgd SET isactive=$1, isanswered=$2 WHERE id=$3 ';

        // Create
        const responseUpdateNotification = await pool.query(queryUpdateNotification, [
            false,
            true,
            idNotification,
        ]);
        res
        .status(201)
        .json({
        status: "success",
        msg: "Recording sucessfully",
        data: req.body
        })
        .end()
    }
    if(flag === 'glosaryAccepted') {
        const queryProject = 'UPDATE glosary SET isaccepted=$1, idstatus=$2 WHERE idproject=$3;';
        const response = await pool.query(queryProject, [
            true,
            4,
            idProject
        ]);

        const queryUpdateNotification = 'UPDATE notificationgd SET isactive=$1, isanswered=$2 WHERE id=$3 ';

        // Create
        const responseUpdateNotification = await pool.query(queryUpdateNotification, [
            false,
            true,
            idNotification,



        ]);

        const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';

        // Create
        const responseNotification = await pool.query(queryNotification, [
            idUserSend,
            idUserReceiver,
            idProject,
            'glosaryAccepted'


        ]);
        res
        .status(201)
        .json({
        status: "success",
        msg: "Recording sucessfully",
        data: req.body
        })
        .end()
    } 
    if(flag === 'glosaryRejected') {
        const queryProject = 'UPDATE glosary SET isaccepted=$1, idstatus=$2, rejected=$3 WHERE idproject=$4;';
        const response = await pool.query(queryProject, [
            false,
            5,
            rejected,
            idProject
        ]);

        const queryUpdateNotification = 'UPDATE notificationgd SET isactive=$1, isanswered=$2 WHERE id=$3 ';
        const responseUpdateNotification = await pool.query(queryUpdateNotification, [
            false,
            true,
            idNotification
        ]);

        const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';
        const responseNotification = await pool.query(queryNotification, [
            idUserSend,
            idUserReceiver,
            idProject,
            'glosaryRejected'
        ]);
        res
        .status(201)
        .json({
        status: "success",
        msg: "Recording sucessfully",
        data: req.body
        })
        .end()
    }
});


app.listen(3000, function() {
  console.log("App started")
});


module.exports = app
