import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';

//React components
import Dominios from './Dominios';
import Sites from './Sites'
import User from './User';
import UserForm from './UserForm';
import ProjectInformation from './ProjectInformation';

//Icons
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({title, id, open, setOpen, size, body}) {


    //Handles
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
       
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth={size}
        
      >
        <Grid container  justifyContent={'space-between'} alignItems="start" sx={{p: 3}}>
            <Typography variant="h3" gutterBottom sx={{ color: '#432851'}}>{title}</Typography>
            <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
            </IconButton>
        </Grid>
        <DialogContent>
          {
            id == 0 && (
                <Dominios />
            )
          }
          {
            id == 1 && (
                <Sites/>
            )
          }
          {
            id == 2 && (
                <Sites/>
            )
          }
          {
            id == 3 && (
              <User
                user={body}
              />
            )
          }
          {
            id === 4 && (
              <UserForm 
                isNew={true}
              />
            )
          }
          {
            id === 5 && (
              <UserForm 
                isNew={false}
                user={body}
              />
            )
          }
          {
            id === 6 && (
              <ProjectInformation />
            )
          }
        </DialogContent>
        
      </Dialog>
    </>
  );
}