import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Chip,
  Card,
  CardMedia,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { StyledBox, StyledModal } from "../../DataTable/Modal/Modal.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { getAllRestaurants } from "../../../../../store/thunks/RestaurantThunk";
import {axiosInstance} from "../../../../../services/index";

interface EditDishModelProps {
  open: boolean;
  onSubmit: (dishData: any) => void;
  onClose: () => void;
  DishToEdit?: any;
  mode: "add" | "edit";
}

interface Dish {
  _id: string | undefined;
  name: string;
  ingredients: string[];
  imageUrl: string;
  price: number;
  isSignature: boolean;
  category: string[];
  restaurantId: string;
  createdAt: Date;
}

export const DishModal = ({
  open,
  onSubmit,
  onClose,
  DishToEdit,
  mode,
}: EditDishModelProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { restaurants } = useSelector((state: RootState) => state.restaurants);
  const [newDish, setNewDish] = useState<Dish>({
    _id: "" || undefined,
    name: "",
    ingredients: [],
    imageUrl: "",
    price: 0,
    isSignature: false,
    category: [] as string[],
    restaurantId: "",
    createdAt: new Date(),
  });
  const [categories] = useState<string[]>(["spicy", "veg", "vegetarian"]);
  const [restaurantError, setRestaurantError] = useState<string>("");
  const [ingredientInput, setIngredientInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");

  useEffect(() => {
    if (mode === "edit" && DishToEdit) {
      setNewDish({
        _id: DishToEdit._id,
        name: DishToEdit.name,
        ingredients: DishToEdit.ingredients,
        imageUrl: DishToEdit.imageUrl,
        price: DishToEdit.price,
        isSignature: DishToEdit.isSignature,
        category: DishToEdit.category,
        restaurantId: DishToEdit.restaurantId?.name || "",
        createdAt: DishToEdit.createdAt,
      });
    } else {
      setNewDish({
        _id: "" || undefined,
        name: "",
        ingredients: [],
        imageUrl: "",
        price: 0,
        isSignature: false,
        category: [],
        restaurantId: "",
        createdAt: new Date(),
      });
    }
  }, [mode, DishToEdit]);

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [newDish]);

  useEffect(() => {}, [newDish.category]);

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

  const handleRestaurantChange = (event: any, value: any) => {
    if (value) {
      setNewDish((prevState) => ({
        ...prevState,
        restaurantId: value.name,
      }));
      setRestaurantError("");
    }
  };

  const handleInputChange = (value: any) => {
    setNewDish((prevState) => ({
      ...prevState,
      restaurantId: value,
    }));
    setRestaurantError("");
  };

  const addIngredient = () => {
    const trimmedInput = ingredientInput.trim();
    if (trimmedInput && !newDish.ingredients.includes(trimmedInput)) {
      setNewDish((prevState) => ({
        ...prevState,
        ingredients: [...prevState.ingredients, trimmedInput],
      }));
      setIngredientInput("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setNewDish((prevState) => ({
      ...prevState,
      ingredients: prevState.ingredients.filter((ing) => ing !== ingredient),
    }));
  };

  const getRestaurantIdByName = (restaurantName: string) => {
    const restaurant = restaurants.find((restaurant) => {
      return restaurant.name === restaurantName;
    });
    return restaurant ? restaurant._id : "";
  };

  const handleSubmit = () => {
    const restaurantID = getRestaurantIdByName(newDish.restaurantId);
    if (restaurantID) {
      const dishData = {
        ...newDish,
        restaurantId: restaurantID,
      };
      onSubmit(dishData);
    } else {
      setRestaurantError("restaurant doesnt exist in our website");
    }
  };

  const cleanFields = () => {
    setNewDish({
      _id: "" || undefined,
      name: "",
      ingredients: [],
      imageUrl: "",
      price: 0,
      isSignature: false,
      category: [],
      restaurantId: "",
      createdAt: new Date(),
    });
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosInstance.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      try {
        const uploadedFileUrl = await uploadFile(selectedFile);
        setFile(selectedFile); 
        setFileUrl(uploadedFileUrl); 
        setNewDish((prevState) => ({
          ...prevState,
          imageUrl: uploadedFileUrl, 
        }));
      } catch (error) {
        console.error("Error handling file change:", error);
      }
    }
  };

  return (
    <StyledModal
      open={open}
      onClose={() => {
        onClose();
        cleanFields;
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
        <Box mt={2} mb={2}>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="file-input">
            <Button
              variant="contained"
              sx={{ bgcolor: "#132442" }}
              component="span"
            >
              Upload Image
            </Button>
          </label>
          {fileUrl && (
            <Card sx={{ maxWidth: 345, mt: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={fileUrl}
                alt="Uploaded Image"
              />
            </Card>
          )}
        </Box>
        <TextField
          label="Ingredient"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addIngredient();
            }
          }}
          placeholder="Add an ingredient and press Enter"
        />
        <Box mt={2} display="flex" flexWrap="wrap">
          {newDish.ingredients.map((ingredient) => (
            <Chip
              key={ingredient}
              label={ingredient}
              onDelete={() => removeIngredient(ingredient)}
              deleteIcon={<CloseIcon />}
              sx={{ marginRight: 1, marginBottom: 1 }}
            />
          ))}
        </Box>
        <Autocomplete
          sx={{ width: "100%", marginTop: "15px" }}
          options={restaurants}
          getOptionLabel={(option: any) => option.name}
          value={
            restaurants.find(
              (restaurant) => restaurant.name === newDish.restaurantId
            ) || null
          }
          onChange={(event: any, value: any) =>
            handleRestaurantChange(event, value)
          }
          onInputChange={(event: any, value: string) =>
            handleInputChange(value)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Restaurant"
              variant="outlined"
              error={!!restaurantError}
              helperText={restaurantError}
            />
          )}
          freeSolo
        />
        <Box mt={2}>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  name="category"
                  value={category}
                  checked={newDish.category?.includes(category)}
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
            min: 0,
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
          <Button
            variant="contained"
            sx={{ bgcolor: "#132442" }}
            onClick={handleSubmit}
          >
            {mode === "add" ? <AddIcon /> : "Update"}
          </Button>
        </Box>
      </StyledBox>
    </StyledModal>
  );
};
