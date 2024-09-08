import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  StyledProfileImgDiv,
  StyledProfileImg,
} from "../DataTable/DataTable.styles";
import {
  addRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  updateRestaurant,
} from "../../../../store/thunks/RestaurantThunk";
import { RestaurantModal } from "./RestaurantModal/RestuarantModal";
import { DataTable } from "../DataTable/DataTable";


const createColumns = (
  onDelete: (id: string) => void,
  onEdit: (id: string) => void
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
    renderCell: (params) => (
      <StyledProfileImgDiv>
        <StyledProfileImg src={params.value} />
      </StyledProfileImgDiv>
    ),
  },
  { field: "name", headerName: "Name", width: 140 },
  {
    field: "chef",
    headerName: "Chef",
    width: 180,
    renderCell: (params) => params.value?.name || "No Chef", 
  },
  {
    field: "dishes",
    headerName: "Dishes",
    width: 200,
    renderCell: (params) => {
      const dishes = params.value as { name: string }[];
      return dishes ? dishes.map((dish) => dish.name).join(", ") : "";
    },
  },
  {
    field: "isPopular",
    headerName: "Is Popular",
    type: "boolean",
    cellClassName: "justify-center",
  },
  {
    field: "stars",
    headerName: "Stars",
    type: "number",
    cellClassName: "justify-center",
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
      </div>
    ),
  },
];

export const RestaurantTable = () => {
  const handleDeleteRestaurant = async (id: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this restaurant?"
      );
      if (confirmed) {
        await dispatch(deleteRestaurant(id));
      }
    } catch (error) {
      console.error("Error deleting chef:", error);
    }
  };

  const handleEditChef = (id: string) => {
    const restaurantToEdit = restaurants.find(
      (restaurant) => restaurant._id === id
    );
    if (restaurantToEdit) {
      setSelectedRestaurant(restaurantToEdit);
      setModalMode("edit");
      setModalOpen(true);
    }
  };

  const dispatch: AppDispatch = useDispatch();
  const { restaurants, status } = useSelector(
    (state: RootState) => state.restaurants
  );
  const [columns, setColumns] = useState<GridColDef[]>(
    createColumns(handleDeleteRestaurant, handleEditChef)
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllRestaurants());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (restaurants.length > 0) {
      setColumns(createColumns(handleDeleteRestaurant, handleEditChef));
    }
  }, [restaurants]);

  const handleAddChef = async (newChef: any) => {
    try {
      if (modalMode == "add") {
        await dispatch(addRestaurant(newChef));
      } else {
        await dispatch(updateRestaurant(newChef));
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding Restaurant:", error);
    }
  };

  const transformedRestaurants = restaurants?.map((restaurant) => {
    return {
      id: restaurant._id,
      ...restaurant,
    };
  });

  return (
    <div style={{ height: 600 }}>
      <DataTable
        dataArray={transformedRestaurants}
        columns={columns}
        model="Restaurant"
        setModalMode={setModalMode}
        setModalOpen={setModalOpen}
      />
      <RestaurantModal
        open={modalOpen}
        onSubmit={handleAddChef}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        RestaurantToEdit={modalMode === "edit" ? selectedRestaurant : undefined}
      />
    </div>
  );
};
