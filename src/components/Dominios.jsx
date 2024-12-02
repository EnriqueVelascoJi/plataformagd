import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid2';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';




//Local styles
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

//Dominios 
const dominios = [
    {
        id: 0,
        dominio: 'Comercial',
        subId: 'MC_CM',
        color: '#0059B3',
        descripcion: 'Dominio que almacena datos de procesos relacionados con la promoción, venta y gestión de los servicios ofrecidos. Este dominio es fundamental para el éxito financiero y la competitividad de la empresa, ya que se encarga de maximizar las oportunidades de ingresos y asegurar la satisfacción del cliente a través de una oferta de servicios de movilidad bien estructurada y atractiva.',
        subdominios: [
            {
                id: 0,
                subdominio: 'Cliente'
            },
            {
                id: 1,
                subdominio: 'Marketing'
            },
            {
                id: 2,
                subdominio: 'Oferta'
            },
            {
                id: 3,
                subdominio: 'Ventas'
            },
            {
                id: 4,
                subdominio: 'Pasajeros'
            },
            {
                id: 5,
                subdominio: 'Socios comerciales'
            },
            {
                id: 6,
                subdominio: 'Precios'
            },

        ]
    },
    {
        id: 1,
        dominio: 'Operativo',
        subId: 'MC_OP',
        color: '#D53638',
        descripcion: 'Dominio que almacena datos de procesos relacionados con la planificación, ejecución y supervisión de las operaciones de transporte a través de la asignación de un conductor y la asignación de un autobús, cuidando la rentabilidad, el clima laboral y seguridad de los pasajeros conductores y recursos operativos. Este dominio es crucial para asegurar que los servicios de transporte se realicen de manera eficiente, segura y conforme a las normativas establecidas, garantizando la satisfacción del cliente y la optimización de recursos.',
        subdominios: [
            {
                id: 0,
                subdominio: 'Planeación Operación'
            },
            {
                id: 1,
                subdominio: 'Conductiores'
            },
            {
                id: 2,
                subdominio: 'Monitoreo y control operativo'
            },
            {
                id: 3,
                subdominio: 'Vehículos'
            },
            {
                id: 4,
                subdominio: 'Rutas'
            },
            {
                id: 5,
                subdominio: 'Autoridades'
            }

        ]
    },
    {
        id: 2,
        dominio: 'Júridico',
        subId: 'MC_JU',
        color: '#E4B653',
        descripcion: 'Dominio que almacena información de procesos que garantizan todas las operaciones se realicen dentro del marco legal aplicable, protegiendo los intereses de la empresa y minimizando riesgos legales. Este dominio abarca la gestión integral de asuntos legales relacionados con bienes, litigios, contratos, desarrollo inmobiliario y seguros, asegurando que cada aspecto del negocio esté debidamente respaldado y protegido desde un punto de vista legal.',
        subdominios: [
            {
                id: 0,
                subdominio: 'Patrimonial'
            },
            {
                id: 1,
                subdominio: 'Desarrollo inmobiliario'
            },
            {
                id: 2,
                subdominio: 'Litigios'
            },
            {
                id: 3,
                subdominio: 'Contratos y convenios'
            },
            {
                id: 4,
                subdominio: 'Gestión de seguros'
            }
        ]
    },
    {
        id: 3,
        dominio: 'Gobierno',
        subId: 'MC_GO',
        color: '#452E70',
        descripcion: 'Dominio que almacena información de procesos relacionada con el cumplimiento normativo y la auditoría interna/externa. Este dominio es fundamental para asegurar que la organización opere de acuerdo con las leyes, regulaciones y políticas internas aplicables, manteniendo altos estándares de transparencia y responsabilidad para mitigar riesgos.',
        subdominios: [
            {
                id: 0,
                subdominio: 'Auditoría'
            },
            {
                id: 1,
                subdominio: 'Gestión de riesgos'
            },
            {
                id: 2,
                subdominio: 'Normatividad y cumplimiento'
            }
        ]
    },
    {
        id: 4,
        dominio: 'Finanzas',
        subId: 'MC_FN',
        color: '#0059B3',
        descripcion: 'Dominio que almacena información de procesos relacionados con la gestión financiera, contabilidad y control económico de MOBILITY ADO. Este dominio es vital para asegurar la estabilidad financiera, transparencia y eficiencia en el uso de los recursos económicos en toda la operación de la organización. ',
        subdominios: [
            {
                id: 0,
                subdominio: 'Tesorería'
            },
            {
                id: 1,
                subdominio: 'Inversiones'
            },
            {
                id: 2,
                subdominio: 'Contraloría'
            },
            {
                id: 3,
                subdominio: 'Fiscal'
            },
            {
                id: 4,
                subdominio: 'Contabilidad'
            },
            {
                id: 5,
                subdominio: 'Planeación financiera'
            },
            {
                id: 6,
                subdominio: 'Cuentas por pagar'
            },
            {
                id: 7,
                subdominio: 'Nómina'
            }
        ]
    },
    {
        id: 5,
        dominio: 'Mantenimeinto',
        subId: 'MC_MT',
        color: '#D53638',
        descripcion: 'Dominio que almacena información de procesos relacionados con el mantenimiento preventivo y correctivo de la flota de autobuses, así como la gestión de compras y proveedores necesarios para mantener la operatividad de los vehículos. Este dominio es esencial para asegurar la seguridad, confiabilidad y eficiencia de los servicios de transporte.',
        subdominios: [
            {
                id: 0,
                subdominio: 'Mantenimeinto técnico'
            },
            {
                id: 1,
                subdominio: 'Mantenieminto administrativo'
            },
            {
                id: 2,
                subdominio: 'Gestión de almacenes y talleres'
            }
        ]
    },
    {
        id: 6,
        dominio: 'Capital Humano',
        subId: 'MC_CH',
        color: '#E4B653',
        descripcion: 'Dominio que almacena información de todos los procesos relacionados con la gestión del talento y el desarrollo organizacional, estructura organizacional, movilidad de talento, coordinación de los recursos humanos de las regiones, administración de compensaciones y supervisación de las relaciones laborales. Este dominio es esencial para asegurar que la MOBILITY ADO cuente con el personal adecuado y capacitado para cumplir con sus objetivos estratégicos. ',
        subdominios: [
            {
                id: 0,
                subdominio: 'Compensaciones'
            },
            {
                id: 1,
                subdominio: 'Gestión de talento'
            },
            {
                id: 2,
                subdominio: 'Recursos humanos por regiones'
            },
            {
                id: 3,
                subdominio: 'Relaciones laborales'
            },
            {
                id: 4,
                subdominio: 'Formación de talento'
            },
            {
                id: 5,
                subdominio: 'Estructura Organizacional'
            },
            {
                id: 6,
                subdominio: 'Cultura Organizacional'
            }
        ]
    }

]

export default function Dominios() {

    //State
  const [expanded, setExpanded] = useState(-1);

    //Handles
  const handleExpandClick = (id) => {
    if(id === expanded)
    setExpanded(-1);
    else
    setExpanded(id)
  };

  return (
    <Grid container size={{ md: 12 }} spacing={2}>
        {
            dominios.map(dominio => (
                <Grid item size={{ md: 4 }} key={dominio.id}>
                    <Card key={dominio.id} sx={{backgroundColor: dominio.color, color: 'white'}}>
                        <CardContent>
                        <   Typography gutterBottom variant="h4" component="div" textAlign={'center'}>
                                {dominio.dominio}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gary' }} textAlign={'center'}>
                                {dominio.subId}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <ExpandMore
                            expand={expanded === dominio.id}
                            onClick={() => handleExpandClick(dominio.id)}
                            aria-expanded={expanded === dominio.id}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded === dominio.id} timeout="auto" unmountOnExit>
                        
                            <CardContent>
                            <Typography variant="body2" sx={{ color: 'white', textAlign: 'justify' }}>
                            {dominio.descripcion}
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'white', textAlign: 'justify', mt: 2 }}>
                            {'Subdomnios'}
                            </Typography>
                            <Stack direction="row" justifyContent={'center'} spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mt: 3 }}>
                                {
                                    dominio.subdominios.map(subdominio => (
                                        <Chip key={subdominio.id} label={subdominio.subdominio} style={{color: 'white'}}/>
                                    ))
                                }
                            </Stack>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            ))
        }
    </Grid>
  );
}