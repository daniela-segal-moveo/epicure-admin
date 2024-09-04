import React from 'react';
import { StyledAddButton, StyledDataGrid } from './DataTable.styles';
import AddIcon from '@mui/icons-material/Add';
import { GridColDef } from '@mui/x-data-grid';

interface DataTableProps {
  dataArray: Array<any>; 
  columns: GridColDef[];
  model: string;
  setModalMode: (mode: "edit" | "add") => void;
  setModalOpen: (open: boolean) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  dataArray,
  columns,
  model,
  setModalMode,
  setModalOpen,

}) => {

  return (
    <>
      <StyledAddButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => {
          setModalMode("add");
          setModalOpen(true);
        }}
      >
        {`Add ${model}`}
      </StyledAddButton>
      <StyledDataGrid
        rows={dataArray} 
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        getRowId={(row) => row.id}
        initialState={{
          sorting: { sortModel: [{ field: "createdAt", sort: "desc" }] },
        }}
      />
    </>
  );
};
