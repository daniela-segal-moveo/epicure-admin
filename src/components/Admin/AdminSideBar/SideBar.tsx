import {
  StyledDrawer,
  StyledToolbar,
  StyledLogo,
  StyledButtonGroup,
  StyledButton,
  StyledLogOutButton,
} from "./SideBar.styles";
import { Typography } from "@mui/material";
import epicureLogo from "../../../../public/assets/images/epicureLogo.png";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import Face2Icon from "@mui/icons-material/Face2";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { setLogout } from "../../../store/slices/UserSlice";
import { useDispatch } from "react-redux";

interface SideBarProps {
  setModel: (model: "chef" | "dish" | "restaurant") => void;
  isOpen: boolean;
  onClose: () => void;
}

export const SideBar = ({ setModel, isOpen, onClose }: SideBarProps) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
    onClose(); // Ensure the drawer closes
  };
  return (
    <StyledDrawer variant="permanent" isOpen={isOpen}>
      <StyledToolbar>
        <StyledLogo src={epicureLogo} />
        <Typography sx={{ fontFamily: "admin-font" }}>Epicure Admin</Typography>
      </StyledToolbar>
      <StyledButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
      >
        <StyledButton
          onClick={() => {
            setModel("chef");
            onClose();
          }}
          startIcon={<Face2Icon />}
        >
          Chefs
        </StyledButton>
        <StyledButton
          onClick={() => {
            setModel("restaurant");
            onClose();
          }}
          startIcon={<RestaurantIcon />}
        >
          Restaurants
        </StyledButton>
        <StyledButton
          onClick={() => {
            setModel("dish");
            onClose();
          }}
          startIcon={<RamenDiningIcon />}
        >
          Dishes
        </StyledButton>
      </StyledButtonGroup>
      <StyledLogOutButton onClick={()=>handleLogout()}>Log Out</StyledLogOutButton>
    </StyledDrawer>
  );
};
