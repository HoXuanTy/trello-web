import Box from "@mui/material/Box";
import Column from "./Column/Column";
import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";

import { Board } from "@/types/BoardProp";
function ListColumns({ columns }: Pick<Board, "columns">) {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
        bgcolor: "inherit",
        width: "100%",
        height: "100%",
        scrollbarColor: "#fff6 #00000026",
        scrollbarWidth: "auto",
      }}
    >
      {columns.map((column) => (
        <Column key={column._id} column={column}/>
      ))}
      <Box
        sx={{
          minWidth: "272px",
          maxWidth: "272px",
          mx: 2,
          borderRadius: 3,
          height: "fit-content",
          bgcolor: "#ffffff3d",
        }}
      >
        <Button
          startIcon={<AddIcon />}
          sx={{
            color: "white",
            width: "100%",
            justifyContent: "flex-start",
            pl: 2.5,
            py: 1,
          }}
        >
          Add another list
        </Button>
      </Box>
    </Box>
  );
}

export default ListColumns;
