import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  addChef,
  deleteChef,
  getAllChefs,
  updateChef,
} from "../../../../store/thunks/ChefThunk";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditChefModel from "./EditChefModel/EditChefModel";
import {
  StyledProfileImgDiv,
  StyledProfileImg,
} from "../DataTable/DataTable.styles"
import { DataTable } from "../DataTable/DataTable";

// Define columns based on Chef model properties
const createColumns = (
  onDelete: (id: string) => void,
  onEdit: (id: string) => void
): GridColDef[] => [
  {
    field: "id",
    headerName: "ID",
    hide: true, // Hide this column from the DataGrid
  },
  {
    field: "imageUrl",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <StyledProfileImgDiv>
        <StyledProfileImg src={params.value} />
      </StyledProfileImgDiv>
    ),
  },
  { field: "name", headerName: "Name", width: 140 },
  { field: "bio", headerName: "Bio", width: 250 },
  {
    field: "restaurants",
    headerName: "Restaurants",
    hide:true,
    width: 160,
    renderCell: (params) => {
      return (params.value as { name: string }[])
        .map((restaurant) => restaurant.name)
        .join(", ");
    },
  },
  {
    field: "isWeekChef",
    headerName: "Chef of the week",
    width: 150,
    type: "boolean",
  },
  {
    field: "createdAt", // The field for creation date
    headerName: "Created At",
    width: 180,
    type: "dateTime",
    sortable: true,
    hide: true, // Hide this column from the DataGrid
  },
  {
    field: "handle",
    headerName: "",
    flex: 1,
    cellClassName: "flex-end",
    renderCell: (params) => (
      <div>
        <IconButton onClick={() => onEdit(params.row.id)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(params.row.id)}>
        <DeleteIcon />
      </IconButton>
      </div>
    ),
  },
];

export const ChefTable = () => {
  const handleDeleteChef = async (id: string) => {
    try {
      await dispatch(deleteChef(id)); // Call the delete action with the chef id
    } catch (error) {
      console.error("Error deleting chef:", error);
    }
  };

  const handleEditChef = (id: string) => {
    const chefToEdit = chefs.find((chef) => chef._id === id);
    if (chefToEdit) {
      setSelectedChef(chefToEdit);
      setModalMode("edit");
      setModalOpen(true);
    }
  };

  const dispatch: AppDispatch = useDispatch();
  const { chefs, status } = useSelector((state: RootState) => state.chefs);
  const [columns, setColumns] = useState<GridColDef[]>(
    createColumns(handleDeleteChef, handleEditChef)
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedChef, setSelectedChef] = useState<any>();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllChefs());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (chefs.length > 0) {
      setColumns(createColumns(handleDeleteChef, handleEditChef));
    }
  }, [chefs]);

  const handleAddChef = async (newChef: any) => {
    try {
      if (modalMode == "add") {
        await dispatch(addChef(newChef));
      } else {
        await dispatch(updateChef(newChef));
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding chef:", error);
    }
  };

  // Transform data to ensure consistency
  const transformedChefs = chefs?.map((chef) => {
    return {
      id: chef._id,
      ...chef,
    };
  });

  return (
    <div style={{ height: 600 }}>
      <DataTable
        dataArray={transformedChefs}
        columns={columns}
        model="Chef"
        setModalMode={setModalMode}
        setModalOpen={setModalOpen}
      />
      <EditChefModel
        open={modalOpen}
        onSubmit={handleAddChef}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        chefToEdit={modalMode === "edit" ? selectedChef : undefined}
      />
    </div>
  );
};
