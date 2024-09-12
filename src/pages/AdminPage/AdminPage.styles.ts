import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
interface StyledIconButtonProps {
  isOpen: boolean;
}

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<StyledIconButtonProps>(({ isOpen }) => ({
  color: isOpen ? "white" : "inherit", // Conditional color
  transition: "color 0.3s ease",
  display: "block", // Adjust as needed
  position: "absolute",
  top: 16,
  right: 16,
  zIndex: 1300, // Ensure it is above other content
}));
