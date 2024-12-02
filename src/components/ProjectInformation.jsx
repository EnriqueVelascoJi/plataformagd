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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';
import StepContent from '@mui/material/StepContent';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';







//Icons
import PolicyIcon from '@mui/icons-material/Policy';
import ArticleIcon from '@mui/icons-material/Article';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


//Router
import { useNavigate } from 'react-router-dom';

//React components
import NavBar from './NavBar';
import SideBar from './SideBar';

//Redux
import { useSelector } from 'react-redux';

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
const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.h5,
  color: '#000',
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));
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








export default function ProjectInformation() {

    //Local variables
    const navigate = useNavigate()
    const dictPath = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/dict'
    const globalStatus = useSelector(state => state.project.globalStatus)
    const {projectId, isProjectAccepted, requirementId, isRequirementAccepted} = globalStatus
    const steps = ['Plan de trabajo', 'Glosario de Términos', 'Catálogo de Objetos', 'Diccionario de Datos', 'Reglas de negocio, técnicas y lógicas', 'Aprobación', 'Publicación']
    const projectSteps = ['Alta de proyecto | inciativa', 'Levantamiento de requerimeinto']
    const secondSteps = [
      {
        label: 'Justificación del Diccionario de Datos',
        description: `Especifica en el recuadero siguiente la necesidad de este procedimiento`,
      },
      {
        label: 'Sube el template del diccioanrio de datos',
        description: `En este paso es necesario subas el template que a continuación se te presenta`,
      },
    ];
    const thirdSteps = [
      {
        label: 'Justificación del Glosario de términos',
        description: `Especifica en el recuadero siguiente la necesidad de este procedimiento`,
      },
      
      {
        label: 'Sube el template del glosario de términos',
        description: `En este paso es necesario subas el template que a continuación se te presenta`,
      },
    ];

    //State 
    const [value, setValue] = React.useState(0);
    const [activeProjectStep, setActiveProjectStep] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [secondActiveStep, setSecondActiveStep] = useState(0);
    const [thirdActiveStep, setThirdActiveStep] = useState(0);
    const [completed, setCompleted] = useState({})
    const [file, setFile] = useState({})
    const [file2, setFile2] = useState({})
    const [dict, setDict] = useState('')
    const [glosary, setGlosary] = useState('')

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
    

  return (
          <Grid container size={12}  alignItems={'center'} spacing={3}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Información del proyecto" {...a11yProps(0)} />
                {!isRequirementAccepted && <Tab label="Ruta del proyecto" {...a11yProps(1)} />}
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
            <Grid item size={12}>
                <Stepper nonLinear activeStep={activeProjectStep}>
                  {projectSteps.map((label, index) => (
                    <Step key={label} completed={[isProjectAccepted, isRequirementAccepted, false][index]} disabled={[false, !isProjectAccepted, false][index]}>
                      <StepButton color="inherit" onClick={handleProjectStep(index)}>
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
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
              <Grid item container size={12} spacing={3} justifyContent={'center'}>
                {
                  activeStep === 0 && (
                    <>
                      <Stepper activeStep={secondActiveStep} orientation="vertical" nonLinear>
                        {secondSteps.map((step, index) => (
                          <Step key={step.label}>
                            <StepButton
                              onClick={handleSecondStep(index)}
                              optional={
                                index === secondSteps.length - 1 ? (
                                  <Typography variant="caption">Sube tu archivo <a href="https://gado-my.sharepoint.com/:x:/g/personal/brenda_guzman_mobilityado_com/ERL0pbeBY-dCtIhrIj8twxkB2Kqe1AiMSMdObRpvgGQKgA?e=pYj83T" target='_blank'>Diccionario de Datos</a></Typography>
                                ) : null
                              }
                            >
                              {step.label} 
                            </StepButton>
                            <StepContent>
                              <Typography variant='caption'>{step.description}</Typography>
                              {
                                index === 0 && (
                                  <TextField
                                fullWidth
                                id="outlined-error"
                                label="Necesidad del diccionario"
                                name='diccionario'
                                value={dict}
                                onChange={(e) => setDict(e.target.value)}
                                multiline
                                rows={4}
                                style={{marginTop: 5}}
                              />
                                )
                              }
                              <Box sx={{ mb: 2 }}>
                              {secondActiveStep === secondSteps.length - 1 ? (
                                <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                size='small'
                              >
                                Subir archivo
                                <VisuallyHiddenInput
                                  type="file"
                                  onChange={(event) => setFile(event.target.files)}
                                  multiple
                                />
                              </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={handleSecondNext}
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
                            {Object.keys(file).length > 0 && (
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
                  activeStep === 1 && (
                    <>
                      <Stepper activeStep={thirdActiveStep} orientation="vertical" nonLinear>
                        {thirdSteps.map((step, index) => (
                          <Step key={step.label}>
                            <StepButton
                              onClick={handleThirdStep(index)}
                              optional={
                                index === thirdSteps.length - 1 ? (
                                  <Typography variant="caption">Sube tu archivo <a href="https://gado-my.sharepoint.com/:x:/g/personal/brenda_guzman_mobilityado_com/EYqSn8FYPCtEsbW5ag4KAKkBTTlAydcAWmxMqCbWx8jLBQ?wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1732118224183&web=1" target='_blank'>Glosario de términos</a></Typography>
                                ) : null
                              }
                            >
                              {step.label}
                            </StepButton>
                            <StepContent><Typography variant='caption'>{step.description}</Typography>
                              {
                                index === 0 && (
                                  <TextField
                                fullWidth
                                id="outlined-error"
                                label="Necesidad del glosario"
                                name='glosario'
                                value={dict}
                                onChange={(e) => setGlosary(e.target.value)}
                                multiline
                                rows={4}
                              />
                                )
                              }
                              
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
            </CustomTabPanel>


            
          </Grid>
  );
}
