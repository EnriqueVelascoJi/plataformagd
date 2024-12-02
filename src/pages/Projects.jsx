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
import RouteIcon from '@mui/icons-material/Route';
import FeedIcon from '@mui/icons-material/Feed';

//Router
import { useNavigate } from 'react-router-dom';


//date
import dayjs from 'dayjs';


//React components
import NuevaSolicitud from '../components/NuevaSolicitud';
import Modal from '../components/Modal';


//Table
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateProjectForm, changeProcessId, changeVisibleMode, changeGloabalStatus, changeIsSend } from '../features/projectSlice';

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



export default function Projects() {


    //Local variables
    const userId = localStorage.getItem('userId')
    const path = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/process/${userId}`;
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAccepted = useSelector(state => state.project.isAccepted)
    const isRejected = useSelector(state => state.project.isRejected)
    const isSend = useSelector(state => state.project.isSend)


  


    //State 
    const [open, setOpen] = useState(false)
    const [size, setSize] = useState('lg')
    const [title, setTitle] = useState('Resúmen del proyecto')
    const [id, setId] = useState(6)
    const [projects, setProjects] = useState([])

    
    //Local functions
    const setProjectInformation = (projectInformation) => {
      console.log(projectInformation)
      const {processid, idproject, idrequirement, isProcessAccepted, isprojectaccepted,isRequirementAccepted} = projectInformation
      console.log(isProcessAccepted, isprojectaccepted, isRequirementAccepted)
      const newGlobalStatus = {
        processId: processid,
        projectId: idproject,
        requirementId: idrequirement,
        isProcessAccepted, 
        isProjectAccepted: isprojectaccepted,
        isRequirementAccepted: isprojectaccepted && idrequirement ? true: false,
     }
     
    dispatch(changeGloabalStatus(newGlobalStatus))
      
      
      
    }
    const filterProject = (id) => {
      const projectFiltered = projects.find((project) => project.idproject === id)
      setProjectInformation(projectFiltered)
    }

    //Handles
    const handleOpen = (id) => {
      filterProject(id)
      setOpen(true)
    }
    const handleNewProject = () => {
      dispatch(changeGloabalStatus({
        processId: null,
        projectId: null,
        requirementId: null,
        isProcessAcepted: false, 
        isProjectAccepted: false,
        isReuirementAccepted: false,
    }))
      dispatch(changeVisibleMode(false))
      navigate('/proyecto')

    }
    const goToProject = () => {
      navigate('/proyecto')

    }

    //Local componnets
    const CustomButtonComponent = (props) => {
      const {data: {idproject, idstatus}} = props
      console.log(idstatus)
      return (
        <Stack direction="row" spacing={2} justifyContent={'space-evenly'}>
          <IconButton aria-label="ver" onClick={() => navigate(`/proyecto/${idproject}`)}
          // onClick={() => handleOpen(idproject)}
          >
            <FeedIcon sx={{ color: '#281bf2'}} />
          </IconButton>
          <IconButton aria-label="editar" onClick={() => navigate(`/ruta-proyecto/${idproject}`)} disabled={idstatus==4 ? false: true}>
            <RouteIcon sx={{ color: idstatus==4 ? '#281bf2': 'gray'}}/>
          </IconButton>
          {/* <IconButton aria-label="delete">
            <DeleteIcon sx={{ color: '#f58787'}}/>
          </IconButton> */}
        </Stack>
      );
    };
    const CustomStatusComponent = ({value}) => {
      return (
        <Stack direction="row" justifyContent={'center'} sx={{ mt: 0.5}}>
            <Chip label={value === 4 ? 'Aceptado': value} color={value === 4 ? 'success': 'error'} />
        </Stack>
      );
    };

    //Table settings
    const columns = [
    {
      field: "idproject",
      headerName: 'ID',
      flex: 1,
      filter: true,
        
    
    },
    {
      field: "projectname",
      headerName: 'Título',
      flex: 2,
      filter: true,
        
    
    },
    {
      //field: "estatus", cellRenderer: CustomDomainComponent,
      field: 'idstatus', cellRenderer: CustomStatusComponent ,
      headerName: 'Estatus',
      flex: 1,
      filter: true, 
        
    
    },
    // {
    //   field: "flujo",
    //   flex: 1,
    //   filter: true,
    // },
    { field: "Acciones", cellRenderer: CustomButtonComponent ,
      flex: 1,
      filter: true
    }
    ];
   
    const data = [
      {id: '12123', nombre: 'Embus', estatus: 'Modificar', flujo: 'Actualizar artefactos'},
      {id: '12124', nombre: 'GTFS', estatus: 'Modificar', flujo: 'Actualizar artefactos'},
      {id: '12125', nombre: 'Front Gobierno', estatus: 'Modificar', flujo: 'Actualizar artefactos'},

    ];

    const getProjects = async() => {

      const url = path
      try {
          const response = await fetch(url);
          const result = await response.json();

          const normalData = result.data;
          console.log(normalData)
          setProjects(normalData);

      } catch (error) {
          console.log(error)
      }
    }



    useEffect(() => {
      getProjects()
    }, [])
    



  return (
    <>
    <NavBar />


  

    {/* Modal que despliegua el resumen del proyecto */}
    <Modal 
      id={id}
      title={title}
      open={open}
      setOpen={setOpen}
      size={size}
    />

    <div style={styles.layout}>
    <Box sx={{ flexGrow: 1, padding: 1 }}>
      <Grid container spacing={4}>
        <Grid container size={12} justifyContent={'space-between'} alignItems={'center'}>
            <Grid size={8}>
                <Typography variant='h4' style={styles.title}>Proyectos</Typography>
            </Grid>
            <Grid size={2}>
                <Button onClick={handleNewProject} variant="contained" startIcon={<AddCircleIcon />} style={styles.button1}>Proyecto</Button>
            </Grid>
        </Grid>
        <Grid  size={{ xs: 12, md: 12 }}>
        <div
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: 300 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
              rowData={projects}
              columnDefs={columns}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 25, 50]}
              localeText={AG_GRID_LOCALE_ES}
          />
        </div>
        </Grid>
      </Grid>
    </Box>
    </div>

    </>
        
        
    
  );
}
