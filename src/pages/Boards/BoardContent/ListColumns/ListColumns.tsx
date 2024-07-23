import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { Board } from "@/types/BoardProp";
import Box from "@mui/material/Box";
import Column from "./Column/Column";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
function ListColumns({ columns }: Pick<Board, "columns">) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm);

  return (
    <SortableContext
      items={columns.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
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
          <Column key={column._id} column={column} />
        ))}
        {!openNewColumnForm ? (
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
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
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              borderRadius: 3,
              height: "fit-content",
              bgcolor: (theme) => (theme.palette.mode === "dark" ? "#1d2125" : "#f1f2f4"),
            }}
          >
            <Box p={1}>
              <TextField
                id="input-with-icon-textfield"
                placeholder="Enter list title..."
                size="small"
                variant="outlined"
                autoFocus
                sx={{
                  flex: 1,
                  width: "100%",
                  mb: 1,
                  "& input": { bgcolor: "white", fontWeight: "600", py:"6px"},
                  "& .MuiOutlinedInput-root": {
                    ".MuiOutlinedInput-notchedOutline": { border: "1px solid #8590A2" },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#8590A2" 
                    },
                    "&.Mui-focused fieldset": {
                      boxShadow: "inset 0 0 0 2px #388bff",
                      border: "none",
                    },
                  },
                }}
              />
              <Button variant="contained">Add list</Button>
              <IconButton
                disableRipple
                sx={{
                  ml: 0.5,
                  borderRadius: "4px",
                  color: "#172b4d",
                  "&:hover": {
                    bgcolor: "#a6c5e229",
                  },
                  cursor: "pointer",
                }}
                onClick={toggleOpenNewColumnForm}
              >
                <CloseIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
}

export default ListColumns;
