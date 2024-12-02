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
import NavBar from '../components/NavBar';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

//Icons
import PolicyIcon from '@mui/icons-material/Policy';
import ArticleIcon from '@mui/icons-material/Article';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';




//React components
import NuevaSolicitud from '../components/NuevaSolicitud';
import Modal from '../components/Modal';


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

const columns = [

]

export default function Notifications() {

    //State 
    const [open, setOpen] = useState(false)
    const [terms, setTerms] = useState([])

    //Handles
    const handleOpen = () => {
      setOpen(true)
    }

    //Local components
    const CustomButtonComponent = (props) => {
      return (
        <Stack direction="row" spacing={2} justifyContent={'space-evenly'}>
          <IconButton aria-label="ver" onClick={handleOpen}>
            <VisibilityIcon sx={{ color: '#53994e'}} />
          </IconButton>
          {/* <IconButton aria-label="editar">
            <EditIcon sx={{ color: '#f5e287'}}/>
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon sx={{ color: '#f58787'}}/>
          </IconButton> */}
        </Stack>
      );
    };


    
    //Table settings
    const columns = [
      {
        field: "name",
        headerName: "Título",
        flex: 1,
        filter: true,
        
      },
      {
        field: "name",
        headerName: "Solicitante",
        flex: 1,
        filter: true,
      },
      {
        field: "name",
        headerName: "Última contestación",
        flex: 1,
        filter: true,
      },
      {
        field: "name",
        headerName: "Activa",
        flex: 1,
        filter: true,
      },
      { field: "Acciones", cellRenderer: CustomButtonComponent ,
        headerName: 'Acciones',
        flex: 2,
        filter: true
      }
      
  ];
   


  return (
    <>
    <NavBar />


  


    <div style={styles.layout}>
    <Box sx={{ flexGrow: 1, padding: 1 }}>
      <Grid container spacing={4}>
        <Grid container size={12} justifyContent={'space-between'} alignItems={'center'}>
            <Grid size={12}>
                <Typography variant='h4' style={styles.title}>Todas las notificaciones</Typography>
            </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
        <div
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: 300 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
          st
              rowData={terms}
              columnDefs={columns}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 25, 50]}
              localeText={AG_GRID_LOCALE_ES}
              alwaysShowHorizontalScroll={true}
          />
        </div>
        </Grid>
      </Grid>
    </Box>
    </div>

    </>
        
        
    
  );
}
