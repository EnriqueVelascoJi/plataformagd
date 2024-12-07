import * as React from 'react';
import { useEffect, useState } from 'react';

//MUI Components 
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';





//Icons
import PolicyIcon from '@mui/icons-material/Policy';
import ArticleIcon from '@mui/icons-material/Article';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

//Router
import { useNavigate } from 'react-router-dom';

//React components
import NavBar from './NavBar';
import SideBar from './SideBar';


//Table
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';


//Page Style
const styles = {
    title: {
      fontWeight: '700',
      color: '#432851',

  },
    layout: {
        maxWidth: '85%',
        marginLeft: '260px'
    },
    button1: {
        backgroundColor: '#D53638'
    },
    button2: {
        backgroundColor: '#E4B653'
    }

}
const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.h5,
  color: '#000',
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));



export default function User({user}) {

    //State 
    console.log(user)

    //Handles
    const handleClick = () => {
      console.info('You clicked the Chip.');
    };
  
    const handleDelete = () => {
      console.info('You clicked the delete icon.');
    };
    

  return (
          <Grid container size={12}  alignItems={'center'} spacing={3}>
            <Grid item container size={4} justifyContent={'center'}>
              <Avatar sx={{ width: 100, height: 100}} alt="E" src="https://mui.com/static/images/avatar/2.jpg" />
              </Grid>
            <Grid item container size={7} spacing={1} sx={{mt: 2, borderRadius: 2, p: 2, border: '1px #dadada solid'}}>
            <Root>
            <Divider>
              <Stack
              direction="row"
              spacing={4}
             
              >
              <Typography variant='h5'>Información general</Typography>
              
              <Chip
                  label="Editar"
                  onClick={handleClick}
                  onDelete={handleDelete}
                  deleteIcon={<EditIcon />}
                />
              </Stack>
              </Divider>

              </Root>
              <Grid item container size={12} sx={{mt: 3}}>
                <Grid item size={4} sx={{ fontWeight: 'bold'}}>
                  
                </Grid>
                <Grid item size={6}>
                  {user.name} {user.firstsurname} {user.secondsurname}
                </Grid>
              </Grid>
              <Grid item size={12}>
              </Grid>
              <Grid item container size={12}>
                <Grid item size={4} sx={{ fontWeight: 'bold'}}>
                  Email: 
                </Grid>
                <Grid item size={6}>
                {user.email}
                </Grid>
              </Grid>
              <Grid item container size={12}>
                <Grid item size={4} sx={{ fontWeight: 'bold'}}>
                  Perfil:
                </Grid>
                <Grid item size={6}>
                  {user.profile}
                </Grid>
              </Grid>
            </Grid>
            <Grid item container size={6} spacing={1} sx={{mt: 2, borderRadius: 2, p: 2, border: '1px #dadada solid'}}>
              <Root>
              <Divider ><Typography variant='h5'>Más Información</Typography></Divider>

              </Root>
              <Grid item container size={12} justifyContent={'space-between'} sx={{mt: 3}}>
                <Grid item size={4}>
                  Dominio 
                </Grid>
                <Grid item size={6} textAlign={'center'}>
                <Chip label="Comercial" color="primary" />
                </Grid>
              </Grid>
              <Grid item size={12}>
              </Grid>
              <Grid item container size={12} justifyContent={'space-between'}>
                <Grid item size={6}>
                  Subdominio 
                </Grid>
                <Grid item size={6} textAlign={'center'}>
                <Chip label="Ventas" color="success" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item container size={6} spacing={1} sx={{mt: 2, borderRadius: 2, p: 2, border: '1px #dadada solid'}}>
            <Root>
            <Divider >
              <Typography variant='h5'>Operaciones permitidas </Typography>
              </Divider>

</Root>
              <Stack
                spacing={{ xs: 0, sm: 2 }}
                direction="row"
                useFlexGap
                sx={{ flexWrap: 'wrap', mt: 3}}
              >
               
                  <Chip label="Administrar usuarios" />
                  <Chip label="Carga masiva" />
                  <Chip label="Catálogo de Datos" />
                  <Chip label="Chip Diccionario de Datos" />
                
              </Stack>
              
            </Grid>
          </Grid>
  );
}
