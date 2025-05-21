/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import {DataGrid, type GridRowsProp, type  GridColDef } from '@mui/x-data-grid';
import {Paper, IconButton} from '@mui/material';
import { esES } from '@mui/x-data-grid/locales';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DinamicTableProps {
    rows:any[];
    columns: GridColDef[];
    onEdit:(row:any)=>void;
    onDelete:(id:number)=>void;

}



const DinamicTable:React.FC<DinamicTableProps>=({rows,columns,onEdit,onDelete})=>{
   
    const [tableRows,setTableRows]=React.useState<[]>([]);

    React.useEffect(() => {
        setTableRows(rows);
    },[rows]);

    const columnasBotones =[
        ...columns,{
            field: "actions",
            headerName: "Acciones",
            width: 100,
            renderCell:(params: any)=>(
                <>
                <IconButton color= 'primary' onClick={()=>onEdit(params.row)}>
                    <EditIcon />
                </IconButton>

                <IconButton color= 'primary' onClick={()=>onDelete(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
                </>

            ),

            
        }
    ]

const paginationModel ={page:0, pageSize: 8};

    return(
       
        <Paper sx={{height: 600, width: '100%'}}role='region' aria-label='Tabla Dinamica'>
            <DataGrid
            rows={rows}
            columns={columnasBotones}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            initialState={{pagination: {paginationModel}}}
            pageSizeOptions={[5,8,10,50,100]}
            showToolbar
            checkboxSelection
            sx={{border:0}}

                />
                
        </Paper>

    )
    
}

export default DinamicTable;