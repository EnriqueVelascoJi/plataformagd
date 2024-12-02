import * as React from 'react';
import { useEffect, useState } from 'react';

//MUI Components 
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Typography } from '@mui/material';


//Icons
import PolicyIcon from '@mui/icons-material/Policy';
import ArticleIcon from '@mui/icons-material/Article';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';



//React components
import NavBar from '../components/NavBar'
import NuevaSolicitud from '../components/NuevaSolicitud';



//Page Style
const styles = {
    title: {
        color: 'gray'
    },
    layout: {
        maxWidth: '85%',
        margin: '0 auto'
    },
    button1: {
        backgroundColor: '#D53638'
    },
    button2: {
        backgroundColor: '#E4B653'
    },
    formContainer: {
        boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.3)', 
        padding: '20px',
        borderRadius: '10px'
    },
    formTitle: {
        fontWeight: 'bold', m: 3, fontSize: 30
    }

}





export default function NuevoRequerimeinto() {

    //State 
    const [open, setOpen] = useState(false);
 

    //Handles
    const handleClickOpen = () => {
        setOpen(true);
    };


    

  return (
    <>
    <NavBar />

    <NuevaSolicitud 
        open={open}
        setOpen={setOpen}
    
    />

    <div style={styles.layout}>
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Grid container spacing={4}>
        <Grid container size={12} justifyContent={'space-between'} alignItems={'center'}>
            <Grid size={8}>
                <Typography variant='h2' style={styles.title}>Nuevo requerimiento</Typography>
            </Grid>
            <Grid size={2}>
                <Button variant="contained" style={styles.button2} onClick={handleClickOpen}>Levantar una nueva solicitud</Button>
            </Grid>
        </Grid>
        <Grid conatiner size={{ xs: 12, md: 12 }} style={styles.formContainer}>
            <Grid container item size={{ xs: 12, md: 12 }}>
            <Typography component="div" >
                    <Box style={styles.formTitle} >Formulario de {'Catalogo de Datos'} </Box>
                </Typography>
            </Grid>
            <Grid  container item size={{ xs: 12, md: 12 }} spacing={3}>
                <Grid item size={{ xs: 12, md: 6 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        name="descripcion"
                        label="Campo"
                        type="text"  
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        name="descripcion"
                        label="Campo"
                        type="text"  
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        name="descripcion"
                        label="Campo"
                        type="text"  
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        name="descripcion"
                        label="Campo"
                        type="text"  
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        name="descripcion"
                        label="Campo"
                        type="text"  
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        name="descripcion"
                        label="Campo"
                        type="text"  
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        name="descripcion"
                        label="Campo"
                        type="text"  
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        name="descripcion"
                        label="Campo"
                        type="text"  
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        name="descripcion"
                        label="Campo"
                        type="text"  
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        name="descripcion"
                        label="Campo"
                        type="text"  
                        fullWidth
                        variant="standard"
                    />
                </Grid>

                <Grid item size={{ xs: 12, md: 4 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        name="descripcion"
                        label="Campo"
                        type="text"  
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        name="descripcion"
                        label="Campo"
                        type="text"  
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </Grid>
      </Grid>
    </Box>
    </div>

    </>
        
        
    
  );
}
