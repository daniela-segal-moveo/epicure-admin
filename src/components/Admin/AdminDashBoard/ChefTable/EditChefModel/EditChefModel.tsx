import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { StyledBox, StyledModal } from "../../DataTable/Modal/Modal.styles";

interface EditChefModelProps {
  open: boolean;
  onSubmit: (chefData: any) => void;
  onClose: () => void;
  chefToEdit?: any; // Optional prop for editing mode
  mode: "add" | "edit"; // Prop to distinguish between add and edit modes
}

const AddChefForm = ({
  open,
  onSubmit,
  onClose,
  chefToEdit,
  mode,
}: EditChefModelProps) => {
  const [newChef, setNewChef] = useState({
    _id: "" || undefined,
    name: "",
    bio: "",
    imageUrl: "",
    restaurants: [] as string[],
    isWeekChef: false, // Add boolean field for "Is Week Chef"
  });

  useEffect(() => {
    if (mode === "edit" && chefToEdit) {
      setNewChef({
        _id: chefToEdit._id,
        name: chefToEdit.name,
        bio: chefToEdit.bio,
        imageUrl: chefToEdit.imageUrl,
        restaurants: chefToEdit.restaurants,
        isWeekChef: chefToEdit.isWeekChef ?? false, // Use nullish coalescing
      });
    } else {
      setNewChef({
        _id: undefined,
        name: "",
        bio: "",
        imageUrl: "",
        restaurants: [] as string[],
        isWeekChef: false,
      });
    }
  }, [mode, chefToEdit]);

  // Handle change for text fields and checkbox
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewChef((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(newChef);
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <StyledBox>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseIcon />
        </IconButton>
        <p>{mode == "add" ? "Add New Chef" : "Edit Chef"}</p>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newChef.name}
          onChange={handleChange}
        />
        <TextField
          label="Bio"
          name="bio"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newChef.bio}
          onChange={handleChange}
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newChef.imageUrl}
          onChange={handleChange}
        />
        <FormControlLabel
          sx={{ alignSelf: "flex-start", marginTop: "15px" }}
          control={
            <Checkbox
              name="isWeekChef"
              checked={newChef.isWeekChef}
              onChange={handleChange}
            />
          }
          label="Week Chef"
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {mode == "add" && <AddIcon />}
            {mode == "edit" && "update"}
          </Button>
        </Box>
      </StyledBox>
    </StyledModal>
  );
};

export default AddChefForm;
