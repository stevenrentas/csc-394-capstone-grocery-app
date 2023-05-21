import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const FoodTable = (props) => {
  const food = props.food;
  const columns = props.columns;

  return (
    <Box sx={{ height: 655, width: "100%" }}>
      <DataGrid
        rows={food}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 30]}
        checkboxSelection
        sx={{
          width: "1000px",
          background: "#f0f0f0",
          color: "#000000",
        }}
      />
    </Box>
  );
};

export default FoodTable;
