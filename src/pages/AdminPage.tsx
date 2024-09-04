import { useState, useEffect } from "react";
import { SideBar } from "../components/Admin/AdminSideBar/SideBar";
import { DashBoard } from "../components/Admin/AdminDashBoard/DashBoard";

type ModelType = "chef" | "dish" | "restaurant";

const AdminPage = () => {
  const [model, setModel] = useState<ModelType>(() => {
    const savedModel = localStorage.getItem("adminModel");
    return (savedModel as ModelType) || "chef";
  });
  useEffect(() => {
    localStorage.setItem("adminModel", model);
  }, [model]);

  return (
    <>
      <SideBar setModel={setModel} />
      <DashBoard model={model} />
    </>
  );
};

export default AdminPage;
