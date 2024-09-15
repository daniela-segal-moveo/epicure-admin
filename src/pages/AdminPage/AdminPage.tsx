import { useState, useEffect } from "react";
import { SideBar } from "../../components/Admin/AdminSideBar/SideBar";
import { DashBoard } from "../../components/Admin/AdminDashBoard/DashBoard";
import MenuIcon from "@mui/icons-material/Menu"; // Import the Menu (hamburger) icon
import { StyledIconButton } from "./AdminPage.styles";
import useWindowWidth from "../../hooks/useWindowWidth";

type ModelType = "chef" | "dish" | "restaurant";

const AdminPage = () => {
  const [model, setModel] = useState<ModelType>(() => {
    const savedModel = localStorage.getItem("adminModel");
    return (savedModel as ModelType) || "chef";
  });
  useEffect(() => {
    localStorage.setItem("adminModel", model);
  }, [model]);

  const [drawerOpen, setDrawerOpen] = useState(false); // State to control sidebar visibility on mobile
  const windowWidth = useWindowWidth() <= 960;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <SideBar setModel={setModel} isOpen={drawerOpen} onClose={closeDrawer} />
      {windowWidth && (
        <StyledIconButton
          isOpen={drawerOpen}
          edge="start"
          aria-label="menu"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </StyledIconButton>
      )}
      <DashBoard model={model} />
    </>
  );
};

export default AdminPage;
