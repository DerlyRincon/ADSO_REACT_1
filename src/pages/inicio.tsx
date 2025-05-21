/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import type { GridColDef } from '@mui/x-data-grid';
import DinamicTable from '../components/DinamicTable';
import { Alert, Button, Grid, Snackbar } from '@mui/material';
import ModalDinamica from './Formulario';

interface Usuario {
    id: number | null;
    idaprendiz: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
}


const Inicio = () => {

    const [dataUsers, setDataUsers] = React.useState<Usuario[]>([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [opcion, setOpcion] = React.useState(1);
    const [selectedAprendiz, setSelectedAprendiz] = React.useState<Usuario | null>(null);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');


    React.useEffect(() => {
        fetch('http://localhost:8000/aprendiz')
            .then(response => response.json())
            //Le digo a TypeScript que el id de las filas de la tabla van a ser los idaprendiz de los registros devueltos.
            .then(dataResponse => setDataUsers(dataResponse.data.map((row: { idaprendiz: any }) => ({ ...row, id: row.idaprendiz }))))
            .catch(error => console.error('Error al obtener los datos:', error));

    }, []);

    const columns: GridColDef[] = [
        { field: "idaprendiz", headerName: "#", width: 70 },
        { field: "nombre", headerName: "Nombres", width: 146 },
        { field: "apellido", headerName: "Apellidos", width: 146 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "telefono", headerName: "Teléfono", width: 200 },
    ]
    const AgregarAprendiz = () => {
        setOpcion(1);
        setSelectedAprendiz(null);
        setOpenModal(true);
    };

    const ActualizarAprendiz = (row: Usuario) => {
        setOpcion(2);
        setSelectedAprendiz(row);
        setOpenModal(true);
    };

    const EliminarAprendiz = (idAprendiz: number) => {
        console.log(idAprendiz);

        const dato = { "idaprendiz": idAprendiz }

        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este aprendiz?');
        if (confirmDelete) {
            fetch(`http://localhost:8000/aprendiz`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dato)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Aprendiz eliminado:', data);
                    setSnackbarMessage('Usuario eliminado correctamente');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);

                    setTimeout(() => { window.location.reload() }, 1500);


                })
                .catch(error => {
                    console.error('Error al eliminar el aprendiz:', error);
                    setSnackbarMessage('Error al eliminar el aprendiz');
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                });
        }
    };


    const handleCloseModal = () => {
        setOpenModal(false);
    };



    return (
        <>
            <Button onClick={AgregarAprendiz} style={{ backgroundColor: '#0080ff', color: '#fff', borderRadius: '20px' }} >Agregar Aprendiz</Button>
            <Grid container spacing={2} marginTop={5}>
                <Grid size={10}>
                    <DinamicTable rows={dataUsers} columns={columns} onEdit={ActualizarAprendiz} onDelete={EliminarAprendiz} />

                </Grid>

            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1500}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>


            <ModalDinamica
                open={openModal}
                onClose={handleCloseModal}
                opcion={opcion}
                objAprendiz={selectedAprendiz}
            />
        </>
    );
}

export default Inicio;