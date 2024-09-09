import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Card,
  CardMedia,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { StyledBox, StyledModal } from "../../DataTable/Modal/Modal.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store/store";
import { getAllChefs } from "../../../../../store/thunks/ChefThunk";
import axios from "../../../../../services/index";

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
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [inputValue, setInputValue] = useState("");

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

  const handleChefChange = (event: any, value: any) => {
    if (value) {
      setNewRestaurant((prevState) => ({
        ...prevState,
        chef: value.name,
      }));
      setChefError("");
    }
  };

  const handleInputChange = (value: any) => {
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

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/api/upload", formData, {
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
        setNewRestaurant((prevState) => ({
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

        <Autocomplete
          sx={{ width: "100%", marginTop: "15px" }}
          options={chefs}
          getOptionLabel={(option: any) => option.name}
          value={chefs.find((chef) => chef.name === newRestaurant.chef) || null}
          onChange={handleChefChange}
          onInputChange={(event: any, value: string) =>
            handleInputChange(value)
          }
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
