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
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import NavBar from '../components/NavBar';
import { Typography } from '@mui/material';


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

//Alert
import Swal from 'sweetalert2'



//Router 
import { useNavigate } from 'react-router-dom';


//React components
import Modal from '../components/Modal';

//Table
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
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

const options = [
  {
    id: 3,
    title: 'Información del usario'
  },
  {
    id: 4,
    title: 'Nuevo usuario'
  },
  {
    id: 5,
    title: 'Editar usuario'
  },

]



export default function Users() {

  //Local variables 
  const path = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd'

    //State 
    const [open, setOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState({})
    const [size, setSize] = useState('md')
    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    //handles
    const handleOpen = (id) => {
      if(id === 3) 
        setModalInfo(options[0])
        
      if(id === 4) 
        setModalInfo(options[1])
        

      if(id === 5) 
        setModalInfo(options[2])
        


      setOpen(true)
    }
    const handleAlert = () => {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Este usuario no podrá ingresar al sistema",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, seguro!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Eliminado!",
            text: "El usuario ha sido eliminado",
            icon: "success"
          });
        }
      });
    }


    
    //Local componnets
    const CustomButtonComponent = (props) => {
      return (
        <Stack direction="row" spacing={2} justifyContent={'space-evenly'}>
          <IconButton aria-label="ver" onClick={() => handleOpen(3)}>
            <VisibilityIcon sx={{ color: '#53994e'}} />
          </IconButton>
          <IconButton aria-label="editar" onClick={() => handleOpen(5)}>
            <EditIcon sx={{ color: '#f5e287'}}/>
          </IconButton>
          <IconButton aria-label="delete" onClick={handleAlert}>
            <DeleteIcon sx={{ color: '#f58787'}}/>
          </IconButton>
        </Stack>
      );
    };

    //Table settings
    const columns = [
        {
        field: "name",
        headerName: "Nombre",
        flex: 1,
        filter: true,
        
        },
        {
        field: "firstsurname",
        headerName: 'Apellido',
        flex: 1,
        filter: true
        },
        {
        field: "email",
        headerName: 'Email',
        flex: 2,
        filter: true
        },
        {
        field: "domain",
        headerName: 'Dominio',
        flex: 1,
        filter: true
        }
        // {
        //   field: "subdominio",
        //   headerName: 'Subdominio',
        //   flex: 1,
        //   filter: true
        // }
        ,
        {
          field: "profile",
          headerName: 'Perfil',
          flex: 1,
          filter: true
        },
        { field: "Acciones", cellRenderer: CustomButtonComponent ,
          headerName: 'Acciones',
          flex: 2,
          filter: true
        }
    ];
   
    const data = [
    {nombre: 'Enrique', apellidos: 'Velasco Jimenez', email: 'email@gmail.com', dominio: 'Comercial', subdominio: 'Oferta', perfil: 'Admin', rol: 'Admin', area: 'Dirección comercial', fecha: '24/10/2024', estatus: 'Activo'},
    {nombre: 'Enrique2', apellidos: 'Velasco Jimenez', email: 'email@gmail.com', dominio: 'Comercial', subdominio: 'Oferta', perfil: 'Admin', rol: 'Admin', area: 'Dirección comercial', fecha: '24/10/2024', estatus: 'Activo'},
    {nombre: 'Enrique3', apellidos: 'Velasco Jimenez', email: 'email@gmail.com', dominio: 'Comercial', subdominio: 'Oferta', perfil: 'Admin', rol: 'Admin', area: 'Dirección comercial', fecha: '24/10/2024', estatus: 'Activo'},

    ];


    //Functions
    const getUsers = async() => {

      const url = path
      try {
          const response = await fetch(url);
          const result = await response.json();

          const normalData = result.data;
          setUsers(normalData);

      } catch (error) {
          console.log(error)
      }
    }



    useEffect(() => {
      getUsers()
    }, [])
    

  return (
    <>
    <NavBar />


    
    {/* Modal que dispara las funciones del usuario */}
      <Modal 
      id={modalInfo.id}
      title={modalInfo.title}
      open={open}
      setOpen={setOpen}
      size={size}
    />

    
    <div style={styles.layout}>
    <Box sx={{ flexGrow: 1, padding: 1 }}>
      <Grid container spacing={4}>
        <Grid container size={12} justifyContent={'space-between'} alignItems={'center'}>
            <Grid size={8}>
                <Typography variant='h4' style={styles.title}>Usuarios</Typography>
            </Grid>
            <Grid size={2}>
                <Button onClick={() => handleOpen(4)} variant="contained" startIcon={<AddCircleIcon />}  style={styles.button2}>Usuario</Button>
            </Grid>
            
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
        <div
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: 300 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
              rowData={users}
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
