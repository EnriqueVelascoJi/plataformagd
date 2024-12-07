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
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

//Icons
import PolicyIcon from '@mui/icons-material/Policy';
import ArticleIcon from '@mui/icons-material/Article';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AddCircleIcon from '@mui/icons-material/AddCircle';

//Router
import { useNavigate } from 'react-router-dom';



//React components
import NavBar from './NavBar';
import SideBar from './SideBar';
import { Typography } from '@mui/material';

//Auth
import { createPassword} from '../helpers/helpers.js'
import { handleSignUp } from '../auth/auth';


//API
import { post, put } from 'aws-amplify/api';

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
    profile: 'Technicaal Data Steward'
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
    profile: 'Project Manager | Scrum Master'
  },
  {
    id: 11,
    profile: 'Data Analyst'
  },
  {
    id: 12,
    profile: 'Líder de negocio'
  },
  {
    id: 13,
    profile: 'Colaborador'
  }
]






export default function UserForm({isNew}) {

  //Local variables
  const path = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd'
    const navigate = useNavigate()

    //State
    const [user, setUser] = useState({
      name: '',
      firstSurname: '',
      secondSurname: '',
      email: '',
      domain: -1,
      subdomain: -1,
      area: -1,
      profile: -1,
      isActive: true
    })
    const [domains, setDominios] = useState(domainsAux)
    const [subdomains, setSubdomains] = useState([])



    //Handle
    const handleChange = (e) => {

      const value = e.target.value
      setUser({
        ...user,
        [e.target.name]: value 
      })
      if(e.target.name === 'domain') {
        setSubdomains(domains[parseInt(value)].subdomains)
      }
    };
    

    //Local functions
    // const newUser = async () => {

    //   const url = path
    //   const body = user
    //   try {
       
    //       const response = await fetch(url, {
    //         method: "POST", 
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(body),
    //         mode: 'cors'
          
    //       });
    //       const result = await response.json();
  
    //       console.log(result.data)
        
    // } catch (error) {
    //     console.log(error)
    // }
    // navigate(0)
    // }
    const addUser = async() => {
      try {
        const restOperation = post({
          apiName: 'api31a79f36',
          path: '/user',
          options: {
            body: user
          }
        });
    
        const { body } = await restOperation.response;
        const {data} = await body.json();
        console.log(response)


      } catch (e) {
        console.log('POST call failed: ', e);
      }
    }
    const newUser = async () => {

      const url = path
      const body = {
        username: user.email,
        email: user.email,
        password: createPassword()
      }
      console.log(body)
      const response = await handleSignUp(body)
      console.log(response)
    }
    const editUser = async () => {
      try {
        const restOperation = put({
          apiName: 'api31a79f36',
          path: `/user/${id}`,
          options: {
            body: user
          }
        });
    
        const { body } = await restOperation.response;
        const {data} = await body.json();
        console.log(response)


      } catch (e) {
        console.log('PUT call failed: ', e);
      }
    }

  return (
    
        <Grid container size={{ xs: 12, md: 12 }} spacing={3} justifyContent={'space-between'}>
          <Grid item size={{md: 6}}>
            <TextField
            fullWidth
            id="outlined-error"
            label="Nombre"
            name='name'
            value={user.name}
            onChange={handleChange}
            />
          </Grid>
          <Grid item size={{md: 6}}>
            <TextField
            fullWidth
            id="outlined-error"
            label="Apellido paterno"
            name='firstSurname'
            value={user.firstSurname}
            onChange={handleChange}
            />
          </Grid>
          <Grid item size={{md: 6}}>
            <TextField
            fullWidth
            id="outlined-error"
            label="Apellido Materno"
            name='secondSurname'
            value={user.secondSurname}
            onChange={handleChange}
            />
          </Grid>
          <Grid item size={{md: 6}}>
            <TextField
            fullWidth
            id="outlined-error"
            label="Email"
            type='email'
            name='email'
            value={user.email}
            onChange={handleChange}
            />
        </Grid>
        <Grid item size={{md: 6}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Dominio</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='domain'
              value={user.domain}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={-1}>-- Selecciona un dominio --</MenuItem>

              {
                 domains.map(domain => (
                  <MenuItem key={domain.id} value={domain.id}>{domain.domain}</MenuItem>
                ))
              }
              
              
            </Select>
          </FormControl>
        </Grid>
        <Grid item size={{md: 6}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Subdominio</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='subdomain'
              value={user.subdomain}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={-1}>-- Selecciona un subdominio --</MenuItem>

              {
                subdomains.map(subdomain => (
                  <MenuItem key={subdomain.id} value={subdomain.id}>{subdomain.subdomain}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item size={{md: 6}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Area</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='area'
              value={user.area}
              label="Area"
              onChange={handleChange}
            >
              <MenuItem value={-1}>-- Selecciona un area --</MenuItem>
              <MenuItem value={0}>Area 1</MenuItem>
              <MenuItem value={1}>Area 1</MenuItem>
              <MenuItem value={2}>Area 1</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item size={{md: 6}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Perfil de usuario</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='profile'
              value={user.profile}
              label="Rol"
              onChange={handleChange}
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
          <FormGroup>
            <FormControlLabel control={<Switch checked={user.isActive} onChange={(e) => setUser({...user, isActive:e.target.checked})} />} label="Crear usuario activo" />
          </FormGroup>        
        <Grid item size={{md: 6}}>
        </Grid>
          <Button variant="contained" sx={{ textTransform: 'none', width: '25%', backgroundColor: '#432851'}} onClick={isNew ? addUser: editUser}>{isNew ? 'Registrar' : 'Editar'}</Button>
        <Grid item size={{md: 6}}>
          
        </Grid>
        </Grid>
        
    
  );
}
