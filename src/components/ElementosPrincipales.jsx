import * as React from 'react';

//MUI Components 
import { styled, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

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


//Assets
import logo from '../../src/assets/imgs/logo.png'
import zIndex from '@mui/material/styles/zIndex';


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
      borderRadius: '10px',
      zIndex: 10,
      color: '#fff'
      
  },
  titles: {
    fontWeight: 'bold'
  }
}


export default function ElementosPrincipales() {
  
  //State

  return (
    <div style={styles.container}>
      <Grid container>
        <Grid item container size={6} spacing={1}>
          <Grid item container size={12} alignItems={'center'}>
          <Grid item size={3}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <StarBorderIcon />
          </IconButton>
          </Grid>
           <Grid item size={9}>
           <Typography variant='h5'style={styles.titles}>Favoritos</Typography>
           </Grid>
          </Grid>
          <Grid item container size={12} alignItems={'center'}>
          <Grid item size={3}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <PolicyIcon />
          </IconButton>
          </Grid>
           <Grid item size={9}>
           <Typography>Politícas</Typography>
           </Grid>
          </Grid>
          <Grid item container size={12} alignItems={'center'}>
          <Grid item size={3}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <ArticleIcon/>
          </IconButton>
          </Grid>
           <Grid item size={9}>
           <Typography>Artefactos</Typography>
           </Grid>
          </Grid>
          <Grid size={12}>
            <Typography  variant='h5'style={styles.titles}>Últimos</Typography>
          </Grid>
          <Grid item container size={12} alignItems={'center'}>
          <Grid item size={3}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <StarBorderIcon />
          </IconButton>
          </Grid>
           <Grid item size={9}>
           <Typography>Politícas</Typography>
           </Grid>
          </Grid>
          <Grid item container size={12} alignItems={'center'}>
           <Grid item size={12}>
           <Typography>Procesos</Typography>
           </Grid>
          </Grid>
        </Grid>
        <Grid container size={6}>
          <Grid item size={12}>
            <Typography  variant='h5'style={styles.titles}>Todos</Typography>
          </Grid>
          <Grid container item size={6} alignItems={'center'}>
          <Grid item size={3}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <StarBorderIcon />
          </IconButton>
          </Grid>
           <Grid item size={9}>
           <Typography>Politícas</Typography>
           </Grid>
          </Grid>
          <Grid container item size={6} alignItems={'center'}>
          <Grid item size={3}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <StarBorderIcon />
          </IconButton>
          </Grid>
           <Grid item size={9}>
           <Typography>Politícas</Typography>
           </Grid>
          </Grid>
          <Grid container item size={6} alignItems={'center'}>
          <Grid item size={3}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <StarBorderIcon />
          </IconButton>
          </Grid>
           <Grid item size={9}>
           <Typography>Politícas</Typography>
           </Grid>
          </Grid>
          <Grid container item size={6} alignItems={'center'}>
          <Grid item size={3}>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <StarBorderIcon />
          </IconButton>
          </Grid>
           <Grid item size={9}>
           <Typography>Politícas</Typography>
           </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </div>
  );
}