import {styled} from "@mui/system"
import {Modal, Box} from "@mui/material"

export const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "auto", 
  width: "auto", 
});
  
export const StyledBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "400px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  });