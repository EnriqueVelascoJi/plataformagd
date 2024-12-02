import * as React from 'react';
import { useState } from 'react';

//MUI Components 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';




//Page Style
const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

const grey = {
50: '#F3F6F9',
100: '#E5EAF2',
200: '#DAE2ED',
300: '#C7D0DD',
400: '#B0B8C4',
500: '#9DA8B7',
600: '#6B7A90',
700: '#434D5B',
800: '#303740',
900: '#1C2025',
};


//Dummy Data
const tiposProcedimiento = [
    {
        key: 0,
        name: 'Catalogo de Datos'
    },
    {
        key: 1,
        name: 'Diccionaio de Datos'
    },
    {
        key: 2,
        name: 'Glosario de terminos de negocio y tecnicos'
    },
    {
        key: 3,
        name: 'Matriz orígen destino'
    },
    {
        key: 4,
        name: 'Reglas de negocio tecnicas y lógcias'
    },
]
const areas = [
    {
        key: 0,
        name: 'Area 1'
    },
    {
        key: 1,
        name: 'Area 2'
    },
    {
        key: 2,
        name: 'Aerea 3'
    },
    {
        key: 3,
        name: 'Area 4'
    },
    {
        key: 4,
        name: 'Area 5'
    },
]

const proyectos = [
    {
        key: 0,
        name: 'Proyecto 1'
    },
    {
        key: 1,
        name: 'Proyecto 2'
    },
    {
        key: 2,
        name: 'Proyecto 3'
    },
    {
        key: 3,
        name: 'Proyecto 4'
    },
    {
        key: 4,
        name: 'Proyecto 5'
    },
]



export default function NuevaSolicitud({open, setOpen}) {

    //State 
    const [nombre, setNombre] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoProcedimiento, setTipoProcedimiento] = useState('')
    const [area, setArea] = useState('');
    const [proyecto, setProyecto] = useState('');


    //Handles

    const handleClose = () => {
        setOpen(false);
    };
    const handleChangeTipo = (event) => {
        setTipoProcedimiento(event.target.value);
    };
    const handleChangeProyecto = (event) => {
        setProyecto(event.target.value);
    };
    const handleChangeArea = (event) => {
        setArea(event.target.value);
    };
    const handleChangeNombre = (event) => {
        setNombre(event.target.value)
    } 
    const handleChangeTitulo = (event) => {
        setTitulo(event.target.value)
    } 
    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value)
    } 

    //Functions
    const clear = () => {

    }
    const submit = () => {

    }



  return (
        <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                },
                }}
            >
                <DialogTitle>Nueva solicitud</DialogTitle>
                <DialogContent>
                
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="nombre"
                    name="nombre"
                    label="Nombre del solicitante"
                    type="text"  
                    fullWidth
                    variant="standard"
                    value={nombre}
                    onChange={handleChangeNombre}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="titulo"
                    name="titulo"
                    label="Títuo de la solicitud"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={titulo}
                    onChange={handleChangeTitulo}
                />
              
                <FormControl fullWidth sx={{mt: 3}}>
                    <InputLabel id="area-negocio-label">Área de negocio</InputLabel>
                    <Select
                        labelId="area-negocio-label"
                        id="area-negocio"
                        value={area}
                        label="Tipo"
                        onChange={handleChangeArea}
                        fullWidth
                    >
                        {
                            areas.map((area) => (
                                <MenuItem key={area.key} value={area.name}>{area.name}</MenuItem>
                            ))
                        }
                        
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{mt: 3}}>
                    <InputLabel id="proyecto-label">Proyecto</InputLabel>
                    <Select
                        labelId="proyecto-label"
                        id="proyecto"
                        value={proyecto}
                        label="Tipo"
                        onChange={handleChangeProyecto}
                        fullWidth
                    >
                        {
                            proyectos.map((proyecto) => (
                                <MenuItem key={proyecto.key} value={proyecto.name}>{proyecto.name}</MenuItem>
                            ))
                        }
                        
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{mt: 3}}>
                    <InputLabel id="tipo-procedimeinto-label">Tipo procedimiento</InputLabel>
                    <Select
                        labelId="tipo-procedimeinto-label"
                        id="tipo-procedimeinto"
                        value={tipoProcedimiento}
                        label="Tipo"
                        onChange={handleChangeTipo}
                        fullWidth
                    >
                        {
                            tiposProcedimiento.map((tipoProcedimiento) => (
                                <MenuItem key={tipoProcedimiento.key} value={tipoProcedimiento.name}>{tipoProcedimiento.name}</MenuItem>
                            ))
                        }
                        
                    </Select>
                </FormControl>
                <TextField
                    autoFocus
                    
                    margin="dense"
                    id="descripcion"
                    name="descripcion"
                    label="Descripción del requerimeinto"
                    type="text"  
                    fullWidth
                    variant="standard"
                    value={descripcion}
                    onChange={handleChangeDescripcion}
                />                </DialogContent>
                <DialogActions>
                <Button type="button" >Enviar solicitud</Button>
                </DialogActions>
        </Dialog>
    
    
  );
}
