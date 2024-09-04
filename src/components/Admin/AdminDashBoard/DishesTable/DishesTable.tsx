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
import { DishModal } from "./DishModal/DishModal";
import {
  addDish,
  deleteDish,
  getAllDishes,
  updateDish,
} from "../../../../store/thunks/DishThunk";
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
  {
    field: "ingredients",
    headerName: "Ingredients",
    width: 200,
    renderCell: (params) => {
      const ingredients = params.value as string[];
      return ingredients ? ingredients.join(", ") : "No Ingredients";
    },
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 80,
    renderCell: (params) => `₪${params.value}`,
  },
  {
    field: "description",
    headerName: "Description",
    width: 100,
    renderCell: (params) => params.value || "No Description",
  },
  {
    field: "isSignature",
    headerName: "Signature",
    type: "boolean",
    width: 100,
    cellClassName: "justify-center",
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    renderCell: (params) => {
      const categories = params.value as string[];
      return categories ? categories.join(", ") : "No Category";
    },
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 180,
    type: "dateTime",
    sortable: true,
    hide: true, // Hide this column from the DataGrid
  },
  {
    field: "restaurantId", // Assuming 'restaurant' holds the restaurant name
    headerName: "Restaurant",
    width: 200, // Adjust width as needed
    renderCell: (params) => params.value.name || "No Restaurant",
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

export const DishesTable = () => {
  const handleDeleteDish = async (id: string) => {
    try {
      await dispatch(deleteDish(id));
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleEditDish = (id: string) => {
    const dishToEdit = dishes.find((dish) => dish._id === id);
    if (dishToEdit) {
      setSelectedDish(dishToEdit);
      setModalMode("edit");
      setModalOpen(true);
    }
  };

  const dispatch: AppDispatch = useDispatch();
  const { dishes, status } = useSelector((state: RootState) => state.dishes);
  const [columns, setColumns] = useState<GridColDef[]>(
    createColumns(handleDeleteDish, handleEditDish)
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedDish, setSelectedDish] = useState<any>();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllDishes());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (dishes.length > 0) {
      setColumns(createColumns(handleDeleteDish, handleEditDish));
    }
  }, [dishes]);

  const handleAddDish = async (newChef: any) => {
    try {
      if (modalMode == "add") {
        await dispatch(addDish(newChef));
      } else {
        await dispatch(updateDish(newChef));
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Error adding Restaurant:", error);
    }
  };

  const transformedDishes = dishes?.map((dish) => {
    return {
      id: dish._id,
      ...dish,
    };
  });

  console.log(transformedDishes)

  return (
    <div style={{ height: 600 }}>
      <DataTable
        dataArray={transformedDishes}
        columns={columns}
        model="Dish"
        setModalMode={setModalMode}
        setModalOpen={setModalOpen}
      />
      <DishModal
        open={modalOpen}
        onSubmit={handleAddDish}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        DishToEdit={modalMode === "edit" ? selectedDish : undefined}
      />
    </div>
  );
};
