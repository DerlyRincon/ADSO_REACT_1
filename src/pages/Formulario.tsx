/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import DinamicTable from '../components/DinamicTable';

interface Formulario {
  id: number | null;
  idusuario: number;
  nombre: string;
  apellido: string;
  email: string;
}

const Formulario = () => {
  const [dataUsers, setDataUsers] = React.useState<Formulario[]>([]);
  const [open, setOpen] = React.useState(false);

  const [formulario, setFormulario] = React.useState<Formulario>({
    id: null,
    idusuario: 0,
    nombre: '',
    apellido: '',
    email: '',
  });

  // Obtener los usuarios desde la API
  const fetchUsuarios = () => {
    fetch('http://localhost:8000/usuarios')
      .then(response => response.json())
      .then(dataResponse =>
        setDataUsers(
          dataResponse.data.map((row: { idusuario: any }) => ({
            ...row,
            id: row.idusuario,
          }))
        )
      )
      .catch(error => console.error('Error al obtener los datos:', error));
  };

  React.useEffect(() => {
    fetchUsuarios();
  }, []);

  // Columnas para la tabla
  const columns: GridColDef[] = [
    { field: 'idusuario', headerName: '#', width: 70 },
    { field: 'nombre', headerName: 'Nombres', width: 146 },
    { field: 'apellido', headerName: 'Apellidos', width: 146 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];

  // Abrir modal
  const handleOpen = () => {
    setFormulario({
      id: null,
      idusuario: 0,
      nombre: '',
      apellido: '',
      email: '',
    });
    setOpen(true);
  };

  // Cerrar modal
  const handleClose = () => setOpen(false);

  // Agregar usuario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:8000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulario),
    })
      .then(res => res.json())
      .then(() => {
        fetchUsuarios();
        setOpen(false);
      })
      .catch(error => console.error('Error al registrar usuario:', error));
  };

  // Editar (por ahora solo imprime)
  const handleEdit = (row: Formulario) => {
    console.log('Editar usuario:', row);
  };

  // Eliminar (por ahora solo imprime)
  const handleDelete = (id: number) => {
    console.log('Eliminar usuario con ID:', id);
  };

  return (
    <>
      <Box mt={5}>
        <Stack spacing={2}>
          <Box>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Agregar Usuario
            </Button>
          </Box>
          <Box>
            <DinamicTable
              rows={dataUsers}
              columns={columns}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Box>
        </Stack>
      </Box>

      {/* Modal con formulario */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Registrar Nuevo Usuario</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              label="ID Usuario"
              type="number"
              fullWidth
              margin="normal"
              value={formulario.idusuario}
              onChange={(e) =>
                setFormulario({ ...formulario, idusuario: Number(e.target.value) })
              }
            />
            <TextField
              label="Nombre"
              fullWidth
              margin="normal"
              value={formulario.nombre}
              onChange={(e) =>
                setFormulario({ ...formulario, nombre: e.target.value })
              }
            />
            <TextField
              label="Apellido"
              fullWidth
              margin="normal"
              value={formulario.apellido}
              onChange={(e) =>
                setFormulario({ ...formulario, apellido: e.target.value })
              }
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={formulario.email}
              onChange={(e) =>
                setFormulario({ ...formulario, email: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Formulario;
