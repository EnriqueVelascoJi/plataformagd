import * as React from 'react';
import { useState, useEffect } from 'react';
//React components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

//Icons
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import LogoutIcon from '@mui/icons-material/Logout';
import GridOnIcon from '@mui/icons-material/GridOn';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';

//Router
import { Link, useNavigate } from 'react-router-dom';


//Assets
import logo from '../../src/assets/imgs/logoblack.png'

//Redux
import { useSelector } from 'react-redux';

//Auth
import { handleSignOut } from '../auth/auth';




//Pages styles
const styles = {
  container: {
      backgroundColor: '#D53638',
  },
  links: {
    color: '#ffffff',
    textDecoration: 'none'
  }, 
  name: {
        fontWeight: '700',
        textAlign: 'center'
  },
  logout: {
    color: '#ffffff',
    textDecoration: 'none',
    backgroundColor: '#432851',
    position: 'absolute',
    bottom: 0,
    textTransform: 'none',
    width: '80%'
  }, 
}
const drawerWidth = 250;

export default function SideBar() {

  //Local variables
  //const user = useSelector((state) => state.user.userInformation)
  const userId = localStorage.getItem('userId')
  const userPath = `https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd/usuariogd/${userId}`
  const navigate = useNavigate()
  const option1 = [
    {
      id: 0,
      name: 'Home',
      path: '/home',
      icon: <HomeIcon style={{color: '#fff'}}/>
    },
    {
      id: 1,
      name: 'Diccionario de Datos',
      path: '/catalogo',
      icon: <LibraryBooksIcon style={{color: '#fff'}}/>

    },
    {
      id: 2,
      name: 'Glosario de términos',
      path: '/glosario',
      icon: <SortByAlphaIcon style={{color: '#fff'}}/>

    },
    {
      id: 3,
      name: 'Mis proyectos',
      path: '/proyectos',
      icon: <AddToQueueIcon style={{color: '#fff'}}/>
    },
    // {
    //   id: 4,
    //   name: 'Otros artefactos de GD',
    //   path: '/',
    //   icon: <GridOnIcon style={{color: '#fff'}}/>
    // }
    // ,
    // {
    //   id: 5,
    //   name: 'Formatos de Gobierno de Datos',
    //   path: '/',
    //   icon: <AttachFileIcon style={{color: '#fff'}}/>
    // },
    {
      id: 6,
      name: 'Usuarios',
      path: '/usuarios',
      icon: <PeopleIcon style={{color: '#fff'}}/>
    }
  ]
  const option2 = [
    {
      id: 0,
      name: 'Home',
      path: '/home',
      icon: <HomeIcon style={{color: '#fff'}}/>
    },
    {
      id: 1,
      name: 'Diccionario de Datos',
      path: '/catalogo',
      icon: <LibraryBooksIcon style={{color: '#fff'}}/>

    },
    {
      id: 2,
      name: 'Glosario de términos',
      path: '/glosario',
      icon: <SortByAlphaIcon style={{color: '#fff'}}/>

    },
    {
      id: 3,
      name: 'Mis proyectos',
      path: '/proyectos',
      icon: <AddToQueueIcon style={{color: '#fff'}}/>
    },
    // {
    //   id: 4,
    //   name: 'Otros artefactos de GD',
    //   path: '/',
    //   icon: <GridOnIcon style={{color: '#fff'}}/>
    // }
    // ,
    // {
    //   id: 5,
    //   name: 'Formatos de Gobierno de Datos',
    //   path: '/',
    //   icon: <AttachFileIcon style={{color: '#fff'}}/>
    // },
  ]
  const option3 = [
    {
      id: 0,
      name: 'Home',
      path: '/home',
      icon: <HomeIcon style={{color: '#fff'}}/>
    },
    {
      id: 1,
      name: 'Diccionario de Datos',
      path: '/catalogo',
      icon: <LibraryBooksIcon style={{color: '#fff'}}/>

    },
    {
      id: 2,
      name: 'Glosario de términos',
      path: '/glosario',
      icon: <SortByAlphaIcon style={{color: '#fff'}}/>

    },
  ]
  const generalLinks = [option1, option1, option1, option1, option2, option2, option2, option2, option2, option2, option3]



  //State
  const [selectedIndex, setSelectedIndex] = useState(0)
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

  //Handles
  const handleListItemClick = (index) => {
    if(index != selectedIndex)
      setSelectedIndex(index);
  };



  //functions
  const getUser = async () => {

    const url = userPath
    try {
        const response = await fetch(url);
        const result = await response.json();

        const user = result.data[0];
        setUser(user)

    } catch (error) {
        console.log(error)
    }
  }
  const logout = async () => {
    localStorage.clear()
    try {
      const session = await handleSignOut()
      console.log(session)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(userId) getUser()
  }, [])
 
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
     
      <Drawer
        sx={{
          display: 'flex',
          width: drawerWidth,
          p: 3,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'lightslategray',
            color: '#ffffff'
          },
        }}
        variant="permanent"
        anchor="left"
      >
       

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={logo} alt="logo" height={'auto'} width={'89%'}/>

        </Box>
        <List
          sx={{
            p: 0.6,
            "& .Mui-selected": {
              borderRadius: 2,
              bgcolor: '#432851',
                    },
            // hover
            '& .MuiListItemButton-root:hover': {
              fontWeight: 700,
              bgcolor: '#432851',
              borderRadius: 2,
              '&, & .MuiListItemIcon-root': {
                color: 'white',
              },
            },
          }}
        >
          {user.profile > -1 && generalLinks[parseInt(user.profile)].map(link => (
            <Link to={link.path} key={link.id} style={styles.links}>
            <ListItem disablePadding  onClick={() => handleListItemClick(link.id)} sx={{width: '100%'}}>
              <ListItemButton 
                selected={selectedIndex == link.id}
              >
                <ListItemIcon>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.name} sx={{fontSize: '1px'}}/>
              </ListItemButton>
            </ListItem>
            </Link>
          ))}


        </List>
        <Button variant="contained" startIcon={<LogoutIcon />}  style={styles.logout} sx={{m: 3}} onClick={logout}>Cerrar sesión</Button>

      </Drawer>
    </Box>
  );
}