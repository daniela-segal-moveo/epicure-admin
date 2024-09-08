import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/system";

export const StyledAddButton = styled(Button)({
  marginBottom: "16px",
  backgroundColor: "#132442",
  display: "flex",
  alignItems: "flex-end",
});

export const StyledProfileImgDiv = styled("div")({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const StyledProfileImg = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const StyledDataGridContainer = styled(Box)({
  width: "max-content",
  overflowX: "auto",
});

export const StyledDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-cell": {
    display: "flex",
    justifyContent: "flex-start",
    padding: "8px",
    paddingLeft: "20px",
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#132442",
    color: "white",
    fontWeight: "bold",
    padding: "8px",
    justifyContent: "flex-start",
    paddingLeft: "20px",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    display: "flex",
    justifyContent: "flex-start",
  },
  "& .MuiDataGrid-menuIcon": {
    display: "none",
  },
  "& .MuiDataGrid-iconButtonContainer": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeaderTitleContainer": {
    display: "flex",
    justifyContent: "flex-start !important",
    flexDirection: "row !important",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid #e0e0e0",
  },
  "& .MuiDataGrid-viewport": {
    overflowX: "auto",
  },
  "& .MuiDataGrid-root": {
    overflowX: "hidden",
  },
  "& .justify-center": {
    justifyContent: 'center', 
  },
  "& .flex-end": {

    justifyContent: "flex-end"
  },
});
