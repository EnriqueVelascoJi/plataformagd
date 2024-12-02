import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function LastNotications() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      
      <Alert
        severity="success"
        action={
          <Button color="inherit" size="small" sx={{textTransform: 'none', textDecoration: 'underline'}}>
            Ver más
          </Button>
        }
      >
        Nuevo solicitud de proyecto
      </Alert>
      <Alert
        severity="success"
        action={
          <Button color="inherit" size="small" sx={{textTransform: 'none', textDecoration: 'underline'}}>
            Ver más
          </Button>
        }
      >
        Nuevo solicitud de proyecto
      </Alert>
      <Alert
        severity="info"
        action={
          <Button color="inherit" size="small" sx={{textTransform: 'none', textDecoration: 'underline'}}>
            Ver más
          </Button>
        }
      >
        Actualización al requerimiento 1234
      </Alert>
      <Alert
        severity="info"
        action={
          <Button color="inherit" size="small" sx={{textTransform: 'none', textDecoration: 'underline'}}>
            Ver más
          </Button>
        }
      >
        Actualización al requerimiento 1234
      </Alert>
      <Alert
        severity="info"
        action={
          <Button color="inherit" size="small" sx={{textTransform: 'none', textDecoration: 'underline'}}>
            Ver más
          </Button>
        }
      >
        Actualización al requerimiento 1234
      </Alert>
    </Stack>
  );
}