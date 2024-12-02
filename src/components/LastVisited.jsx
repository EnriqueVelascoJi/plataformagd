import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//Router
import { Link } from 'react-router-dom';


//Local Helpers
function createData(name, time) {
  return { name, time };
}

const rows = [
  createData('catalogo_datos', 'Hace 10 horas'),
  createData('catalogo_datos', 'Hace 12 horas'),
  createData('catalogo_datos', 'Hace 20 horas'),
  createData('catalogo_datos', 'Hace 1 día'),
  createData('catalogo_datos', 'Hace 1 semana')
];

export default function LastVisited() {
  return (
    <TableContainer >
      <Table  aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Última visita</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ border: 'none' }}
            >
              <TableCell component="th" scope="row">
                <Link>{row.name}</Link>
              </TableCell>
              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}