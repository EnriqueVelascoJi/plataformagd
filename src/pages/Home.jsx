import * as React from 'react';
import { useEffect, useState } from 'react';

//MUI Components 
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

//Icons
import PolicyIcon from '@mui/icons-material/Policy';
import ArticleIcon from '@mui/icons-material/Article';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';



//React components
import NavBar from '../components/NavBar';
import { Typography } from '@mui/material';

//React components
import Option from '../components/Option';
import LastVisited from '../components/LastVisited';
import LastNotications from '../components/LastNotificaciones';


//Imgs
import option1 from '../assets/imgs/option1.jpg'
import option2 from '../assets/imgs/option2.jpg'
import option3 from '../assets/imgs/option3.jpg'
import logo from '../assets/imgs/logo.png'


//Page Style

const styles = {
    title: {
        color: '#432851',
        fontWeight: '700',
        textAlign: 'start'

    },
    subtitle: {
        color: '#432851',
        fontWeight: '500',
        marginBottom: 20

    },
    layout: {
        maxWidth: '85%',
        marginLeft: '270px',
        
        
    }

}

//Data for options
const options = [
    {
        id: 0,
        title: 'Dominios de Datos',
        text: 'Explora nuestros 7 dominios de datos con sus subdominios',
        img: option1
    },
    {
        id: 1,
        title: 'Masterweb',
        text: 'Explora nuestras políticas, procesos, normativas y procedimientos internos',
        img: option2
    },
    {
        id: 2,
        title: 'Universidad ADO',
        text: 'Explora recuersoso informaticos internos.',
        img: option3
    },

]

export default function Home() {

    //State 
    

  return (
    <>
    <NavBar />

    <div style={styles.layout}>
        <Box sx={{ flexGrow: 1, padding: 1}}>
        <Grid container spacing={3}  >
            <Grid container item size={12} >
                <Grid tiem size={6}>
                    <Typography variant='h2' style={styles.title}>GovernIQ</Typography>
                </Grid>
                <Grid tiem size={6} textAlign={'end'} >
                    <img src={logo} alt="logo" width={'50%'} style={{marginTop: -30}}/>
                </Grid>
            </Grid>
            <Grid container  item size={{ md: 12 }} >
                {
                    options.map(option => (
                        <Grid key={option.id} item size={{ md: 4 }}>
                            <Option 
                                id={option.id}
                                title={option.title}
                                text={option.text}
                                img={option.img}
                            />
                        </Grid>
                    ))
                }
            </Grid>
            <Grid container item size={{ md: 12 }} spacing={4} sx={{mt: 3}} justifyContent={'space-between'}>
                            
                <Grid  item size={{ md: 7}} spacing={4}  justifyContent={'center'} >          
                    <Typography variant='h5' style={styles.subtitle}>Recientes</Typography>
                    <Divider sx={{mb: 3}}/>
                    <LastVisited />
                </Grid>
                <Grid  item size={{ md: 5}} spacing={4} justifyContent={'center'}  >
                    <Typography variant='h5' style={styles.subtitle}>Últimas notificaciones</Typography>
                    <Divider sx={{mb: 3}}/>
                    <LastNotications />
                </Grid>
            </Grid>
            
        </Grid>
        </Box>
    </div>

    </>
        
        
    
  );
}
