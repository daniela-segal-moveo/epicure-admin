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
import {axiosInstance} from "../../../../../services/index";

interface EditChefModelProps {
  open: boolean;
  onSubmit: (chefData: any) => void;
  onClose: () => void;
  chefToEdit?: any;
  mode: "add" | "edit";
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
    if (mode === "edit" && chefToEdit) {
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
        {fileUrl && (
          <img
            src={fileUrl}
            alt="Chef"
            style={{ width: "100px", height: "100px" }}
          />
        )}

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
