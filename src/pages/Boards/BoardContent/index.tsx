import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";

import ContentCut from "@mui/icons-material/ContentCut";
import AddCardIcon from "@mui/icons-material/AddCard";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ContentPaste from "@mui/icons-material/ContentPaste";
import ContentCopy from "@mui/icons-material/ContentCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";

import Image1 from "@/assets/image/image1.jpg";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "50px";

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#166194" : "#0984e3",
        height: (theme) => theme.trello.boardContentHeight,
        padding: "8px 0"
      }}
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
        
        <Box
          sx={{
            minWidth: "272px",
            maxWidth: "272px",
            ml: 2,
            borderRadius: 3,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#1d2125" : "#f1f2f4",
            height: "fit-content",
            maxHeight: (theme) =>
              `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5.5)})`,
          }}
        >
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>Column title</Typography>
            <Box>
              <IconButton onClick={handleClick} sx={{ borderRadius: "8px" }}>
                <MoreHorizOutlinedIcon sx={{ fontSize: "20px" }} />
              </IconButton>
              <Menu
                id="workspaces-menu"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "workspaces-button",
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon sx={{ fontSize: "20px" }} />
                  </ListItemIcon>
                  <Typography>Add card</Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut sx={{ fontSize: "20px" }} />
                  </ListItemIcon>
                  <Typography>Cut</Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy sx={{ fontSize: "20px" }} />
                  </ListItemIcon>
                  <Typography>Copy</Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste sx={{ fontSize: "20px" }} />
                  </ListItemIcon>
                  <Typography>Paste</Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon sx={{ fontSize: "20px" }} />
                  </ListItemIcon>
                  <Typography>Remove this column</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              maxHeight: (theme) =>
                `calc(${theme.trello.boardContentHeight} - 
            ${theme.spacing(5.5)} - 
            ${COLUMN_HEADER_HEIGHT} - 
            ${COLUMN_FOOTER_HEIGHT})`,
              overflowX: "hidden",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "#091e4224 #091e420f",
              p: "0 4px",
              m: "0 4px",
            }}
          >
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={Image1}
                alt="green iguana"
              />
              <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Lizard</Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions sx={{ p: "0 4px 8px 4px" }}>
                <Button size="small" startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<CommentIcon />}>
                  10
                </Button>
                <Button size="small" startIcon={<AttachmentIcon />}>
                  5
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: "pointer",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
                overflow: "unset",
              }}
            >
              <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              gap: 2,
            }}
          >
            <Button
              startIcon={<AddIcon />}
              sx={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              Add a card
            </Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ fontSize: "20px", cursor: "pointer" }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BoardContent;
