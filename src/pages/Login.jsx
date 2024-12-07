import * as React from 'react';
import { useEffect, useState } from 'react';

//MUI Components 
import Grid from '@mui/material/Grid2';
import Input from '@mui/icons-material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

//React components
import Modal from '../components/Modal';


//Form
import { Formik } from 'formik';
import { validateForm } from '../helpers/helpers';



//Assets
import logo from '../assets/imgs/logoblack.png'

//Router
import { useNavigate } from 'react-router-dom';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { setUserInformation } from '../features/userSlice';

//Alerts
import Swal from 'sweetalert2'

//Auth
import { handleSignIn } from '../auth/auth';

//Page Styles
const styles = {
    form: {
        height: '100vh',
        width: '100vw'
    },
    formLeft: {
        height: '100%',
        backgroundColor: '#452E70',
        width: '50%',
        float: 'left',
        display: 'flex'
    },
    formRigth: {
        height: '100%',
        backgroundColor: '#fff',
        width: '50%',
        float: 'right',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: '90%'
    },
    formTitle: {
        textAlign: 'center'
    },
    formText: {
        color: '#452E70'
    },
    button: {
        backgroundColor: '#D53638',
        color: '#fff'
    },
    field: {
        color: '#000'
    }

}


//Dummy data
const dummyUser = {
  name: 'Enrique',
  firstSurname: 'Velasco',
  secondSurname: 'Jimenez',
  email: 'ejemplo.enrique@gmail.com',
  domain: 0,
  subdomain: 0,
  area: 0,
  rol: 0,
  perfil: 0
}

export default function Login() {

    //Local variables
    const path = 'https://backmsn.msnserviciosaereos.com.mx/apiv2/usuariogd'
    const title = 'Solicitud de nuevo usuario';
    const size ='md';
    const navigate = useNavigate()
    const dispatch = useDispatch()

    

    //State
    const [user, setUser] = useState({
      email: '',
      password: '',
    })
    const [open, setOpen] = useState(false)
    


    //Handles
    const handleChange = (e) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      })
    }
    const handleOpen = () => {
      setOpen(true)
    }

    //Local Functions
    const clear = () => {
      setUser({
        email: '',
        password: ''
      })
    }
    
    const submit = async() => {

      const url = `${path}/login` 

      console.log(url)

      const validation = validateForm(user)
      if (!validation) return

      console.log('paso')

      try {
       
        const response = await fetch(url, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
          mode: 'cors'
        });
        const result = await response.json();
        const session = result.data;

        
        
        if(Object.keys(session).length > 0) {

            const {
            id,
            name,
            firstsurname,
            secondsurname,
            email,
            domain,
            subdomain,
            area,
            profile,
            isActive
            } = session
          
          localStorage.setItem("userId", id);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Bienvenido!',
            showConfirmButton: false,
            timer: 2500
          })     
          navigate('/home')
          dispatch(setUserInformation({
            name,
            firstName: firstsurname,
            secondSurname: secondsurname,
            email,
            domain,
            subdomain,
            area,
            profile,
            isActive
          }))
        } else
        {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al ingresar',
          showConfirmButton: false,
          timer: 1500
        })
        }
        
      }catch (error) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al ingresar',
          showConfirmButton: false,
          timer: 1500
        })
        
      }

    }
    // const submit = async() => {

    //   const url = `${path}/login`
    //   const validation = validateForm(user)
    //   if (!validation) return
    //   const payload = {
    //     username: user.email,
    //     password: user.password
    //   }
    //   try {
    //     const login = await handleSignIn(payload)
    //     const {isSignedIn} = login
    //     if(isSignedIn) {
    //       Swal.fire({
    //       position: 'top-end',
    //       icon: 'success',
    //       title: '¡Bienvenido!',
    //       showConfirmButton: false,
    //       timer: 2500
    //     })     
    //       navigate('/home')
    //     } else  {
    //       Swal.fire({
    //         position: 'top-end',
    //         icon: 'error',
    //         title: 'Error al ingresar',
    //         showConfirmButton: false,
    //         timer: 1500
    //       })
    //     }

    //   } catch (error) {
    //     console.log(error)
    //     Swal.fire({
    //       position: 'top-end',
    //       icon: 'error',
    //       title: 'Error al ingresar',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //   }

      

    // }

    

  return (

    <>
        {/* Modal que dispara las funciones del usuario */}
      <Modal 
        id={4}
        title={title}
        open={open}
        setOpen={setOpen}
        size={size}
      />
      < div style={styles.form}>
          <div style={styles.formLeft}>
              <Grid display={'flex'} justifyContent={'center'} alignItems={'center'}> 
                  <img src={logo} style={styles.logo}/>
              </Grid>
          </div>
          <div style={styles.formRigth}>
              <Grid container   justifyContent={'center'} alignItems={'baseline'} sx={{backgroundColor: 'rgba(69,46,112,0.5)', width: '80%', borderRadius: 3, p:10}}>
              <form style={styles.formText} >
              <h1 style={styles.formTitle}>Inicia sesión</h1>
                    <TextField 
                        label="Email"
                        onChange={handleChange}
                        required
                        variant="outlined"
                        name='email'
                        color="#e7e6e6"
                        type="email"
                        fullWidth
                        value={user.email}
                        sx={{
                            mb: 3,
                            // Root class for the input field
                            "& .MuiOutlinedInput-root": {
                              color: "#e7e6e6",
                              fontFamily: "Arial",
                              // Class for the border around the input field
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#e7e6e6",
                                borderWidth: "1px",
                              },
                            },
                            // Class for the label of the input field
                            "& .MuiInputLabel-outlined": {
                              color: "#e7e6e6"
                            }
                          }}
                    />
                    <TextField
                    color='#00'
                    label="Password"
                    onChange={handleChange}
                    required
                    variant="outlined"
                    name='password'
                    type="password"
                    value={user.password}
                    fullWidth
                    sx={{
                        mb: 3,
                        // Root class for the input field
                        "& .MuiOutlinedInput-root": {
                          color: "#e7e6e6",
                          fontFamily: "Arial",
                          // Class for the border around the input field
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#e7e6e6",
                            borderWidth: "1px",
                          },
                        },
                        // Class for the label of the input field
                        "& .MuiInputLabel-outlined": {
                          color: "#e7e6e6"
                        }
                      }}
                  />
                  <Grid container item size={12}>
                    <Grid item size={6}>
                      <Button style={styles.button} onClick={submit} fullWidth>Entrar</Button>
                    </Grid>
                    <Grid item size={6} textAlign={'end'} >
                      <Button variant="text" sx={{color: '#e7e6e6', textTransform: 'none', textDecoration: 'underline'}} onClick={handleOpen}>Solicitud de registro</Button>
                    </Grid>
                    

                  </Grid>
              
              </form>

              </Grid>
          </div>
      </div>

    </>
  );
    
   
}
