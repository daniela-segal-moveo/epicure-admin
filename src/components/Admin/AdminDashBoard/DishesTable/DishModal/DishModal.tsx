import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  StyledBox,
  StyledModal,
} from "../../DataTable/Modal/Modal.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";

interface EditDishModelProps {
  open: boolean;
  onSubmit: (dishData: any) => void;
  onClose: () => void;
  DishToEdit?: any; // Optional prop for editing mode
  mode: "add" | "edit"; // Prop to distinguish between add and edit modes
}

export const DishModal = ({
  open,
  onSubmit,
  onClose,
  DishToEdit,
  mode,
}: EditDishModelProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { restaurants } = useSelector((state: RootState) => state.restaurants); // Assuming you have a categories state
  const [newDish, setNewDish] = useState({
    _id: "",
    name: "",
    ingredients: [],
    description: "",
    imageUrl: "",
    price: 0,
    isSignature: false,
    category: [] as string[],
    restaurantId: "",
    createdAt: new Date(),
  });
  const [categories] = useState<string[]>(["spicy", "veg", "vegetarian"]);
  const [restaurantError, setRestaurantError] = useState("");

  useEffect(() => {
    if (mode === "edit" && DishToEdit) {
        console.log(DishToEdit)
      setNewDish({
        _id: DishToEdit._id,
        name: DishToEdit.name,
        ingredients: DishToEdit.ingredients,
        description: DishToEdit.description,
        imageUrl: DishToEdit.imageUrl,
        price: DishToEdit.price,
        isSignature: DishToEdit.isSignature,
        category: DishToEdit.category,
        restaurantId: DishToEdit.restaurantId.name,
        createdAt: DishToEdit.createdAt,
      });
    } else {
      setNewDish({
        _id: "",
        name: "",
        ingredients: [],
        description: "",
        imageUrl: "",
        price: 0,
        isSignature: false,
        category: [],
        restaurantId: "",
        createdAt: new Date(),
      });
    }
  }, [mode, DishToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === "category") {
      setNewDish((prevState) => ({
        ...prevState,
        category: checked
          ? [...prevState.category, value]
          : prevState.category.filter((cat) => cat !== value),
      }));
    } else {
      setNewDish((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const getRestaurantIdByName = (restaurantName: string) => {
    console.log(restaurants)
    const restaurant = restaurants.find((restaurant) => {
      return restaurant.name === restaurantName;
    });
    return restaurant ? restaurant._id : "";
  };

  const handleSubmit = () => {
    const restaurantID = getRestaurantIdByName(newDish.restaurantId);
    if (restaurantID) {
      const restaurantData = {
        ...newDish,
        restaurantId: restaurantID, // Convert name to ID
      };
      onSubmit(restaurantData);
    }
    setRestaurantError("restaurant doesnt exist in our website");
  };

  return (
    <StyledModal
      open={open}
      onClose={() => {
        onClose();
      }}
    >
      <StyledBox>
        <p>{mode === "add" ? "Add New Dish" : "Edit Dish"}</p>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newDish.name}
          onChange={handleChange}
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newDish.imageUrl}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newDish.description}
          onChange={handleChange}
        />
        <TextField
          label="Restaurant"
          name="restaurant"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newDish.restaurantId}
          onChange={handleChange}
          error={!!restaurantError} // Show error styling if there's an error
          helperText={restaurantError} // Display the error message
        />
        <Box mt={2}>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  name="category"
                  value={category}
                  checked={newDish.category.includes(category)}
                  onChange={handleChange}
                />
              }
              label={category}
            />
          ))}
        </Box>
        <TextField
          label="Price"
          name="price"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newDish.price}
          onChange={handleChange}
          inputProps={{
            min: 0, // Optional: Set minimum value
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isSignature"
              checked={newDish.isSignature}
              onChange={handleChange}
            />
          }
          label="Signature Dish"
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {mode === "add" ? <AddIcon /> : "Update"}
          </Button>
        </Box>
      </StyledBox>
    </StyledModal>
  );
};
