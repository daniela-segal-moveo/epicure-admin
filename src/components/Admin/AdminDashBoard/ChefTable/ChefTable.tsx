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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ChefModal from "./ChefModal/ChefModal";
import {
  StyledProfileImgDiv,
  StyledProfileImg,
} from "../DataTable/DataTable.styles";
import { DataTable } from "../DataTable/DataTable";
import useWindowWidth from "../../../../hooks/useWindowWidth";

const createColumns = (
  onDelete: (id: string) => void,
  onEdit: (id: string) => void,
  onWatch: (id: string) => void,
  windoWidth: boolean
): GridColDef[] => [
  {
    field: "id",
    headerName: "ID",
    hide: true, 
  },
  {
    field: "imageUrl",
    headerName: "Image",
    width: 100,
    hide: windoWidth,
    renderCell: (params) => (
      <StyledProfileImgDiv>
        <StyledProfileImg src={params.value} />
      </StyledProfileImgDiv>
    ),
  },
  { field: "name", headerName: "Name", width: 140 },
  { field: "bio", hide: windoWidth, headerName: "Bio", width: 250 },
  {
    field: "restaurants",
    headerName: "Restaurants",
    hide: true,
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
    hide: windoWidth
  },
  {
    field: "createdAt", 
    headerName: "Created At",
    width: 180,
    type: "dateTime",
    sortable: true,
    hide: true, 
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
        {windoWidth&&(<IconButton onClick={()=>{onWatch(params.row.id)}}>
          <RemoveRedEyeIcon />
        </IconButton>)}
      </div>
    ),
  },
];

export const ChefTable = () => {
  const handleDeleteChef = async (id: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this chef?"
      );
      if (confirmed) {
        await dispatch(deleteChef(id)); 
      }
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

  const handleWatchChef = (id: string) => {
    const chefToEdit = chefs.find((chef) => chef._id === id);
    if (chefToEdit) {
      setSelectedChef(chefToEdit);
      setModalMode("details");
      setModalOpen(true);
    }
  };

  const dispatch: AppDispatch = useDispatch();
  const windowWidth = useWindowWidth() <= 960;
  const { chefs, status } = useSelector((state: RootState) => state.chefs);
  const [columns, setColumns] = useState<GridColDef[]>(
    createColumns(handleDeleteChef, handleEditChef, handleWatchChef, windowWidth)
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "details">("add");
  const [selectedChef, setSelectedChef] = useState<any>();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllChefs());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (chefs.length > 0) {
      setColumns(createColumns(handleDeleteChef, handleEditChef, handleWatchChef, windowWidth));
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
      <ChefModal
        open={modalOpen}
        onSubmit={handleAddChef}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        chefToEdit={modalMode === "edit" || modalMode === "details" ? selectedChef : undefined}
      />
    </div>
  );
};
