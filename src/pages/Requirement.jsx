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
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';

import Typography from '@mui/material/Typography';

import dayjs from 'dayjs';


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

//Alerts
import Swal from 'sweetalert2'


//Date
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { deDE } from '@mui/x-date-pickers/locales';
import "dayjs/locale/es";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//Router
import { useNavigate } from 'react-router-dom';


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
import { updateRequirementForm } from '../features/projectSlice';

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

//Domains
const domainsAux = [
    {
        id: 0,
        domain: 'Comercial',
        subId: 'MC_CM',
        color: '#0059B3',
        description: 'Dominio que almacena datos de procesos relacionados con la promoción, venta y gestión de los servicios ofrecidos. Este dominio es fundamental para el éxito financiero y la competitividad de la empresa, ya que se encarga de maximizar las oportunidades de ingresos y asegurar la satisfacción del cliente a través de una oferta de servicios de movilidad bien estructurada y atractiva.',
        subdomains: [
            {
                id: 0,
                subdomain: 'Cliente'
            },
            {
                id: 1,
                subdomain: 'Marketing'
            },
            {
                id: 2,
                subdomain: 'Oferta'
            },
            {
                id: 3,
                subdomain: 'Ventas'
            },
            {
                id: 4,
                subdomain: 'Pasajeros'
            },
            {
                id: 5,
                subdomain: 'Socios comerciales'
            },
            {
                id: 6,
                subdomain: 'Precios'
            },
  
        ]
    },
    {
        id: 1,
        domain: 'Operativo',
        subId: 'MC_OP',
        color: '#D53638',
        description: 'Dominio que almacena datos de procesos relacionados con la planificación, ejecución y supervisión de las operaciones de transporte a través de la asignación de un conductor y la asignación de un autobús, cuidando la rentabilidad, el clima laboral y seguridad de los pasajeros conductores y recursos operativos. Este dominio es crucial para asegurar que los servicios de transporte se realicen de manera eficiente, segura y conforme a las normativas establecidas, garantizando la satisfacción del cliente y la optimización de recursos.',
        subdomains: [
            {
                id: 0,
                subdomain: 'Planeación Operación'
            },
            {
                id: 1,
                subdomain: 'Conductiores'
            },
            {
                id: 2,
                subdomain: 'Monitoreo y control operativo'
            },
            {
                id: 3,
                subdomain: 'Vehículos'
            },
            {
                id: 4,
                subdomain: 'Rutas'
            },
            {
                id: 5,
                subdomain: 'Autoridades'
            }
  
        ]
    },
    {
        id: 2,
        domain: 'Júridico',
        subId: 'MC_JU',
        color: '#E4B653',
        description: 'Dominio que almacena información de procesos que garantizan todas las operaciones se realicen dentro del marco legal aplicable, protegiendo los intereses de la empresa y minimizando riesgos legales. Este dominio abarca la gestión integral de asuntos legales relacionados con bienes, litigios, contratos, desarrollo inmobiliario y seguros, asegurando que cada aspecto del negocio esté debidamente respaldado y protegido desde un punto de vista legal.',
        subdomains: [
            {
                id: 0,
                subdomain: 'Patrimonial'
            },
            {
                id: 1,
                subdomain: 'Desarrollo inmobiliario'
            },
            {
                id: 2,
                subdomain: 'Litigios'
            },
            {
                id: 3,
                subdomain: 'Contratos y convenios'
            },
            {
                id: 4,
                subdomain: 'Gestión de seguros'
            }
        ]
    },
    {
        id: 3,
        domain: 'Gobierno',
        subId: 'MC_GO',
        color: '#452E70',
        description: 'Dominio que almacena información de procesos relacionada con el cumplimiento normativo y la auditoría interna/externa. Este dominio es fundamental para asegurar que la organización opere de acuerdo con las leyes, regulaciones y políticas internas aplicables, manteniendo altos estándares de transparencia y responsabilidad para mitigar riesgos.',
        subdomains: [
            {
                id: 0,
                subdomain: 'Auditoría'
            },
            {
                id: 1,
                subdomain: 'Gestión de riesgos'
            },
            {
                id: 2,
                subdomain: 'Normatividad y cumplimiento'
            }
        ]
    },
    {
        id: 4,
        domain: 'Finanzas',
        subId: 'MC_FN',
        color: '#0059B3',
        description: 'Dominio que almacena información de procesos relacionados con la gestión financiera, contabilidad y control económico de MOBILITY ADO. Este dominio es vital para asegurar la estabilidad financiera, transparencia y eficiencia en el uso de los recursos económicos en toda la operación de la organización. ',
        subdomains: [
            {
                id: 0,
                subdomain: 'Tesorería'
            },
            {
                id: 1,
                subdomain: 'Inversiones'
            },
            {
                id: 2,
                subdomain: 'Contraloría'
            },
            {
                id: 3,
                subdomain: 'Fiscal'
            },
            {
                id: 4,
                subdomain: 'Contabilidad'
            },
            {
                id: 5,
                subdomain: 'Planeación financiera'
            },
            {
                id: 6,
                subdomain: 'Cuentas por pagar'
            },
            {
                id: 7,
                subdomain: 'Nómina'
            }
        ]
    },
    {
        id: 5,
        domain: 'Mantenimeinto',
        subId: 'MC_MT',
        color: '#D53638',
        description: 'Dominio que almacena información de procesos relacionados con el mantenimiento preventivo y correctivo de la flota de autobuses, así como la gestión de compras y proveedores necesarios para mantener la operatividad de los vehículos. Este dominio es esencial para asegurar la seguridad, confiabilidad y eficiencia de los servicios de transporte.',
        subdomains: [
            {
                id: 0,
                subdomain: 'Mantenimeinto técnico'
            },
            {
                id: 1,
                subdomain: 'Mantenieminto administrativo'
            },
            {
                id: 2,
                subdomain: 'Gestión de almacenes y talleres'
            }
        ]
    },
    {
        id: 6,
        domain: 'Capital Humano',
        subId: 'MC_CH',
        color: '#E4B653',
        description: 'Dominio que almacena información de todos los procesos relacionados con la gestión del talento y el desarrollo organizacional, estructura organizacional, movilidad de talento, coordinación de los recursos humanos de las regiones, administración de compensaciones y supervisación de las relaciones laborales. Este dominio es esencial para asegurar que la MOBILITY ADO cuente con el personal adecuado y capacitado para cumplir con sus objetivos estratégicos. ',
        subdomains: [
            {
                id: 0,
                subdomain: 'Compensaciones'
            },
            {
                id: 1,
                subdomain: 'Gestión de talento'
            },
            {
                id: 2,
                subdomain: 'Recursos humanos por regiones'
            },
            {
                id: 3,
                subdomain: 'Relaciones laborales'
            },
            {
                id: 4,
                subdomain: 'Formación de talento'
            },
            {
                id: 5,
                subdomain: 'Estructura Organizacional'
            },
            {
                id: 6,
                subdomain: 'Cultura Organizacional'
            }
        ]
    }
  
  ]
  

const profiles = [
{
    id: 0,
    profile: 'Chief Data Officer (CDO)'
},
{
    id: 1,
    profile: 'Data Governance Manager'
},
{
    id: 2,
    profile: 'Data Governance Leader'
},
{
    id: 3,
    profile: 'Data Governance Specialist'
},
{
    id: 4,
    profile: 'Sponsor ejecutivo'
},
{
    id: 5,
    profile: 'Data Owner'
},
{
    id: 6,
    profile: 'Business Data Steward'
},
{
    id: 7,
    profile: 'Data Steward'
},
{
    id: 8,
    profile: 'Data Custodian'
},
{
    id: 9,
    profile: 'Data Specialist'
},
{
    id: 10,
    profile: 'Usuario básico'
}
]
  

//Steps
// const steps = ['Datos principales', 'Descripción', 'Responsables del proyecto', 'Otra información', 'Aprobaciones y/o Vo.bo. Requeridos'];
const steps = ['Responsable del proyecto', 'Contexto del proyecto', 'Participantes del proyecto', 'Otra información']
//Const local functions
const initializeArrayWithValues = (n, ...vals) => {
    if (vals.length === 0) return Array(n).fill(0);
    if (vals.length === 1) return Array(n).fill(vals[0]);
    return Array.from({ length: n }, (_, i) => vals[i % vals.length]);
  };


export default function Requirement() {

    //Local variables
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
    const projectPath = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/project'
    const userPath = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/usuariogd/${userId}`
    const path = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/process/${userId}`;
    const requirementPath = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/requirement'



    //Global state
    //const projectInformation = useSelector(state => state.project.newProject)
    const globalStatus = useSelector(state => state.project.globalStatus)
    const {projectId, isProjectAccepted, requirementId, isRequirementAccepted, processId} = globalStatus
    //const processId = useSelector(state => state.project.processId)
    //const visibleMode = useSelector(state => state.project.visibleMode)
    
    //State
    const [newRequirement, setNewRequirement] = useState({
        personalInformation: {
            name: '',
            firstSurname: '',
            secondSurname: '',
            email: '',
            domain: 0,
            subdomain: 0,
            area: 0,
            profile: 0
        },
        context: {
            projectName: '',
            projectType: '',
            //dataSourceType: '',
            projectDescription: '',
            projectScopeDescription: '',
            projectObjective: '',
            region: '',
            //results: '',
            //systems: '',
            startDate: dayjs(new Date()),
            finalDate: dayjs(new Date())

        },
        participants: [
            {   
               idParticipant: 0,
               name: '',
               surname: '',
               email: '',
               position: '',
               area: 0           
                
            }
        ],
        // mainInformation: {
        //     directionName: '',
        //     projectName: '',
        //     area: '',
        //     creationDate: '',
        //     startDate: '',
        //     finalDate: ''
            
        // },
        // description: {
        //     projectDescription: '',
        //     problem: '',
        //     hypothesis: '',
        //     scope: '',
        //     background: '',
        //     strategicGoals: '',
        //     operationalGoals: '',
        //     expectations: '',
        //     interoperatibility: ''

        // },
        // owners: {
        //     projectOwner: {
        //         name: '',
        //         firstSurname: '',
        //         secondSurname: '',
        //         position: '',
        //     },
        //     informationOwner: {
        //         name: '',
        //         firstSurname: '',
        //         secondSurname: '',
        //         position: '',
        //         area: ''
        //     },
        //     integrants: [
        //         {   
        //             idParticipant: 0,
        //             name: '',
        //             surname: '',
        //             rol: ''
        //         }
        //     ]
        // },
        otherInformation: {
            informationUse: '',
            deliverables: '',
            issues: '',
            techResources: '',
            otherResources: '',
            aditionalInformation: ''
        },
        // aprprovers: [
        //     {
        //         name: '',
        //         surname: '',
        //         email: '',
        //         position: '',
        //         area: ''
        //     }
        // ]
    })
    const [domains, setDomains] = useState(domainsAux)
    const [subdomains, setSubdomains] = useState([])
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState({
      nombre: '',
      apellidoP: '',
      apellidoM: '',
      email: '',
      dominio: '',
      subdominio: '',
      area: '',
      rol: null,
      perfil: null
    })
    const [roles, setRoles] = useState({})
    const [perfiles, setPerfiles] = useState([])
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = React.useState({});

    const [userList, setUserList] = useState([])
    const [users, setUsers] = useState(0)
    const [participantes, setParticipantes] = useState([{
        idParticipante: 0,
        nombre: '',
        apellidos: '',
        rol: null,
    }])
    const [visibleMode, setVisibleMode] = useState(false)



    //Handles
    const handleOpen = () => {
      setOpen(true)
    }
     //Handle
    //  const handleChange = (e) => {

    //   const dominioId = e.target.value
    //   setUser({
    //     ...user,
    //     [e.target.name]: dominioId
    //   })
    //   if(e.target.name === 'dominio') {
    //     setSubdominios(dominios[dominioId].subdominios)
    //   }
    // };
    const handleChangeParticipants = (keyObject, fieldObject, fieldValue) => {

        console.log(keyObject, fieldObject, fieldValue)
        const id = parseInt(keyObject.split('[')[1].substring(0, keyObject.length - 1))
        console.log(id )
        const newRequirementAux = newRequirement
        newRequirementAux.participants[id][fieldObject] = fieldValue

        
        
        setNewRequirement({...newRequirementAux})

    }
    const handleChange = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value

        console.log(fieldName, fieldValue)

        const nameSplit = fieldName.split('.') 
        const keyObject = nameSplit[0]
        const fieldObject = nameSplit[1] 



        if(keyObject.includes('participants')) {
            handleChangeParticipants(keyObject, fieldObject, fieldValue)

        } else {
            const newRequirementAux = JSON.parse(JSON.stringify(newRequirement))
            newRequirementAux[keyObject][fieldObject] = fieldValue

            setNewRequirement({...newRequirementAux})
            // if(fieldObject === 'domain') {
            //     const domainId = fieldValue
            //     setSubdomains(domains[domainId].subdomains)
            // }
        }
    }
    const handleSend = async() => {
        console.log(newRequirement)
        const url = requirementPath
        const {otherInformation} = newRequirement
        otherInformation['processId'] = processId
        otherInformation['userId'] = userId
        console.log(otherInformation)
         try {
        
            const response = await fetch(url, {
                method: "POST", 
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(otherInformation),
                mode: 'cors'
            
            });
            const result = await response.json();
    
            console.log(result.data)

        
            Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Solicitud enviada a la oficina de GD",
            showConfirmButton: false,
            timer: 2500,
            
          });
          dispatch(updateRequirementForm(newRequirement))
          navigate('/proyectos')

        } catch (error) {
            console.log(error)
        }
    }
   

    const totalSteps = () => {
        return steps.length;
      };
    
    const completedSteps = () => {
    return Object.keys(completed).length;
    };
    
    const isLastStep = () => {
    return activeStep === totalSteps() - 1;
    };
    
    const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
    };
    const handleStep = (step) => () => {
    setActiveStep(step);
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleAdd = () => {

        const newId = newRequirement.participants.length
        console.log(newId)
        const newParticipant = {   
            idParticipant: newId,
            name: '',
            surname: '',
            email: '',
            position: '',
            area: 0           
             
         }


        const newParticipants = newRequirement.participants
        newParticipants.push(newParticipant)
        console.log(newParticipants)
        const newRequirementAux = newRequirement
        newRequirementAux.participants = newParticipants

        setNewRequirement({...newRequirementAux})

    }
    const handleDelete = (id) => {

        const newParticipants = newRequirement.participants.filter( participant => participant.idParticipant !== id)
        const newRequirementAux = newRequirement
        newRequirementAux.participants = newParticipants
        
        setNewRequirement({...newRequirementAux})

    }

    //Functions
    const getUser = async () => {

        const url = userPath
        try {
            const response = await fetch(url);
            const result = await response.json();
  
            const user = result.data[0];
            const {name, firstsurname, secondsurname, email, domain, subdomain, profile, area, } = user

            const userGlobalInformation = {
               name,
               firstSurname: firstsurname,
               secondSurname: secondsurname, 
               email,
               domain,
               subdomain, 
               profile,
               area
           }
           console.log(userGlobalInformation)
           setSubdomains(domains[subdomain].subdomains)
           setNewRequirement({
               ...newRequirement,
               personalInformation: userGlobalInformation
           })
  
        } catch (error) {
            console.log(error)
        }
      }
      const getProjects = async() => {

        const url = path
        try {
            const response = await fetch(url);
            const result = await response.json();
  
            const normalData = result.data;
            return normalData
            
  
        } catch (error) {
            console.log(error)
        }
      }
  
    const chargeRequirementInformation = async() => {
        const projects = await getProjects()
        const project = projects.filter(project => project.idproject === projectId)

        console.log(project, 'projectttt')

        const {name, firstsurname, secondsurname, email, domain,subdomain,area, profile, projectname,
            projecttype,
            projectdescription,
            projectscopedescription,
            projectobjective,
            region,startdate, finaldate, informationuse, techresources, otherresources, aditionalinformation} = project[0]

        const existingRequirement = {
             personalInformation: {
                 name,
                 firstSurname: firstsurname,
                 secondSurname: secondsurname,
                 email,
                 domain,
                 subdomain,
                 area,
                 profile 
             },
             context: {
                projectName: projectname,
                projectType: projecttype,
                projectDescription: projectdescription,
                projectScopeDescription: projectscopedescription,
                projectObjective: projectobjective,
                region: region,
                startDate: dayjs(startdate),
                finalDate: dayjs(finaldate)
             },
             participants: [
                {   
                   idParticipant: 0,
                   name: '',
                   surname: '',
                   email: '',
                   position: '',
                   area: 0           
                    
                }
            ],
            otherInformation: {
                informationUse: '',
            deliverables: '',
            issues: '',
            techResources: '',
            otherResources: '',
            aditionalInformation: ''
            },

        }
        console.log(existingRequirement)
        setNewRequirement(existingRequirement)
    }

    useEffect(() => {
        if(isRequirementAccepted) {
            chargeRequirementInformation()
            setVisibleMode(true)
        } 
        if(isProjectAccepted) {
            chargeRequirementInformation()
        } 
        
    }, [])

    // useEffect(() => {

    //     const {personalInformation, context} = projectInformation
    //     if(personalInformation.name !== '') {
    //         console.log(personalInformation)
    //         setNewRequirement({
    //             ...newRequirement,
    //             personalInformation,
    //             context
    //         })
    //     }
    // }, [])

  return (
    <>
    <NavBar />


  


    <div style={styles.layout}>
    <Box sx={{ flexGrow: 1, padding: 1 }}>
      <Grid container spacing={4}>
        <Grid container size={12} justifyContent={'space-between'} alignItems={'center'}>
            <Grid size={8}>
                <Typography variant='h4' style={styles.title}>Requerimiento del proyecto</Typography>
            </Grid>
            {/* <Grid size={2}>
                <Button onClick={handleOpen} variant="contained" startIcon={<AddCircleIcon />} style={styles.button1}>Proyecto</Button>
            </Grid> */}
        </Grid>
        <Grid  container item size={{ xs: 12, md: 12 }}>
            <Grid item size={12}>
            <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
            </Stepper>
            </Grid>

            { activeStep === 0 && (
                <>
                <Grid item size={{md: 4}}>
                <TextField
                fullWidth
                id="outlined-error"
                label="Nombre"
                name='personalInformation.name'
                value={newRequirement.personalInformation.name}
                onChange={handleChange}
                disabled
                />
                </Grid>
                <Grid item size={{md: 4}}>
                <TextField
                fullWidth
                id="outlined-error"
                label="Apellido paterno"
                name='personalInformation.firstSurname'
                value={newRequirement.personalInformation.firstSurname}
                onChange={handleChange}
                disabled
                />
                </Grid>
                <Grid item size={{md: 4}}>
                <TextField
                fullWidth
                id="outlined-error"
                label="Apellido Materno"
                name='personalInformation.secondSurname'
                value={newRequirement.personalInformation.secondSurname}
                onChange={handleChange}
                disabled
                />
                </Grid>
                <Grid item size={{md: 4}}>
                <TextField
                fullWidth
                id="outlined-error"
                label="Email"
                type='email'
                name='personalInformation.email'
                value={newRequirement.personalInformation.email}
                onChange={handleChange}
                disabled
                />
                </Grid>
                <Grid item size={{md: 4}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Dominio</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='personalInformation.domain'
                value={newRequirement.personalInformation.domain}
                label="Age"
                onChange={handleChange}
                disabled
                >
                {
                    domains.map(domain => (
                    <MenuItem key={domain.id} value={domain.id}>{domain.domain}</MenuItem>
                    ))
                }
                
                
                </Select>
            </FormControl>
                </Grid>
                <Grid item size={{md: 4}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Subdominio</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='personalInformation.subdomain'
                    value={newRequirement.personalInformation.subdomain}
                    label="Age"
                    onChange={handleChange}
                    disabled
                    >
                    {
                        subdomains.map(subdomain => (
                        <MenuItem key={subdomain.id} value={subdomain.id}>{subdomain.subdomain}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>
                </Grid>
                <Grid item size={{md: 4}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Area</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='personalInformation.area'
                    value={newRequirement.personalInformation.area}
                    label="Age"
                    onChange={handleChange}
                    disabled
                    >
                    <MenuItem value={0}>Ten</MenuItem>
                    <MenuItem value={1}>Twenty</MenuItem>
                    <MenuItem value={2}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                {/* <Grid item size={{md: 4}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='personalInformation.rol'
                    value={newRequirement.personalInformation.rol}
                    label=""
                    onChange={handleChange}
                    disabled
                    >
                    <MenuItem value={0}>Ten</MenuItem>
                    <MenuItem value={1}>Twenty</MenuItem>
                    <MenuItem value={2}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                </Grid> */}
                <Grid item size={{md: 4}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Perfil</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name='personalInformation.profile'
                value={newRequirement.personalInformation.profile}
                label="Age"
                onChange={handleChange}
                disabled
                >
                <MenuItem value={-1}>-- Selecciona un perfil de usuario --</MenuItem>
              {
                profiles.map(profile => (
                  <MenuItem key={profile.id} value={profile.id}>{profile.profile}</MenuItem>
                ))
              }
                </Select>
            </FormControl>
                </Grid>
                </>

            )     
            }

            {
                activeStep === 1 && (
                    <>
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Nombre del proyecto"
                        name='context.projectName'
                        value={newRequirement.context.projectName}
                        onChange={handleChange}
                        disabled={visibleMode}
                        />
                        </Grid>
                        <Grid item size={{md: 4}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tipo de proyecto</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='context.projectType'
                                value={newRequirement.context.projectType}
                                label="Tipo de proyecto"
                                onChange={handleChange}
                                disabled={visibleMode}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Región donde se implementa"
                        name='context.region'
                        value={newRequirement.context.region}
                        onChange={handleChange}
                        disabled={visibleMode}
                        />
                        </Grid>
                        {/* <Grid item size={{md: 4}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tipo de orígen de datos</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='context.dataSourceType'
                                value={newRequirement.context.dataSourceType}
                                label="Typo de orígen de datos"
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Descripción del proyecto"
                        name='context.projectDescription'
                        value={newRequirement.context.projectDescription}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        disabled={visibleMode}
                        />
                        </Grid>
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Alcance"
                        name='context.projectScopeDescription'
                        value={newRequirement.context.projectScopeDescription}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        disabled={visibleMode}
                        />
                        </Grid>
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Objetivo"
                        name='context.projectObjective'
                        value={newRequirement.context.projectObjective}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        disabled={visibleMode}
                        />
                        </Grid>

                        
                        {/* <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Resultados esperados"
                        name='context.results'
                        value={newProject.context.results}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        />
                        </Grid> */}
                        {/* <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Sistemas o procesos afectados"
                        name='context.systems'
                        value={newProject.context.systems}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        />
                        </Grid> */}
                        <Grid item size={{md: 4}}>
                        <LocalizationProvider 
                            dateAdapter={AdapterDayjs}
                            adapterLocale="es"
                        >
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                   label="Fecha de inicio" 
                                   name='context.startDate'
                                   value={newRequirement.context.startDate}
                                   onChange={(newValue) => setNewRequirement({
                                       ...newRequirement,
                                       ...newRequirement.context.startDate = newValue,
                                   
                                   })}
                                   disabled={visibleMode}
                               
                                />
                            </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item size={{md: 4}}>
                        <LocalizationProvider 
                            
                            dateAdapter={AdapterDayjs}
                            adapterLocale="es"
                        >
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    name='context.finalDate'
                                    label="Fecha de finalización"
                                    value={newRequirement.context.finalDate}
                                    onChange={(newValue) => setNewRequirement({
                                        ...newRequirement,
                                        ...newRequirement.context.finalDate = newValue,
                                    
                                    })}  
                                    disabled={visibleMode} 
                                />
                            </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                </>
                )
            }
             { activeStep === 2 && (
                
                <>
                    {
                        newRequirement.participants.map((participant) => (
                           <Grid item container size={12} spacing={3} key={participant.idParticipant}>
                                 <Grid item size={{md: 4}}>
                                    <TextField
                                    fullWidth
                                    id="outlined-error"
                                    label="Nombre"
                                    name={`participants[${participant.idParticipant}].name`}
                                    value={participant.name}
                                    onChange={handleChange}
                                    disabled={visibleMode}
                />
                            </Grid>
                            <Grid item size={{md: 4}}>
                            <TextField
                            fullWidth
                            id="outlined-error"
                            label="Apellidos"
                            name={`participants[${participant.idParticipant}].surname`}
                            value={participant.surname}
                            onChange={handleChange}
                            disabled={visibleMode}
                            />
                            </Grid>
                            <Grid item size={{md: 4}}>
                            <TextField
                            fullWidth
                            id="outlined-error"
                            label="Email"
                            name={`participants[${participant.idParticipant}].email`}
                            value={participant.email}
                            onChange={handleChange}
                            disabled={visibleMode}
                            />
                            </Grid>
                            <Grid item size={{md: 4}}>
                            <TextField
                            fullWidth
                            id="outlined-error"
                            label="Puesto"
                            name={`participants[${participant.idParticipant}].position`}
                            value={participant.position}
                            onChange={handleChange}
                            disabled={visibleMode}
                            />
                            </Grid>
                        
                            <Grid item size={{md: 3}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Area</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name={`participants[${participant.idParticipant}].area`}
                                value={participant.area}
                                label="Area"
                                onChange={handleChange}
                                disabled={visibleMode}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                            {
                                participant.idParticipant > 0 && !visibleMode && (
                                    <Grid item size={{md: 1}} textAlign={'center'}>
                                <IconButton aria-label="delete" onClick={() => handleDelete(participant.idParticipant)}>
                                    <DeleteIcon sx={{ color: '#f58787'}}/>
                                </IconButton>
                            </Grid>
                                )
                            }
                           </Grid>
                        )) 
                    }
                    <Grid item container size={12} justifyContent={'flex-end'}>
                    {
                        !visibleMode && (
                            <Grid item size={1}>
                            <IconButton aria-label="add" onClick={handleAdd}>
                                <AddCircleIcon sx={{ color: '#432851'}}/>
                            </IconButton>
                            </Grid>
                        )
                    }
                    </Grid>
                </>
            )
            }
            
            { activeStep === 3 && (
                
                <>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Uso que se le dará a la información"
                        name='otherInformation.informationUse'
                        value={newRequirement.otherInformation.informationUse}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        disabled={visibleMode}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Principales Entregables"
                        name='otherInformation.deliverables'
                        value={newRequirement.otherInformation.deliverables}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        disabled={visibleMode}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Principales Riesgos"
                        name='otherInformation.issues'
                        value={newRequirement.otherInformation.issues}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        disabled={visibleMode}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Recursos técnologicos"
                        name='otherInformation.techResources'
                        value={newRequirement.otherInformation.techResources}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        disabled={visibleMode}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Otros requisitos funcionales y no funcionales"
                        name='otherInformation.otherResources'
                        value={newRequirement.otherInformation.otherResources}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        disabled={visibleMode}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Información adicional o Anexos"
                        name='otherInformation.aditionalInformation'
                        value={newRequirement.otherInformation.aditionalInformation}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        disabled={visibleMode}
                        />
                        </Grid>

                        
                    
                </>
            )
            }
            
            {/* { activeStep === 0 && (
                <>
                <Grid item size={{md: 4}}>
                <TextField
                fullWidth
                id="outlined-error"
                label="Nombre de dirección"
                name='mainInformation.directionName'
                value={newRequirement.mainInformation.directionName}
                onChange={handleChange}
                />
                </Grid>
                <Grid item size={{md: 4}}>
                <TextField
                fullWidth
                id="outlined-error"
                label="Nombre del proyecto"
                name='mainInformation.projectName'
                value={newRequirement.mainInformation.projectName}
                onChange={handleChange}
                />
                </Grid>
                <Grid item size={{md: 4}}>
                <TextField
                fullWidth
                id="outlined-error"
                label="Area participante"
                name='mainInformation.area'
                value={newRequirement.mainInformation.area}
                onChange={handleChange}
                />
                </Grid>
                <Grid item size={{md: 4}}>
                        <LocalizationProvider 
                            dateAdapter={AdapterDayjs}
                            adapterLocale="es"
                        >
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Fecha de elaboración" />
                            </DemoContainer>
                            </LocalizationProvider>
                </Grid>
                <Grid item size={{md: 4}}>
                <LocalizationProvider 
                    dateAdapter={AdapterDayjs}
                    adapterLocale="es"
                >
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Fecha de inicio del proyecto" />
                    </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item size={{md: 4}}>
                <LocalizationProvider 
                    dateAdapter={AdapterDayjs}
                    adapterLocale="es"
                >
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Fecha tentativa de finalización del proyecto" />
                    </DemoContainer>
                    </LocalizationProvider>
                </Grid>

                </>

            )
                
            }
            {
                activeStep === 1 && (
                    <>
                       
                       
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Descripción detallada del proyecto"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Situación problemática a resolver"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Hipótesis"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Alcance"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Antecedentes"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Objetivos Estrátegicos"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Objetivos Operativos"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Expectativas del producto de Datos Deseado"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Interoperabilidad de datos"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>
                </>
                )
            } */}
            
            {/* {
                activeStep === 1 && (
                    <>
                       
                       
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Descripción detallada del proyecto"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Situación problemática a resolver"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Hipótesis"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Alcance"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Antecedentes"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Objetivos Estrátegicos"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Objetivos Operativos"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Expectativas del producto de Datos Deseado"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>

                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Interoperabilidad de datos"
                        name='n'
                        value={user.nombre}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        />
                        </Grid>
                </>
                )
            } */}
            {/* {
                activeStep === 2 && (
                    <>
                       
                       
                        <Grid item container size={12}>
                            <Grid item size={12}>
                                <Typography>Responsable del levantamiento</Typography>
                            </Grid>
                            <Grid item container size={12} spacing={2}>
                                <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Nombre"
                        name='nombre'
                        value={user.nombre}
                        onChange={handleChange}
                        />
                                </Grid>
                                <Grid item size={{md: 4}}>
                                <TextField
                                fullWidth
                                id="outlined-error"
                                label="Apellido paterno"
                                name='apellidoP'
                                value={user.apellidoP}
                                onChange={handleChange}
                                />
                                </Grid>
                                <Grid item size={{md: 4}}>
                                <TextField
                                fullWidth
                                id="outlined-error"
                                label="Apellido Materno"
                                name='apellidoM'
                                value={user.apellidoM}
                                onChange={handleChange}
                                />
                                </Grid>
                                <Grid item size={{md: 4}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Puesto</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='area'
                    value={user.area}
                    label="Age"
                    onChange={handleChange}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                                </Grid>
                                <Grid item size={{md: 4}}>
                                    <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Area</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='area'
                                    value={user.area}
                                    label="Age"
                                    onChange={handleChange}
                                    >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item container size={12}>
                            <Grid item size={12}>
                                <Typography>Responsable del proyecto</Typography>
                            </Grid>
                            <Grid item container size={12} spacing={2}>
                                <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Nombre"
                        name='nombre'
                        value={user.nombre}
                        onChange={handleChange}
                        />
                                </Grid>
                                <Grid item size={{md: 4}}>
                                <TextField
                                fullWidth
                                id="outlined-error"
                                label="Apellido paterno"
                                name='apellidoP'
                                value={user.apellidoP}
                                onChange={handleChange}
                                />
                                </Grid>
                                <Grid item size={{md: 4}}>
                                <TextField
                                fullWidth
                                id="outlined-error"
                                label="Apellido Materno"
                                name='apellidoM'
                                value={user.apellidoM}
                                onChange={handleChange}
                                />
                                </Grid>
                                <Grid item size={{md: 4}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Puesto</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='area'
                    value={user.area}
                    label="Age"
                    onChange={handleChange}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                                </Grid>
                                
                            </Grid>
                        </Grid>

                        <Grid item container size={12}>
                            <Grid item size={12}>
                                <Typography>Participantes en el proyecto</Typography>
                            </Grid>
                            <Grid item container size={12} spacing={2}>
                            {
                        participantes.map((participante, index) => (
                           <Grid item container size={12} spacing={3} key={participante.idParticipante}>
                                 <Grid item size={{md: 4}}>
                                    <TextField
                                    fullWidth
                                    id="outlined-error"
                                    label="Nombre"
                                    name='nombre'
                                    value={participante.nombre}
                                    onChange={handleChange}
                />
                            </Grid>
                            <Grid item size={{md: 4}}>
                            <TextField
                            fullWidth
                            id="outlined-error"
                            label="Apellidos"
                            name='apellidoP'
                            value={participante.apellidos}
                            onChange={handleChange}
                            />
                            </Grid>
                            <Grid item size={{md: 4}}>
                            <TextField
                            fullWidth
                            id="outlined-error"
                            label="Email"
                            name='apellidoP'
                            value={participante.apellidos}
                            onChange={handleChange}
                            />
                            </Grid>
                        
                            <Grid item size={{md: 4}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Puesto</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='rol'
                                value={participante.rol}
                                label=""
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                            <Grid item size={{md: 4}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Area</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='rol'
                                value={participante.rol}
                                label=""
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                            {
                                participante.idParticipante > 0 && (
                                    <Grid item size={{md: 1}} textAlign={'center'}>
                                <IconButton aria-label="delete" onClick={() => handleDelete(participante.idParticipante)}>
                                    <DeleteIcon sx={{ color: '#f58787'}}/>
                                </IconButton>
                            </Grid>
                                )
                            }
                           </Grid>
                        )) 
                    }
                    <Grid item container size={12} justifyContent={'flex-end'}>
                    <Grid item size={1}>
                    <IconButton aria-label="add" onClick={handleAdd}>
                        <AddCircleIcon sx={{ color: '#432851'}}/>
                    </IconButton>
                    </Grid>
                    </Grid>
                                
                            </Grid>
                        </Grid>


                </>
                )
            } */}
            
            {/* { activeStep === 4 && (
                
                <>
                    {
                        participantes.map((participante, index) => (
                           <Grid item container size={12} spacing={3} key={participante.idParticipante}>
                                 <Grid item size={{md: 4}}>
                                    <TextField
                                    fullWidth
                                    id="outlined-error"
                                    label="Nombre"
                                    name='nombre'
                                    value={participante.nombre}
                                    onChange={handleChange}
                />
                            </Grid>
                            <Grid item size={{md: 4}}>
                            <TextField
                            fullWidth
                            id="outlined-error"
                            label="Apellidos"
                            name='apellidoP'
                            value={participante.apellidos}
                            onChange={handleChange}
                            />
                            </Grid>
                            <Grid item size={{md: 4}}>
                            <TextField
                            fullWidth
                            id="outlined-error"
                            label="Email"
                            name='apellidoP'
                            value={participante.apellidos}
                            onChange={handleChange}
                            />
                            </Grid>
                        
                            <Grid item size={{md: 4}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Area</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='rol'
                                value={participante.rol}
                                label=""
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>

                            <Grid item size={{md: 4}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Puesto</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='rol'
                                value={participante.rol}
                                label=""
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid>
                            {
                                participante.idParticipante > 0 && (
                                    <Grid item size={{md: 1}} textAlign={'center'}>
                                <IconButton aria-label="delete" onClick={() => handleDelete(participante.idParticipante)}>
                                    <DeleteIcon sx={{ color: '#f58787'}}/>
                                </IconButton>
                            </Grid>
                                )
                            }
                           </Grid>
                        )) 
                    }
                    <Grid item container size={12} justifyContent={'flex-end'}>
                    <Grid item size={1}>
                    <IconButton aria-label="add" onClick={handleAdd}>
                        <AddCircleIcon sx={{ color: '#432851'}}/>
                    </IconButton>
                    </Grid>
                    </Grid>
                </>
            )
            } */}
            

            <Grid item container size={12} justifyContent={'space-around'}>
                <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                >
                    Atrás
                </Button>
                <Button onClick={activeStep === steps.length - 1 ? handleSend : handleNext}>
                {activeStep === steps.length - 1 ? visibleMode ? '' : 'Envíar' : 'Siguiente'}
                </Button>
            </Grid>
        </Grid>
      </Grid>
    </Box>
    </div>

    </>
        
        
    
  );
}
