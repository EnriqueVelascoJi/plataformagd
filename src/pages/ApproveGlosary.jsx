import * as React from 'react';
import { useState, useEffect } from 'react';

//MUI Components 
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import NavBar from '../components/NavBar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


//Icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

//Date
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { deDE } from '@mui/x-date-pickers/locales';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "dayjs/locale/es";
import dayjs from 'dayjs';

//React components

//Router
import { useNavigate, useParams } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateProjectForm } from '../features/projectSlice';


//Page Style

//Alerts
import Swal from 'sweetalert2'

//Table
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';


const styles = {
    title: {
        fontWeight: '300',
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

//Dominios
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

//Pasos 
const steps = ['Contexto del proyecto', 'Participantes'];

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
const regions = [
    {
        id: 1,
        region: 'México'
    },
    {
        id: 1,
        region: 'España'
    },
    {
        id: 3,
        region: 'Centroamérica'
    }
]

export default function ApproveGlosary() {

    //Local variables
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let {id} = useParams()
    const userId = localStorage.getItem('userId')
    const glosaryPath = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/glosary/${id}`
    const userPath = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/usuariogd/${userId}`
    const path = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/process/${userId}`;
    const notificationPath = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/project_status`


    //Global State
    //const project = useSelector((state) => state.project.newProject)
    //console.log(project)
    //const visibleMode = useSelector(state => state.project.visibleMode)
    const globalStatus = useSelector(state => state.project.globalStatus)
    const {projectId, isProjectAccepted} = globalStatus
    const notification = useSelector(state => state.notification.notificationInformation)

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
            width: 130
        },
        {
            field: 'subdomain',
            headerName: 'Subdominio',
            width: 130
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
        }
      ];

    //const user = useSelector(state => state.user.userInformation)
    //console.log('user', user)
    

    //Local State 
     const [newProject, setNewProject] = useState({
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
            projectDescription: '',
            projectScopeDescription: '',
            projectObjective: '',
            region: '',
            informationUse: '',
            deliverables: '',
            aditionalInformation: '',
            startDate: dayjs(new Date()),
            finalDate: dayjs(new Date())

         },
         participants: [
            {   
               idParticipant: 1,
               name: '',
               surname: '',
               email: '',
               position: '',
               area: 0,
               rol: 0           
                
            }
        ]
     })
    
    
    const [domains, setDomains] = useState(domainsAux)
    const [subdomains, setSubdomains] = useState([])
    const [roles, setRoles] = useState({})
    const [perfiles, setPerfiles] = useState([])
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = React.useState({});
    const [visibleMode, setVisibleMode] = useState(false)
    const [open, setOpen] = useState(false)
    const [rejectReason, setRejectReason] = useState('')
    const [terms, setTerms] = useState([])


    //Handles
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
    setOpen(false);
    setRejectReason('')
    };
    
    const handleChangeParticipants = (keyObject, fieldObject, fieldValue) => {

        const id = parseInt(keyObject.split('[')[1].substring(0, keyObject.length - 1))

        const newProjectAux = newProject
        newProjectAux.participants[id][fieldObject] = fieldValue
        
        setNewProject({...newProjectAux})

        
        
        

    }
    const handleChange = (e) => {


        const fieldName = e.target.name
        const fieldValue = e.target.value

        const nameSplit = fieldName.split('.') 
        const keyObject = nameSplit[0]
        const fieldObject = nameSplit[1] 


        if(keyObject.includes('participants')) {
            handleChangeParticipants(keyObject, fieldObject, fieldValue)

        } else {
            const newProjectAux = newProject
            newProjectAux[keyObject][fieldObject] = fieldValue

            setNewProject({...newProjectAux})
            if(fieldObject === 'domain') {
                const domainId = fieldValue
                setSubdomains(domains[domainId].subdomains)
            }
        }


        
    };

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

        const newId = newProject.participants.length + 1
        console.log(newId)
        const newParticipant = {
            idParticipant: newId,
                name: '',
               surname: '',
               email: '',
               position: '',
               area: 0,
               rol: 0       
        }


        const newParticipants = newProject.participants
        newParticipants.push(newParticipant)
        console.log(newParticipants)
        const newProjectAux = newProject
        newProjectAux.participants = newParticipants

        setNewProject({...newProjectAux})

    }

    const handleReject = async() => {
        const {idnotification, idassociate, nameassociate, isanswered, isactive, idusersend, iduserreceiver} = notification

        let url = notificationPath
        let body = {
            idNotification: idnotification,
            idProject: idassociate,
            idUserSend: iduserreceiver,
            idUserReceiver: idusersend,
            flag: 'glosaryRejected',
            rejected: rejectReason
        } 
        console.log(body)
        try {
        
            const response = await fetch(url, {
                method: "PATCH", 
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
                mode: 'cors'
            
            });
            const result = await response.json();
    
            console.log(result.data)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Respuesta enviada",
                showConfirmButton: false,
                timer: 2500,
                
              });
    
            navigate('/home')
    
        } catch (error) {
            console.log(error)
        }
    }
    const handleAccept = async() => {
        const {idnotification, idassociate, nameassociate, isanswered, isactive, idusersend, iduserreceiver} = notification

        let url = notificationPath
        let body = {
            idNotification: idnotification,
            idProject: idassociate,
            idUserSend: iduserreceiver,
            idUserReceiver: idusersend,
            flag: 'glosaryAccepted'
        }
        console.log(body)
        try {
        
            const response = await fetch(url, {
                method: "PATCH", 
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
                mode: 'cors'
            
            });
            const result = await response.json();
    
            console.log(result.data)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Respuesta enviada",
                showConfirmButton: false,
                timer: 2500,
                
              });
            navigate('/home')
    
        } catch (error) {
            console.log(error)
        }
        
    }
    
    const handleDelete = (id) => {

        const newParticipants = newProject.participants.filter( participant => participant.idParticipant !== id)
        const newProjectAux = newProject
        newProjectAux.participants = newParticipants
        
        setNewProject({...newProjectAux})

    }
    const handleSubmit = async() => {

        const url = projectPath
        const {context} = newProject
        context['userId'] = userId
        try {
        
            const response = await fetch(url, {
                method: "POST", 
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newProject),
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
          dispatch(updateProjectForm(newProject))
          navigate('/proyectos')

        } catch (error) {
            console.log(error)
        }
        
        
    }
    
    const getGlosary = async() => {

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
  
    useEffect(() => {
        if(id) {
            getGlosary()
        } 
        
    }, [])


  return (
    <>
    <NavBar />


  


    <div style={styles.layout}>
    <Box sx={{ flexGrow: 1, padding: 1 }}>
      <Grid container spacing={4}>
        <Grid container size={12} justifyContent={'space-between'} alignItems={'center'}>
            <Grid size={12}>
                <Typography variant='h4' style={styles.title}>Aprobar Glosario</Typography>
            </Grid>
            

           
        </Grid>
        <Grid  container item size={{ xs: 12, md: 12 }}>
            <Grid container item size={{ xs: 12, md: 12 }}>
                <Grid item container size={{md: 12}}>
                <Alert severity="info">Términos en solicitud</Alert>
                </Grid>
                <div
                    className="ag-theme-quartz"
                    style={{ height: 300, width: '100%' }}
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
            
                <Grid item container size={12} justifyContent={'flex-end'}>
                <Button
                variant="contained" color="error"
                onClick={handleOpen}
                sx={{ mr: 1, textTransform: 'none' }}
                >
                    Rechazar
                </Button>
                <Button
                variant="contained" color="success"
                onClick={handleAccept}
                sx={{ mr: 1, textTransform: 'none' }}
                >
                    Aceptar
                </Button>
                
            </Grid>
               
        </Grid>
      </Grid>
    </Box>

    {/* En caso de rechazo */}
    <Dialog
        open={open}
        onClose={handleClose}
        
      >
        <DialogTitle>¿Esta solcitud no cumple con los requisitos de aceptación?</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Escríbe aquí los motivos por los cuales tuviste que rechazar la solicitud
          </DialogContentText>
          <TextField
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            autoFocus
            id="reject"
            name="reject"
            label="Motivo de rechazo"
            type="text"
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' variant='contained' onClick={handleClose} sx={{ textTransform: 'none'}}>Cancelar</Button>
          <Button color='success' variant='contained' onClick={handleReject} sx={{ textTransform: 'none'}}>Rechazar</Button>
        </DialogActions>
      </Dialog>
    

    </div>

    </>
        
        
    
  );
}
