import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#132442",
  maxWidth: "100% !important",
  padding: "20px",
});

export const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
  padding: "40px",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
  width: "600px",

  "@media (max-width:960px)": {
    width: "80%",
  },
});

export const StyledLogo = styled("img")({
  width: "100px",
  marginBottom: "10px",
});

export const StyledTextField = styled(TextField)({
  margin: "10px",
  borderRadius: "4px",
  width: "60%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    "& fieldset": {
      borderColor: "#132442",
    },
    "&:hover fieldset": {
      borderColor: "#4A5E73",
      "&.Mui-focused fieldset": {
        borderColor: "#4A5E73",
      },
    },
    "& .MuiInputAdornment-root": {
      color: "#132442",
    },
    "& .MuiFormLabel-root": {
      color: "#132442",
    },
    "&.Mui-focused": {
      color: "#4A5E73",
    },
    fontSize: "16px",
  },
  "@media (max-width:960px)": {
    width: "90%",
  },
});

export const StyledButton = styled(Button)({
  marginTop: "20px",
  backgroundColor: "#4A5E73",
  color: "white",
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: "#3A4A5D",
  },
  width: "60%",
  border: "0px",

  "@media (max-width:960px)": {
    width: "90%",
  },
});

export const StyledTypography = styled(Typography)({
  marginTop: "20px",
  fontSize: "24px",
});

export const StyledLogInTypography = styled(Typography)({
  margin: "0px",
  fontSize: "15px",
  color: "grey",
  marginBottom: "20px",
});
