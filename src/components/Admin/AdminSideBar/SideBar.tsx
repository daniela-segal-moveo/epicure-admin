import {
  StyledDrawer,
  StyledToolbar,
  StyledLogo,
  StyledButtonGroup,
  StyledButton,
  StyledLogOutButton,
} from "./SideBar.styles";
import { Typography } from "@mui/material";
import epicureLogo from "/assets/images/epicureLogo.png";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import Face2Icon from "@mui/icons-material/Face2";
import RestaurantIcon from "@mui/icons-material/Restaurant";

interface SideBarProps { 

  setModel: (model: "chef" | "dish" | "restaurant") => void;
}

export const SideBar = ({setModel}:SideBarProps) => {
  return (
    <StyledDrawer variant="permanent">
      <StyledToolbar>
        <StyledLogo src={epicureLogo} />
        <Typography sx={{ fontFamily: "admin-font" }}>Epicure Admin</Typography>
      </StyledToolbar>
      <StyledButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
      >
        <StyledButton onClick={()=>setModel("chef")} startIcon={<Face2Icon />}>Chefs</StyledButton>
        <StyledButton onClick={()=> setModel("restaurant")} startIcon={<RestaurantIcon />}>Restaurants</StyledButton>
        <StyledButton  onClick={()=> setModel("dish")} startIcon={<RamenDiningIcon />}>Dishes</StyledButton>
      </StyledButtonGroup>
      <StyledLogOutButton>Log Out</StyledLogOutButton>
    </StyledDrawer>
  );
};
