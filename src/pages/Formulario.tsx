/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from 'react';
import Alert from '@mui/material/Alert';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Snackbar,
} from '@mui/material';

interface Aprendiz {
  idaprendiz: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

interface ModalDinamicaProps {
  open: boolean;
  onClose: () => void;
  opcion: number;
  objAprendiz: Aprendiz | null;
}

const ModalDinamica: React.FC<ModalDinamicaProps> = ({ open, onClose, opcion, objAprendiz }) => {
  const [aprendiz, setAprendiz] = React.useState<Aprendiz>({
    
    idaprendiz: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
  });

  const [alerta, setAlerta] = React.useState<{ tipo: 'success' | 'error'; mensaje: string } | null>(null);

  const limpiarCampos = () => {
    setAprendiz({
      idaprendiz: 0,
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
    });
  };

  React.useEffect(() => {
    if (objAprendiz !== null) {
      setAprendiz({
        idaprendiz: objAprendiz.idaprendiz,
        nombre: objAprendiz.nombre,
        apellido: objAprendiz.apellido,
        email: objAprendiz.email,
        telefono: objAprendiz.telefono,
      });
    } else {
      limpiarCampos();
    }
  }, [objAprendiz]);

  const AccionUsuario = (e: React.FormEvent) => {
    e.preventDefault();

    const metodo = opcion === 1 ? 'POST' : 'PUT';
    const url = `http://localhost:8000/aprendiz`;
    

    fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aprendiz),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error en la solicitud');
        }
        return res.json();
      })
      .then(() => {
        setAlerta({
          tipo: 'success',
          mensaje: opcion === 1 ? 'Aprendiz registrado' : 'Aprendiz actualizado',
        });
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error('Error al procesar la solicitud:', error);
        setAlerta({
          tipo: 'error',
          mensaje: opcion === 1 ? 'Error al registrar aprendiz.' : `Error al editar aprendiz. ${error}`,
        });
      });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{opcion === 1 ? 'Agregar Aprendiz' : 'Editar Aprendiz'}</DialogTitle>
        <form onSubmit={AccionUsuario}>
          <DialogContent>
            <TextField
              label="Nombre"
              onChange={(e) => setAprendiz({ ...aprendiz, nombre: e.target.value })}
              fullWidth
              margin="normal"
              value={aprendiz.nombre}
            />
            <TextField
              label="Apellido"
              onChange={(e) => setAprendiz({ ...aprendiz, apellido: e.target.value })}
              fullWidth
              margin="normal"
              value={aprendiz.apellido}
            />
            <TextField
              label="Email"
              type="email"
              onChange={(e) => setAprendiz({ ...aprendiz, email: e.target.value })}
              fullWidth
              margin="normal"
              value={aprendiz.email}
            />
            <TextField
              label="Teléfono"
              type="tel"
              onChange={(e) => setAprendiz({ ...aprendiz, telefono: e.target.value })}
              fullWidth
              margin="normal"
              value={aprendiz.telefono}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Terminar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={alerta !== null}
        autoHideDuration={1500}
        onClose={() => setAlerta(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
     
          <Alert onClose={() => setAlerta(null)} severity={alerta?.tipo} variant="filled" sx={{ width: '100%' }}>
            {alerta?.mensaje}
          </Alert>
      
      </Snackbar>
    </>
  );
};

export default ModalDinamica;
