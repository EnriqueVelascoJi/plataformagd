import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


//React components
import Modal from './Modal';

//Page Style
const styles = {
  card: {
    height: 300, 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between'

  },
  verMas: {
    color: '#452E70'
  }
}



export default function Option({title, text, img, id}) {

    const [open, setOpen] = useState(false);
    const [size, setSize] = useState('lg')

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickUrl = () => {
    if(id === 1) {
      window.open('http://masterweb.ado.net', '_blank').focus();
    }
    else {
      window.open('https://universidad.mobilityado.com/login/login/index.php', '_blank').focus();
    }
  }

  return (
    <>
        <Card style={styles.card}> 
      <CardMedia
        sx={{ height: 140 }}
        image={img}
        title={title}
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div" textAlign={'center'} style={styles.verMas}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} textAlign={'center'}>
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{textTransform: 'none'}} size="small" onClick={id === 0 ?  handleClickOpen : handleClickUrl} style={styles.verMas}>Ver más</Button>
      </CardActions>
        </Card>

        <Modal 
            id={id}
            title={title}
            open={open}
            setOpen={setOpen}
            size={size}
        />
    </>
  );
}