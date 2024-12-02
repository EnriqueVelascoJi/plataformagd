import * as React from 'react';
import { useState, useEffect } from 'react';

//MUI Components 
import { styled } from '@mui/material/styles';
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
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Snackbar from '@mui/material/Snackbar'
import Chip from '@mui/material/Chip';



//Icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


//Date
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { deDE } from '@mui/x-date-pickers/locales';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "dayjs/locale/es";
import dayjs from 'dayjs';

//Transitions
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}


//Router
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateProjectForm, updateGlosary } from '../features/projectSlice';


//Alerts
import Swal from 'sweetalert2'


//Page Style
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{width: '100%'}}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const styles = {
    title: {
        fontWeight: '300',
        color: '#432851',
  
    },
      layout: {
          maxWidth: '100%',
          marginLeft: '260px'
      },
      button1: {
          backgroundColor: '#D53638'
      },
      button2: {
          backgroundColor: '#E4B653'
      }
  

}


//React components
import EditTable from '../components/EditTable'
  




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
const regiones = [
    {
        id: 1,
        region: 'Mexico'
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

export default function ProjectPath() {

 	

    //Local variables
    const dispatch = useDispatch()
    let {id} = useParams()
    const navigate = useNavigate()
    const dictPath = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/dict'
    const glosaryPath = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/glosary'
    const glosaryTermPath = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/glosary/${id}`
    const completePath = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/complete/${id}`
    const statusPath = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/status/${id}`
    const globalStatus = useSelector(state => state.project.globalStatus)
    const glosary = useSelector(state => state.project.glosary)
    const userId = localStorage.getItem('userId')
    const {projectId, isProjectAccepted, requirementId, isRequirementAccepted} = globalStatus
    //const steps = ['Plan de trabajo', 'Glosario de Términos', 'Catálogo de Objetos', 'Diccionario de Datos', 'Reglas de negocio, técnicas y lógicas', 'Aprobación', 'Publicación']
    const stepsExtend = [
      'Alta del procedimiento de gobierno del proyecto de datos',
      'Incluir actividades del proceso al plan de trabajo del proyecto',
      'Identificación de información de los términos de negocio',
      'Identificación de activos de datos	Catálogo de objetos',
      'Identificación de información técnica de los datos',
      'Identificación de requisitos de negocio y técnicos para los datos',
      'Revisión y validación de la información por parte de la OGD',
      'Aprobación de la información identificada por parte de la OGD',	
      'Publicación y disponibilidad'
    ]
    const stepsArtifacts= [
      'Formulario',
     ' Plan de trabajo',
      'Glosario de términos',
      'Catálogo de objetos',
     ' Diccionario de Datos',
      'Reglas de negocio, técnicas y lógicas'
    ]
    const steps = [
      'Procedimeinto',
      'Plan de trabajo',
      'Términos de negocio',
      'Catálogo de objetos',
      'Información técnica',
      'Requisitos de datos',
      'Revisión y validación',
      'Aprobación',
      'Publicación'
    ]
    const projectSteps = ['Alta de proyecto | inciativa', 'Levantamiento de requerimeinto']
    const secondSteps = [
      {
        label: 'Sube el template del diccioanrio de datos',
        description: `En este paso es necesario subas el template que a continuación se te presenta`,
      },
    ];
    const thirdSteps = [
      {
        label: 'Sube el template del Glosario de términos',
        description: `En este paso es necesario subas el template que a continuación se te presenta`,
      },
    ];
    const fourthSteps = [
        {
          label: 'Sube el template del glosario de términos',
          description: `En este paso es necesario subas el template que a continuación se te presenta`,
        },
      ];
      const fifthSteps = [
        {
          label: 'Sube el template del glosario de términos',
          description: `En este paso es necesario subas el template que a continuación se te presenta`,
        },
      ];
      const sixthSteps = [
        {
          label: 'Sube el template del glosario de términos',
          description: `En este paso es necesario subas el template que a continuación se te presenta`,
        },
      ];
      const [searchParams] = useSearchParams();
      const flagNotification = searchParams.get('flag');

    //State 
    const [value, setValue] = React.useState(0);
    const [activeProjectStep, setActiveProjectStep] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [secondActiveStep, setSecondActiveStep] = useState(0);
    const [thirdActiveStep, setThirdActiveStep] = useState(0);
    const [completed, setCompleted] = useState([true, false, false,false, false, false,false, false, false])
    const [status, setStatus] = useState(['', '', '','', '', '','', '', ''])
    const [file, setFile] = useState({})
    const [file2, setFile2] = useState({})
    const [dict, setDict] = useState('')
    const [open, setOpen] = useState(false);
    const [rejectOpen, setRejectOpen] = useState(false)
    const [rejectReason, setRejectReason] = useState('')

    const [glosaryStatus, setGlosaryStatus] = useState(0)
    const [glosaryNew, setGlosaryNew] = useState(true)

   


    //Functions
    const justifyDict = async() => {
        const url = dictPath
        const body = {
          justification: dict,
          idProcessProcedure
        }
          try {
          
              const response = await fetch(url, {
                  method: "POST", 
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
      const viewReject = () => {
        setRejectOpen(true)
    }
    const hideReject = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
      
        setRejectOpen(false)
    }
    const getGlosary = async() => {

      const url = glosaryTermPath
      console.log(url)
      try {
          const response = await fetch(url);
          const result = await response.json();
  
          const normalData = result.data;
          console.log({normalData})
          if(normalData.length > 0) {
            if(normalData[0].rejected) setRejectReason(normalData[0].rejected)
            if(normalData[0].idstatus === 5 ){
              setGlosaryNew(false)
            }
            
          }

            dispatch(updateGlosary(normalData))

      } catch (error) {
          console.log(error)
      }
      }
  
      //Handles
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      const handleUploadFile = () => {
        console.log('ewdgfvsdfdjgfdsjfgdsgj')
      }
      const handleClick = () => {
        console.info('You clicked the Chip.');
      };
    
      const handleDelete = () => {
        console.info('You clicked the delete icon.');
      };
      const handleStep = (step) => () => {
      setActiveStep(step);
      };
      const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
      const handleSecondStep = (step) => () => {
        setSecondActiveStep(step);
      };
      const handleSecondNext = () => {
        setSecondActiveStep((prevActiveStep) => prevActiveStep + 1);
        justifyDict()
      };
    
      const handleBack = () => {
        setSecondActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
  
      const handleThirdStep = (step) => () => {
        setThirdActiveStep(step);
      };
      const handleThirdNext = () => {
        setThirdActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
      const handleProjectStep = (step) => () => {
        
        if(step === 0) {
          navigate('/proyecto')
        } 
        if( step === 1) {
          navigate('/requerimiento')
        }
      }; 
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
      const createGlosaryTerms = async () => {

          const url = glosaryPath
          const body = {
            glosary,
            idProject: parseInt(id),
            userId: userId
          }
          console.log(body)
          try {
        
            const response = await fetch(url, {
                method: "POST", 
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
            title: "Solicitud enviada a la oficina de GD",
            showConfirmButton: false,
            timer: 2500,
            
          });
          navigate('/proyectos')

        } catch (error) {
            console.log(error)
        }
      }
      const updateGlosaryTerms = async () => {

        const url = glosaryTermPath
        const body = {
          glosary,
          idProject: parseInt(id),
          userId: userId
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
          title: "Solicitud enviada a la oficina de GD",
          showConfirmButton: false,
          timer: 2500,
          
        });
        navigate('/proyectos')

      } catch (error) {
          console.log(error)
      }
    }
      const getComplete = async() => {
        const url = completePath
        console.log(url)
        try {
            const response = await fetch(url);
            const result = await response.json();
    
            const normalData = result.data;
            console.log(normalData)
            const completeArray = [true, false, false,false, false, false,false, false, false]
            if(normalData['glosary']) completeArray[2] = true
            setCompleted(completeArray)
    
          

        } catch (error) {
            console.log(error)
        }
      }
      const getStatus = async() => {
        const url = statusPath
        console.log(url)
        try {
            const response = await fetch(url);
            const result = await response.json();
    
            const normalData = result.data;
            console.log(normalData)
            const statusArray = ['', '', '','', '', '','', '', '']
            const {glosary} = normalData
            if(glosary.statusname === 'En revisión') statusArray[2] = 'En revisión'
            if(glosary.statusname === 'Rechazado') statusArray[2] = 'Rechazado'
            console.log(statusArray)
            setStatus(statusArray)
    
        } catch (error) {
            console.log(error)
        }
      }
 
      useEffect(() => {
        setOpen(true)
        if(id) {
          getComplete()
          getStatus()
        }
      }, [])

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
                <Typography variant='h4' style={styles.title}>Ruta de gobierno de proyecto del proyecto de datos</Typography>
            </Grid>
            <Alert severity="info" color='warning' >En esta sección se te habilita la ruta de gobierno del proyecto de datos.</Alert>

           
        </Grid>
        <Grid  container item size={{ xs: 12, md: 12 }}>
        <Grid item size={12}>
                <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                  {steps.map((label, index) => (
                    <Step key={label} completed={completed[index] }>
                      <StepButton onClick={handleStep(index)}>
                      <Chip label={completed[index] ? 'Terminado' : status[index] === 'En revisión' ? 'En revisión' : status[index] === 'Rechazado' ? 'Rechazado' : 'No iniciado'}  color={completed[index] ? 'success' : status[index] === 'En revisión' ? 'warning' : status[index] === 'Rechazado' ? 'error' : 'inherit'} variant="filled" size='small' sx={{ fontSize: '9px'}}/>
                        <p style={{fontSize: '11px'}}>{label}</p>
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid item container size={12} spacing={3} justifyContent={'center'}>
                
                {
                  activeStep === 1 && (
                    <>
                      <Grid item size={8}>
                      <Alert severity="info" color='info' >{stepsExtend[activeStep]}</Alert>
                      </Grid>

                      <Stepper activeStep={thirdActiveStep} orientation="vertical" nonLinear>
                        {thirdSteps.map((step, index) => (
                          <Step key={step.label}>
                            <StepButton
                              onClick={handleThirdStep(index)}
                              optional={
                                index === thirdSteps.length - 1 ? (
                                  <Typography variant="caption">{step.description}
                                  <br />
                                  <a href="https://gado-my.sharepoint.com/:x:/g/personal/brenda_guzman_mobilityado_com/EYqSn8FYPCtEsbW5ag4KAKkBTTlAydcAWmxMqCbWx8jLBQ?wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1732118224183&web=1" target='_blank'>{stepsArtifacts[activeStep]}</a></Typography>
                                ) : null
                              }
                            >
                              {step.label}
                            </StepButton>
                            <StepContent>
                             
                              
                              {/* <Typography variant='caption'>{step.description}</Typography> */}
                              <Box sx={{ mb: 2 }}>
                              {thirdActiveStep === thirdSteps.length - 1 ? (
                                <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                size='small'
                                sx={{textTransform: 'none'}}
                              >
                                Subir archivo
                                <VisuallyHiddenInput
                                  type="file"
                                  onChange={(event) => setFile2(event.target.files)}
                                  multiple
                                />
                              </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={handleThirdNext}
                                  sx={{ mt: 1, mr: 1, textAlign: 'end', textTransform: 'none' }}
                            
                                  size='small'
                                >
                                  Envíar
                                </Button>
                              )}
                              </Box>
                            </StepContent>
                          </Step>
                        ))}
                        <Grid item container size={12} justifyContent={'flex-end'}>
                            {Object.keys(file2).length > 0 && (
                              <Button 
                                variant="contained" 
                                color="success"
                                onClick={handleNext}>
                              Completar procedimiento
                            </Button>
                            )}
                      </Grid>
                      </Stepper>
                    
                    </>
                  )
                }
                {
                  activeStep === 2 && (
                    <>
                      <Grid item size={8}>
                      <Alert severity="info" color='info' >{stepsExtend[activeStep]}</Alert>
                      </Grid>
                    
                      <Stepper activeStep={thirdActiveStep} orientation="vertical" nonLinear>
                        {thirdSteps.map((step, index) => (
                          <Step key={step.label}>
                            <StepButton
                              onClick={handleThirdStep(index)}
                              optional={
                                index === thirdSteps.length - 1 ? (
                                  <Typography variant="caption">{step.description}
                                  <br />
                                  <a href="https://gado-my.sharepoint.com/:x:/g/personal/brenda_guzman_mobilityado_com/EYqSn8FYPCtEsbW5ag4KAKkBTTlAydcAWmxMqCbWx8jLBQ?wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1732118224183&web=1" target='_blank'>{stepsArtifacts[activeStep]}</a></Typography>
                                ) : null
                              }
                            >
                              {step.label}
                            </StepButton>
                            <StepContent>

                            <Box sx={{ width: 'auto', position: 'absolute' }}>
                              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                  <Tab label="Archivo" {...a11yProps(0)} sx={{textTransform: 'none'}}/>
                                  <Tab label="Manual" {...a11yProps(1)} sx={{textTransform: 'none'}}/>
                                </Tabs>
                              </Box>
                              <CustomTabPanel value={value} index={0}>
                              <Box sx={{ mb: 2 }}>
                              {thirdActiveStep === thirdSteps.length - 1 ? (
                                <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                size='small'
                                sx={{textTransform: 'none'}}
                              >
                                Subir archivo
                                <VisuallyHiddenInput
                                  type="file"
                                  onChange={(event) => setFile2(event.target.files)}
                                  multiple
                                />
                              </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={handleThirdNext}
                                  sx={{ mt: 1, mr: 1, textAlign: 'end', textTransform: 'none' }}
                            
                                  size='small'
                                >
                                  Envíar
                                </Button>
                              )}
                              </Box>
                              </CustomTabPanel>
                              <CustomTabPanel value={value} index={1}>
                                <EditTable />
                              </CustomTabPanel>
                              
                            </Box>
                             
                              
                              {/* <Typography variant='caption'>{step.description}</Typography> */}
                             
                            </StepContent>
                          </Step>
                        ))}
                        <Grid item container size={12} justifyContent={'flex-end'}>
                           
                              <Button
                              sx={{ textTransform: 'none'}}
                                variant="contained" 
                                color="success"
                                onClick={glosaryNew ? createGlosaryTerms : updateGlosaryTerms}
                                disabled={completed[activeStep] || status[activeStep] === 'En revisión'}
                                >
                              Completar procedimiento
                            </Button>
                      </Grid>
                      </Stepper>
                    
                    </>
                  )
                }
                {
                  activeStep === 3 && (
                    <>
                      <Grid item size={8}>
                      <Alert severity="info" color='info' >{stepsExtend[activeStep]}</Alert>
                      </Grid>

                      <Stepper activeStep={thirdActiveStep} orientation="vertical" nonLinear>
                        {thirdSteps.map((step, index) => (
                          <Step key={step.label}>
                            <StepButton
                              onClick={handleThirdStep(index)}
                              optional={
                                index === thirdSteps.length - 1 ? (
                                  <Typography variant="caption">{step.description}
                                  <br />
                                  <a href="https://gado-my.sharepoint.com/:x:/g/personal/brenda_guzman_mobilityado_com/EYqSn8FYPCtEsbW5ag4KAKkBTTlAydcAWmxMqCbWx8jLBQ?wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1732118224183&web=1" target='_blank'>{stepsArtifacts[activeStep]}</a></Typography>
                                ) : null
                              }
                            >
                              {step.label}
                            </StepButton>
                            <StepContent>
                            
                             
                              
                              {/* <Typography variant='caption'>{step.description}</Typography> */}
                              <Box sx={{ mb: 2 }}>
                              {thirdActiveStep === thirdSteps.length - 1 ? (
                                <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                size='small'
                                sx={{textTransform: 'none'}}
                              >
                                Subir archivo
                                <VisuallyHiddenInput
                                  type="file"
                                  onChange={(event) => setFile2(event.target.files)}
                                  multiple
                                />
                              </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={handleThirdNext}
                                  sx={{ mt: 1, mr: 1, textAlign: 'end', textTransform: 'none' }}
                            
                                  size='small'
                                >
                                  Envíar
                                </Button>
                              )}
                              </Box>
                            </StepContent>
                          </Step>
                        ))}
                        <Grid item container size={12} justifyContent={'flex-end'}>
                            {Object.keys(file2).length > 0 && (
                              <Button 
                                variant="contained" 
                                color="success"
                                onClick={handleNext}>
                              Completar procedimiento
                            </Button>
                            )}
                      </Grid>
                      </Stepper>
                    
                    </>
                  )
                }
                {
                  activeStep === 4 && (
                    <>
                      <Grid item size={8}>
                      <Alert severity="info" color='info' >{stepsExtend[activeStep]}</Alert>
                      </Grid>

                      <Stepper activeStep={thirdActiveStep} orientation="vertical" nonLinear>
                        {thirdSteps.map((step, index) => (
                          <Step key={step.label}>
                            <StepButton
                              onClick={handleThirdStep(index)}
                              optional={
                                index === thirdSteps.length - 1 ? (
                                  <Typography variant="caption">{step.description}
                                  <br />
                                  <a href="https://gado-my.sharepoint.com/:x:/g/personal/brenda_guzman_mobilityado_com/EYqSn8FYPCtEsbW5ag4KAKkBTTlAydcAWmxMqCbWx8jLBQ?wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1732118224183&web=1" target='_blank'>{stepsArtifacts[activeStep]}</a></Typography>
                                ) : null
                              }
                            >
                              {step.label}
                            </StepButton>
                            <StepContent>
                             
                              
                              {/* <Typography variant='caption'>{step.description}</Typography> */}
                              <Box sx={{ mb: 2 }}>
                              {thirdActiveStep === thirdSteps.length - 1 ? (
                                <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                size='small'
                                sx={{textTransform: 'none'}}
                              >
                                Subir archivo
                                <VisuallyHiddenInput
                                  type="file"
                                  onChange={(event) => setFile2(event.target.files)}
                                  multiple
                                />
                              </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={handleThirdNext}
                                  sx={{ mt: 1, mr: 1, textAlign: 'end', textTransform: 'none' }}
                            
                                  size='small'
                                >
                                  Envíar
                                </Button>
                              )}
                              </Box>
                            </StepContent>
                          </Step>
                        ))}
                        <Grid item container size={12} justifyContent={'flex-end'}>
                            {Object.keys(file2).length > 0 && (
                              <Button 
                                variant="contained" 
                                color="success"
                                onClick={handleNext}>
                              Completar procedimiento
                            </Button>
                            )}
                      </Grid>
                      </Stepper>
                    
                    </>
                  )
                }
                {
                  activeStep === 5 && (
                    <>
                      <Grid item size={8}>
                      <Alert severity="info" color='info' >{stepsExtend[activeStep]}</Alert>
                      </Grid>

                      <Stepper activeStep={thirdActiveStep} orientation="vertical" nonLinear>
                        {thirdSteps.map((step, index) => (
                          <Step key={step.label}>
                            <StepButton
                              onClick={handleThirdStep(index)}
                              optional={
                                index === thirdSteps.length - 1 ? (
                                  <Typography variant="caption">{step.description}
                                  <br />
                                  <a href="https://gado-my.sharepoint.com/:x:/g/personal/brenda_guzman_mobilityado_com/EYqSn8FYPCtEsbW5ag4KAKkBTTlAydcAWmxMqCbWx8jLBQ?wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1732118224183&web=1" target='_blank'>{stepsArtifacts[activeStep]}</a></Typography>
                                ) : null
                              }
                            >
                              {step.label}
                            </StepButton>
                            <StepContent>
                             
                              
                              {/* <Typography variant='caption'>{step.description}</Typography> */}
                              <Box sx={{ mb: 2 }}>
                              {thirdActiveStep === thirdSteps.length - 1 ? (
                                <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                size='small'
                                sx={{textTransform: 'none'}}
                              >
                                Subir archivo
                                <VisuallyHiddenInput
                                  type="file"
                                  onChange={(event) => setFile2(event.target.files)}
                                  multiple
                                />
                              </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={handleThirdNext}
                                  sx={{ mt: 1, mr: 1, textAlign: 'end', textTransform: 'none' }}
                            
                                  size='small'
                                >
                                  Envíar
                                </Button>
                              )}
                              </Box>
                            </StepContent>
                          </Step>
                        ))}
                        <Grid item container size={12} justifyContent={'flex-end'}>
                            {Object.keys(file2).length > 0 && (
                              <Button 
                                variant="contained" 
                                color="success"
                                onClick={handleNext}>
                              Completar procedimiento
                            </Button>
                            )}
                      </Grid>
                      </Stepper>
                    
                    </>
                  )
                }
              </Grid>
               
        </Grid>
      </Grid>
      
    </Box>

    {/* Alerta */}

    {
      flagNotification === 'projectAccepted' && ( 
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} TransitionComponent={SlideTransition}>
      <Alert
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        La Oficina de Gobierno de Datos ha aprobado tu solicitud
      </Alert>
    </Snackbar>
      )
    }
     {
      flagNotification === 'glosaryAccepted' && ( 
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} TransitionComponent={SlideTransition}>
      <Alert
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        La Oficina de Gobierno de Datos ha aprobado el procedimeinto de Glosario de términos
      </Alert>
    </Snackbar>
      )
    }
    {
      flagNotification === 'glosaryRejected' && ( 
        <Snackbar open={open}  onClose={handleClose} TransitionComponent={SlideTransition}>
        <Alert
            severity="error"
            variant="filled"
            sx={{ width: '70%' }}
        >
            La Oficina de Gobierno de Datos ha rechazado tu Glosario de Términos. <Button sx={{textTransform: 'none', cursor: 'pointer', color: 'white'}} onClick={viewReject}>Ver más</Button>
        </Alert>
    </Snackbar>
      )
    }

    {/* Mostrar información del rechazo */}
    <Snackbar
        open={rejectOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'left'}}

    >
        <Alert
        onClose={hideReject}
        severity="info" color='error'
        sx={{ width: '100%' }}
        >
            {rejectReason}
        </Alert>
    </Snackbar>
    </div>

    </>
        
        
    
  );
}
