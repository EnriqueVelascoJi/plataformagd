import * as React from 'react';
import { useState, useEffect } from 'react';

//MUI Components 
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//Icons
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PolicyIcon from '@mui/icons-material/Policy';
import ArticleIcon from '@mui/icons-material/Article';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';


//Assets
import logo from '../../src/assets/imgs/logo.png'
import zIndex from '@mui/material/styles/zIndex';

//Router
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { setNotificationInformation } from '../features/notificationSlice';

//API
import { get, put } from 'aws-amplify/api';


//Pages styles
const styles = {
  container: {
      minWidth: '350px',
      maxWidth: '550px',
      position: 'absolute',
      top: '10%',
      left: '20%',
      backgroundColor: '#D53638',
      padding: '30px',
      borderRadius: 5,
      zIndex: 10,
      color: '#fff'
      
  },
  titles: {
    fontWeight: 'bold'
  },
  list: {
    borderRadius: '10px',
    backgroundColor: '#fff',
    padding: 20,
    maxHeight: '500px',
    overflowY: 'scroll',
    overflowX: 'hidden',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)'

  },
  listIem: {
    backgroundColor: '#fff',
    margin: '10px'
  },
  time: {
    color: 'blue',
    cursor: 'pointer'
  }
}


export default function Notifications({open, setOpen, notifications}) {

  const dispatch = useDispatch()

    const vertical =  'top';
    const horizontal =  'right';
    const navigate = useNavigate()
    const notificationPath = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/project_status`

  
  //State
  const [openResponse, setOpenResponse] = React.useState(false);
  const [notification, setNotification] = useState({})
  const handleClickOpenResponse = () => {
    setOpenResponse(true);
  };

  const handleCloseResponse = () => {
    setOpenResponse(false);
  };
  

  //handles
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (value) => {
    if(value === 3) {
      navigate('/notificaciones')
    }
  };

  //Functions
  const updateNotification = async(notification) => {
    
    try {
      const {idnotification, idassociate, nameassociate, isanswered, isactive, idusersend, iduserreceiver} = notification
      const bodyNotification = {
        idNotification: idnotification,
        idProject: idassociate,
        idUserSend: iduserreceiver,
        idUserReceiver: idusersend,
        flag: 'view'
    }
      const restOperation = put({
        apiName: 'api31a79f36',
        path: '/project/helper/status' ,
        options: {
          body: bodyNotification
        }
      });

      const { body } = await restOperation.response;
      const {data} = await body.json();

    console.log(data)

    } catch (error) {
        console.log(error)
    }
    
}

const viewNotification = async (notification) => {
  const { nameassociate, idassociate } = notification
  let path = ''
  if(nameassociate === 'project' || nameassociate === 'projectUpdated') {
    path = `/aprobar-proyecto/${idassociate}`
  }
  if(nameassociate === 'projectAccepted') {
    path  = `/ruta-proyecto/${idassociate}?flag=projectAccepted`
    await updateNotification(notification)
  }
  if(nameassociate === 'projectRejected') {
    path  = `/proyecto/${idassociate}?flag=projecRejected`
    await updateNotification(notification)
  }
  if(nameassociate === 'glosary' || nameassociate === 'glosaryUpdated') {
    path = `/aprobar-glosario/${idassociate}`
  }
  if(nameassociate === 'glosaryAccepted') {
    path  = `/ruta-proyecto/${idassociate}?flag=glosaryAccepted`
    await updateNotification(notification)
  }
  if(nameassociate === 'glosaryRejected') {
    path  = `/ruta-proyecto/${idassociate}?flag=glosaryRejected`
    await updateNotification(notification)
  }
  dispatch(setNotificationInformation(notification))
  navigate(path)
}
const approveNotification = async () => {

  const {id, idassociate, nameassociate, isanswered, isactive, idusersend, iduserreceiver} = notification

  console.log(idassociate)

  await updateNotification(id, idassociate, nameassociate, isanswered, isactive, idusersend, iduserreceiver)
}


  return (
<>
    <React.Fragment>
      <Dialog
        open={openResponse}
        onClose={handleCloseResponse}
        
      >
        <DialogTitle>Aprobación de proyecto</DialogTitle>
        <DialogContent>
          <DialogContentText>
           El proyecto necesita aprobación
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Comentarios"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResponse}>Rechazar</Button>
          <Button onClick={approveNotification}>Aprobar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    <Box sx={{ width: 350 }}>
      <Snackbar
     
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        sx={{position: 'fixed'}}
        key={vertical + horizontal}
      >
        <List sx={{ width: 500, maxWidth: 400}} style={styles.list}>
          <Typography variant='h4' sx={{m: '10px 0', fontWeight: 'bold'}}>Notificaciones </Typography>
          
            <Stack direction="row" spacing={1} sx={{m: '20px 0'}} justifyContent={'space-evenly'}>
              <Chip label="Todas"  onClick={() => handleClick(1)} />
              <Chip label="Sin leer" variant="outlined" onClick={() => handleClick(2)} />
              <Chip label="Vista amplia" variant="outlined" onClick={() => handleClick(3)} />
            </Stack>

            {
              notifications.map(notification => (
                <div key={notification.idnotification}>
                  <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={notification.name} src={notification.name} />
              </ListItemAvatar>
              <ListItemText
                primary={`${notification.name} ${notification.firstsurname} ${notification.secondsurname} `}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'inline' }}
                    >
                      {/* {`Usuario con ID: ${notification.idusersend}`} */}
                    </Typography>
                    { notification.nameassociate === 'project' && (
                      'Un usuario esta solicitando la aprobación de inicio de gobierno'
                    )
                      
                    }
                    {
                      notification.nameassociate === 'projectAccepted' && (
                        'La Oficina de Gobierno de Datos ha aceptado tu solicitud, ahora puedes continuar con tus procedimeintos habilitados.'
                      )
                    }
                    {
                      notification.nameassociate === 'projectRejected' && (
                        'La Oficina de Gobierno de Datos ha rechazado tu solicitud. Da click en ver más para conocer el problema'
                      )
                    }
                    {
                      notification.nameassociate === 'projectUpdated' && (
                        'Un usuario esta solicitando una neva revisión del inicio de gobierno con los cambios solicitados'
                      )
                    }
                    {
                      notification.nameassociate === 'glosary' && (
                        'Un usuario esta solicitando la aprobación de Glosario de Términos'
                      )
                    }
                    {
                      notification.nameassociate === 'glosaryAccepted' && (
                        'La Oficina de Gobierno de Datos ha aceptado tu Glosario de Términos'
                      )
                    }
                    {
                      notification.nameassociate === 'glosaryRejected' && (
                        'La Oficina de Gobierno de Datos ha rechazado tu Glosario de Términos. Da click en ver más para conocer el problema'
                      )
                    }{
                      notification.nameassociate === 'glosaryUpdated' && (
                        'Un usuario esta solicitando una neva revisión del procedimiento de Glosario de Términos con los cambios solicitados'
                      )
                    }
                    <br />
                    {/* <p style={styles.time}>Hace un momento</p> */}
                    <span style={styles.time} onClick={() => viewNotification(notification)}>Ver más</span>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
                </div>
              ))
            }
            

            
        
        </List>
      </Snackbar>
    </Box>
    </>
  );
}