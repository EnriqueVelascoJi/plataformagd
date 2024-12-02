import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


//Imgs
import universidad from '../assets/imgs/universidad.png'



//Sitios
const sitios = [
    {
        id: 0,
        url: 'http://masterweb.ado.net',
        nombre: 'Masterweb',
        decripcion: 'Aquí encontrarás todo lo relacionado con ....',
        img: universidad
    },
    {
        id: 1,
        url: 'https://universidad.mobilityado.com/login/login/index.php',
        nombre: 'Universidad ADO',
        decripcion: 'Aquí encontrarás todo lo relacionado con ....',
        img: universidad
    }
    
]
export default function Sites() {

    //State
 

  return (
    <Grid container size={{ md: 12 }} spacing={2}>
        {
            sitios.map(sitio => (
                <Grid item size={{ md: 6 }} key={sitio.id}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={sitio.img}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {sitio.nombre}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {
                                    sitio.decripcion
                                }
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">
                                <a href={sitio.url} target='_blank'>Visitar</a>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))
        }
    </Grid>
  );
}