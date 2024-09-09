import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { StyledBox, StyledModal } from "../../DataTable/Modal/Modal.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { getAllChefs } from "../../../../../store/thunks/ChefThunk";

interface EditChefModelProps {
  open: boolean;
  onSubmit: (chefData: any) => void;
  onClose: () => void;
  RestaurantToEdit?: any; 
  mode: "add" | "edit"; 
}

export const RestaurantModal = ({
  open,
  onSubmit,
  onClose,
  RestaurantToEdit,
  mode,
}: EditChefModelProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { chefs } = useSelector((state: RootState) => state.chefs);
  const [newRestaurant, setNewRestaurant] = useState({
    _id: "" || undefined,
    name: "",
    imageUrl: "",
    chef: "",
    dishes: [],
    isPopular: false,
    stars: 0,
  });
  const [chefError, setChefError] = useState("");

  useEffect(() => {
    dispatch(getAllChefs());
  }, [dispatch]);

  useEffect(() => {
    if (mode === "edit" && RestaurantToEdit) {
      setNewRestaurant({
        _id: RestaurantToEdit._id,
        name: RestaurantToEdit.name,
        imageUrl: RestaurantToEdit.imageUrl,
        chef: RestaurantToEdit.chef?.name || "",
        dishes: RestaurantToEdit.dishes,
        isPopular: RestaurantToEdit.isPopular ?? false,
        stars: RestaurantToEdit.stars,
      });
    } else {
      setNewRestaurant({
        _id: "" || undefined,
        name: "",
        imageUrl: "",
        chef: "",
        dishes: [],
        isPopular: false,
        stars: 0,
      });
    }
  }, [mode, RestaurantToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewRestaurant((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChefChange = (event: any, value: any ) => {
    if (value) {
      setNewRestaurant((prevState) => ({
        ...prevState,
        chef: value.name,
      }));
      setChefError(""); 
    }
  };

  const handleInputChange = (
    value: any
  ) => {
    setNewRestaurant((prevState) => ({
      ...prevState,
      chef: value,
    }));
    setChefError("");
  };

  const validateChef = (chefName: string) => {
    return chefs.some((chef) => chef.name === chefName);
  };

  const handleSubmit = () => {
    if (validateChef(newRestaurant.chef)) {
      const chefId = chefs.find(
        (chef) => chef.name === newRestaurant.chef
      )?._id;
      const restaurantData = {
        ...newRestaurant,
        chef: chefId || "",
      };
      onSubmit(restaurantData);
      setChefError(""); 
    } else {
      setChefError("Chef does not exist on our website");
    }
  };

  return (
    <StyledModal
      open={open}
      onClose={() => {
        setChefError(""); 
        onClose();
      }}
    >
      <StyledBox>
        <p>{mode === "add" ? "Add New Restaurant" : "Edit Restaurant"}</p>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newRestaurant.name}
          onChange={handleChange}
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newRestaurant.imageUrl}
          onChange={handleChange}
        />
        <Autocomplete
          sx={{ width: "100%", marginTop: "15px" }}
          options={chefs}
          getOptionLabel={(option: any) => option.name}
          value={chefs.find((chef) => chef.name === newRestaurant.chef) || null}
          onChange={handleChefChange}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Chef Name"
              variant="outlined"
              error={!!chefError}
              helperText={chefError}
            />
          )}
          freeSolo
        />
        <FormControlLabel
          sx={{ alignSelf: "flex-start", marginTop: "15px" }}
          control={
            <Checkbox
              name="isPopular"
              checked={newRestaurant.isPopular}
              onChange={handleChange}
            />
          }
          label="Popular"
        />
        <TextField
          label="Stars"
          name="stars"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newRestaurant.stars}
          onChange={handleChange}
          inputProps={{
            min: 0, 
            max: 5, 
          }}
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
