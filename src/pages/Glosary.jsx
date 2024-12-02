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



export default function Glosary() {

  //Local
  const glosaryPath = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/glosary`

    //State 
    const [open, setOpen] = useState(false)
    const [terms, setTerms] = useState([])

    //Handles
    const handleOpen = () => {
      setOpen(true)
    }


    const getGlosary= async() => {
      const url = glosaryPath
      console.log(url)
      try {
          const response = await fetch(url);
          const result = await response.json();
  
          const normalData = result.data;
          setTerms(normalData)
          
  
        

      } catch (error) {
          console.log(error)
      }
    }

    //Table settings
    const columns = [
      {
          field: 'term',
          headerName: 'Término de negocio',
          width: 220
      },
      {
          field: 'definition',
          headerName: 'Definición de negocio',
          width: 180
      },
      {
          field: 'abbreviattions',
          headerName: 'Abreviaturas/Siglas/Acronimos',
          width: 220
      },
      {
          field: 'synonym',
          headerName: 'Sinónimo',
          width: 100
      },
      {
          field: 'example',
          headerName: 'Ejemplo de Uso',
          width: 150
      },
      {
          field: 'region',
          headerName: 'Región',
          width: 100
      },
      {
          field: 'area',
          headerName: 'Área',
          width: 100
      },
      {
          field: 'domain',
          headerName: 'Dominio',
          width: 130,
      },
      {
          field: 'subdomain',
          headerName: 'Subdominio',
          width: 130,
      },
      {
          field: 'owner',
          headerName: 'Data Owner',
          width: 150
      },
      {
          field: 'status',
          headerName: 'Estatus del Término',
          width: 150
      },
      {
          field: 'creationDate',
          headerName: 'Fecha de Creacion',
          width: 180
      },
      {
          field: 'updateDate',
          headerName: 'Fecha de Actualización',
          width: 180
      },
      {
          field: 'documentationResponsible',
          headerName: 'Responsable de Documentación',
          width: 240
      },
      {
          field: 'updateResponsible',
          headerName: 'Responsable de Actualización',
          width: 220
      },
      {
          field: 'comment',
          headerName: 'Comentario',
          width: 120
      },
      // {
      //   field: 'age',
      //   headerName: 'Age',
      //   type: 'number',
      //   width: 80,
      //   align: 'left',
      //   headerAlign: 'left',
  
      // },
      // {
      //   field: 'role',
      //   headerName: 'Department',
      //   width: 220,
  
      //   type: 'singleSelect',
      //   valueOptions: ['Market', 'Finance', 'Development'],
      // },
      // {
      //   field: 'actions',
      //   type: 'actions',
      //   headerName: 'Acciones',
      //   width: 150,
      //   cellClassName: 'actions',
      //   getActions: ({ id }) => {
      //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
      //     if (isInEditMode) {
      //       return [
      //         <GridActionsCellItem
      //           icon={<SaveIcon />}
      //           label="Save"
      //           sx={{
      //             color: 'primary.main',
      //           }}
      //           onClick={handleSaveClick(id)}
      //         />,
      //         <GridActionsCellItem
      //           icon={<CancelIcon />}
      //           label="Cancel"
      //           className="textPrimary"
      //           onClick={handleCancelClick(id)}
      //           color="inherit"
      //         />,
      //       ];
      //     }
  
      //     return [
      //       <GridActionsCellItem
      //         icon={<EditIcon />}
      //         label="Edit"
      //         className="textPrimary"
      //         onClick={handleEditClick(id)}
      //         color="inherit"
      //       />,
      //       <GridActionsCellItem
      //         icon={<DeleteIcon />}
      //         label="Delete"
      //         onClick={handleDeleteClick(id)}
      //         color="inherit"
      //       />,
      //     ];
      //   },
      // },
    ];

    useEffect(() => {
      getGlosary()
    }, [])
  return (
    <>
    <NavBar />


  


    <div style={styles.layout}>
    <Box sx={{ flexGrow: 1, padding: 1 }}>
      <Grid container spacing={4}>
        <Grid container size={12} justifyContent={'space-between'} alignItems={'center'}>
            <Grid size={12}>
                <Typography variant='h4' style={styles.title}>Glosario de términos</Typography>
            </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
        <div
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: 300 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
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
