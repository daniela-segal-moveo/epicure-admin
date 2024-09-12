import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  IconButton,
  FormControlLabel,
  Checkbox,
  Card,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { StyledBox, StyledModal } from "../../DataTable/Modal/Modal.styles";
import { axiosInstance } from "../../../../../services/index";

interface EditChefModelProps {
  open: boolean;
  onSubmit: (chefData: any) => void;
  onClose: () => void;
  chefToEdit?: any;
  mode: "add" | "edit" | "details";
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
    isWeekChef: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");

  useEffect(() => {
    if ((mode === "edit" || mode === "details") && chefToEdit) {
      setNewChef({
        _id: chefToEdit._id,
        name: chefToEdit.name,
        bio: chefToEdit.bio,
        imageUrl: chefToEdit.imageUrl,
        restaurants: chefToEdit.restaurants,
        isWeekChef: chefToEdit.isWeekChef ?? false,
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
        setNewChef((prevState) => ({
          ...prevState,
          imageUrl: uploadedFileUrl,
        }));
      } catch (error) {
        console.error("Error handling file change:", error);
      }
    }
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <StyledBox>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        ></IconButton>
        <p style={{ display: mode === "details" ? "none" : "flex" }}>
          {mode == "add" ? "Add New Chef" : "Edit Chef"}
        </p>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newChef.name}
          onChange={handleChange}
          InputProps={{ readOnly: mode === "details" }}
        />
        <TextField
          label="Bio"
          name="bio"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newChef.bio}
          onChange={handleChange}
          InputProps={{ readOnly: mode === "details" }}
          multiline
          minRows={4} // Adjust based on the average size of your bio
          maxRows={10} // Adjust to limit the maximum height of the textarea
        />
        <Box
          mt={2}
          mb={2}
          sx={{ display: mode === "details" ? "none" : "flex" }}
        >
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
        </Box>
        <img
          src={fileUrl ? fileUrl : newChef.imageUrl}
          alt="Chef"
          style={{ width: "100px", height: "100px" }}
        />

        <FormControlLabel
          sx={{ alignSelf: "flex-start", marginTop: "15px" }}
          control={
            <Checkbox
              name="isWeekChef"
              checked={newChef.isWeekChef}
              onChange={handleChange}
              disabled={mode === "details"}
            />
          }
          label="Week Chef"
        />
        <Box
          mt={2}
          display="flex"
          justifyContent="flex-end"
          sx={{ display: mode === "details" ? "none" : "flex" }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: "#132442" }}
            onClick={handleSubmit}
          >
            {mode == "add" && <AddIcon />}
            {mode == "edit" && "update"}
          </Button>
        </Box>
      </StyledBox>
    </StyledModal>
  );
};

export default AddChefForm;
