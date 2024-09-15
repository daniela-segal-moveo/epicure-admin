import { Drawer, Toolbar, ButtonGroup, Button } from "@mui/material";
import { styled } from "@mui/system";

// Define drawer width as a constant
const drawerWidth = 240; // Adjust as needed

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'isOpen', // Ensure `isOpen` is not forwarded to the DOM
})<{ isOpen: boolean }>(({ isOpen }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#132442",
    display: "flex",
    flexDirection: "column",
  },
  display: "flex",
  alignItems: "center",
  marginTop: "3vh",
  padding: "0px",
  background: "#132442",
  cursor: "pointer",

  "@media (max-width:960px)": {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1200, // Ensure it overlays above other content
    "& .MuiDrawer-paper": {
      width: "100%",
      height: "70%",
      transition: "transform 0.3s ease",
    transform: isOpen ? "translateY(0)" : "translateY(-100%)",
    },
  },
}));

export const StyledToolbar = styled(Toolbar)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginTop: "20px",
  marginBottom: "20px",
  color: "white",
});

export const StyledButtonGroup = styled(ButtonGroup)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  flexGrow: 1,
});

export const StyledLogo = styled("img")({
  width: "50px",
  marginBottom: "10px",
  filter: "invert(100%)",
});

export const StyledButton = styled(Button)({
  color: "white",
  paddingLeft: "30px",
  paddingTop: "12px",
  paddingBottom: "12px",
  justifyContent: "flex-start",
  alignItems: "center",
});

export const StyledLogOutButton = styled(Button)({
  color: "white",
  marginBottom: "20px",
  justifyContent: "center",
  alignItems: "center",
});
