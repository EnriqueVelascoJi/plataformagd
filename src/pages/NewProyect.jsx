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
      id: 1,
      profile: 'Chief Data Officer (CDO)'
    },
    {
      id: 2,
      profile: 'Data Governance Manager'
    },
    {
      id: 3,
      profile: 'Data Governance Leader'
    },
    {
      id: 4,
      profile: 'Data Governance Specialist'
    },
    {
      id: 5,
      profile: 'Sponsor ejecutivo'
    },
    {
      id: 6,
      profile: 'Data Owner'
    },
    {
      id: 7,
      profile: 'Business Data Steward'
    },
    {
      id: 8,
      profile: 'Technicaal Data Steward'
    },
    {
      id: 9,
      profile: 'Data Custodian'
    },
    {
      id: 10,
      profile: 'Data Specialist'
    },
    {
      id: 11,
      profile: 'Project manager | Scrum master'
    },
    {
      id: 12,
      profile: 'Data Analyst'
    },
    {
      id: 13,
      profile: 'Líder de negocio'
    },
    {
      id: 14,
      profile: 'Colaborador'
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

export default function NewProject() {

    //Local variables
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
    const projectPath = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/project'
    const userPath = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/usuariogd/${userId}`
    const path = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/process/${userId}`;
    let {id} = useParams()

    //Global State
    //const project = useSelector((state) => state.project.newProject)
    //console.log(project)
    //const visibleMode = useSelector(state => state.project.visibleMode)
    const globalStatus = useSelector(state => state.project.globalStatus)
    const {projectId, isProjectAccepted} = globalStatus
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
               area: '',
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
   


    //Handles
    const handleOpen = () => {
      setOpen(true)
    }
    
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
           setNewProject({
               ...newProject,
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
  
    const chargeProjectInformation = async() => {
        const projects = await getProjects()
        const project = projects.filter(project => project.idproject === projectId)

        console.log(project, 'projectttt')

        const {name, firstsurname, secondsurname, email, domain,subdomain,area, profile, projectname,
            projecttype,
            projectdescription,
            projectscopedescription,
            projectobjective,
            region,startdate, finaldate} = project[0]

        const existingProject = {
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
             }
        }
        console.log(existingProject)
        setNewProject(existingProject)
    }

    useEffect(() => {
        if(projectId && isProjectAccepted) {
            chargeProjectInformation()
            setVisibleMode(true)
        } 
        if(projectId) {
            chargeProjectInformation()
        } else {
            getUser()
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
                <Typography variant='h4' style={styles.title}>Alta de gobierno del proyecto de datos</Typography>
            </Grid>
            

           
        </Grid>
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
        <Grid  container item size={{ xs: 12, md: 12 }}>
        { activeStep === 0 && (
                <>  <Alert severity="info" color='warning' >En esta sección se te habilita el formulario que nos permitira evaluar el contexto de tu proyecto. <a href="" target='_blank'>A continuación pudes ver un ejemplo</a></Alert>
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Nombre del proyecto"
                        name='context.projectName'
                        value={newProject.context.projectName}
                        onChange={handleChange}
                        disabled={visibleMode}
                        />
                        </Grid>
                        {/* <Grid item size={{md: 4}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tipo de proyecto</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='context.projectType'
                                value={newProject.context.projectType}
                                label="Tipo de proyecto"
                                onChange={handleChange}
                                disabled={visibleMode}

                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}
                        <Grid item size={{md: 4}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Región donde se implementa</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name={`context.region`}
                                value={newProject.context.region}
                                label="Región"
                                onChange={handleChange}
                                disabled={visibleMode}
                                >
                                <MenuItem value={''}>-- Seleciona una región --</MenuItem>
                                {
                                    regions.map((region) => (
                                        <MenuItem value={region.region} key={region.id}>{region.region}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                            </Grid>
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Uso que se le dará a la información"
                        name='context.informationUse'
                        value={newProject.context.informationUse}
                        onChange={handleChange}
                        disabled={visibleMode}
                        />
                        </Grid>
                       
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Descripción del proyecto"
                        name='context.projectDescription'
                        value={newProject.context.projectDescription}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        disabled={visibleMode}
                        />
                        </Grid>
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Alcance"
                        name='context.projectScopeDescription'
                        value={newProject.context.projectScopeDescription}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        disabled={visibleMode}
                        />
                        </Grid>
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Objetivo"
                        name='context.projectObjective'
                        value={newProject.context.projectObjective}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        disabled={visibleMode}
                        />
                        </Grid>
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Principales Entregables"
                        name='context.deliverables'
                        value={newProject.context.deliverables}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        disabled={visibleMode}
                        />
                        </Grid>
                        <Grid item size={{md: 4}}>
                        <TextField
                        fullWidth
                        id="outlined-error"
                        label="Información adicional o Anexos"
                        name='context.aditionalInformation'
                        value={newProject.context.aditionalInformation}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        disabled={visibleMode}
                        />
                        </Grid>
                        <Grid item size={{md: 4}}>
                        <LocalizationProvider 
                            dateAdapter={AdapterDayjs}
                            adapterLocale="es"
                            
                        >
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker 
                                    label="Fecha de inicio" 
                                    name='context.startDate'
                                    value={newProject.context.startDate}
                                    onChange={(newValue) => setNewProject({
                                        ...newProject,
                                        ...newProject.context.startDate = newValue,
                                    
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
                                    value={newProject.context.finalDate}
                                    onChange={(newValue) => setNewProject({
                                        ...newProject,
                                        ...newProject.context.finalDate = newValue,
                                    
                                    })}
                                    disabled={visibleMode}
                                    />
                            </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        
                </>
         ) }
         { activeStep === 1 && (
                
                <>
                <Alert severity="info" color='warning' >En esta sección puedes integrar a los participantes considerados en tu proyecto</Alert>
                    {
                        newProject.participants.map((participant, index) => (
                           <Grid item container size={12} spacing={3} key={index}>
                                 <Grid item size={{md: 4}}>
                                    <TextField
                                    fullWidth
                                    id="outlined-error"
                                    label="Nombre"
                                    name={`participants[${index}].name`}
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
                            name={`participants[${index}].surname`}
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
                            name={`participants[${index}].email`}
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
                            name={`participants[${index}].position`}
                            value={participant.position}
                            onChange={handleChange}
                            disabled={visibleMode}
                            />
                            </Grid>
                        
                            {/* <Grid item size={{md: 3}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Área</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name={`participants[${index}].area`}
                                value={participant.area}
                                label="Area"
                                onChange={handleChange}
                                disabled={visibleMode}
                                >
                                <MenuItem value={0}>-- Seleciona un área --</MenuItem>
                                <MenuItem value={1}>Área 1</MenuItem>
                                <MenuItem value={2}>Área 2</MenuItem>
                                <MenuItem value={3}>Área 3</MenuItem>
                                </Select>
                            </FormControl>
                            </Grid> */}
                            <Grid item size={{md: 4}}>
                            <TextField
                            fullWidth
                            id="outlined-error"
                            label="Área"
                            name={`participants[${index}].area`}
                            value={participant.area}
                            onChange={handleChange}
                            disabled={visibleMode}
                            />
                            </Grid>
                            <Grid item size={{md: 3}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name={`participants[${index}].rol`}
                                value={participant.rol}
                                label="Rol"
                                onChange={handleChange}
                                disabled={visibleMode}
                                >
                                <MenuItem value={0}>-- Seleciona un rol --</MenuItem>
                                {
                                    profiles.map(profile => (
                                    <MenuItem key={profile.id} value={profile.id}>{profile.profile}</MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                            </Grid>
                            {
                                participant.idParticipant > 1 && !visibleMode && (
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
                <Grid item container size={12} justifyContent={'space-around'}>
                <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                >
                    Atrás
                </Button>
                <Button onClick={activeStep === steps.length - 1 ? handleSubmit :handleNext}>
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
