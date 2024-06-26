import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { default as MuiCard } from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { CardProp } from "@/types/CardProp";

function Card({ card }: CardProp) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { ...card } });

  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  const shouldShowCardActions =
    card.memberIds.length ||
    !!card.comments.length ||
    !!card.attachments.length;
  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
        overflow: "unset",
      }}
    >
      {card.cover && (
        <CardMedia component="img" height="140" image={card.cover} />
      )}
      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography>{card.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {card.description}
        </Typography>
      </CardContent>
      {shouldShowCardActions && (
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          {!!card.memberIds.length && (
            <Button size="small" startIcon={<GroupIcon />}>
              {card.memberIds.length}
            </Button>
          )}
          {!!card.comments.length && (
            <Button size="small" startIcon={<CommentIcon />}>
              {card.comments.length}
            </Button>
          )}
          {!!card.attachments.length && (
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card.comments.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  );
}

export default Card;
