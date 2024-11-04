import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Box, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { AppRoutes } from "../../utils/routes";

export default function DeckCard({ deck }) {
  return (
    <Link component={RouterLink} to={`/deck/${deck.id}`}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://img.freepik.com/free-photo/neutral-abstract-texture-minimal-background_53876-98402.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {deck.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {deck.description}
          </Typography>
        </CardContent>
        <CardContent style={{ padding: 0, paddingBottom: 10, paddingLeft: 10 }}>
          {deck.collaborators.map((user, index) => (
            <IconButton key={index} sx={{ p: 0, margin: "5px" }}>
              <Avatar
                alt={user.firstName + " " + user.lastName}
                src="/static/images/avatar/2.jpg"
              />
            </IconButton>
          ))}
          {deck.collaborators.length > 5 && <Button>...</Button>}
        </CardContent>
      </Card>
    </Link>
  );
}
