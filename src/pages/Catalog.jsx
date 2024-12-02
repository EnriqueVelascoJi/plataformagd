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

export default function Catalog() {

    //State 
    const [open, setOpen] = useState(false)
    const [terms, setTerms] = useState([])

    //Handles
    const handleOpen = () => {
      setOpen(true)
    }

    
    //Table settings
    const columns = [
      {
      field: "idterm",
      headerName: "ID término de negocio",

      filter: true,
      minWidth: 200,
      
      },
      {
      field: "system",
      headerName: 'Sistema que almacena el objeto',

      filter: true,
      minWidth: 200
      },
      {
      field: "schema",
      headerName: 'Esquema',
      filter: true,
      minWidth: 200
      },
      {
      field: "object",
      headerName: 'Objeto que lo almacena',

      filter: true,
      minWidth: 200
      }
      // {
      //   field: "subdominio",
      //   headerName: 'Subdominio',
      //
      //   filter: true,
      // }
      ,
      {
        field: "name",
        headerName: 'Nombre campo',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "term",
        headerName: 'Término de negocio',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "definition",
        headerName: 'Definición de negocio',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "Synonym",
        headerName: 'Sinónimo',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "keywords",
        headerName: 'Palabras clave para búsqueda',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "domain",
        headerName: 'Dominio',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "subdomain",
        headerName: 'Subdominio',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "criticality",
        headerName: 'Criticidad del término',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "priority",
        headerName: 'Prioridad del término',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "steward",
        headerName: 'Data Steward',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "areasteward",
        headerName: 'Área del Data Steward',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "positionsteward",
        headerName: 'Posición del Data Steward',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "owner",
        headerName: 'Data Owner',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "areaowner",
        headerName: 'Área del Data Owner',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "positionowner",
        headerName: 'Posición del Data Owner',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "custodian",
        headerName: 'Data Custodian',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "areacustodian",
        headerName: 'Área del Data Custodian',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "status",
        headerName: 'Estatus del dato',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "creationdate",
        headerName: 'Fecha de creación',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "updatedate",
        headerName: 'Fecha de actualización',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "documenter",
        headerName: 'Responsablde de documentación',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "updater",
        headerName: 'Responsable de actualización',
  
        filter: true,
        minWidth: 200
      },
      {
        field: "comment",
        headerName: 'Comentario',
  
        filter: true,
        minWidth: 200
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
                <Typography variant='h4' style={styles.title}>Catálogo de datos</Typography>
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
