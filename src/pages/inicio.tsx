/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import type{ GridColDef } from '@mui/x-data-grid';
import DinamicTable from '../components/DinamicTable';
import { Grid } from '@mui/material';

interface Usuario {
  id: number| null;
  idusuario: number;
  nombre: string;
  apellido: string;
  email: string;
}


const Inicio = () => {
    
    const [dataUsers,setDataUsers] = React.useState<Usuario[]>([]);
    React.useEffect(() => {
        fetch('http://localhost:8000/usuarios')
        .then(response=>response.json())
        .then(dataResponse=>setDataUsers(dataResponse.data.map((row:{idusuario:any})=>({...row,id:row.idusuario}))))
        .catch(error => console.error('Error al obtener los datos:', error));
        
    },[]);

    const columns:GridColDef[] = [
        {field: "idusuario", headerName: "#", width: 70},
        {field: "nombre", headerName: "Nombres", width: 146},
        {field: "apellido", headerName: "Apellidos", width: 146},
        {field: "email", headerName: "Email",width: 200},
    ]

    const handleEdit = (row:Usuario)=>{
        console.log(row);


    }

    const handleDelete =(id:number)=>{
        console.log(id);
    }






    return (
        <>
         <Grid container spacing ={2} marginTop={5}>
            <Grid size={10}>
                <DinamicTable rows={dataUsers} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />

            </Grid>

         </Grid>
        </>
    );
}

export default Inicio;