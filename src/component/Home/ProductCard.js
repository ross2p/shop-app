import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Star, StarBorder } from "@mui/icons-material";

export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345, mx: "auto", mt: 4, boxShadow: 3 }}>
      <CardMedia
        sx={{ height: 240 }}
        image={
          product.image ??
          "https://img.freepik.com/free-photo/neutral-abstract-texture-minimal-background_53876-98402.jpg"
        }
        title={product.name}
      />
      <CardContent>
        <RouterLink
          to={`/deck/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
        </RouterLink>
        <Box display="flex" alignItems="center" mb={1}>
          {[...Array(5)].map((_, index) => (
            <IconButton key={index} size="small">
              {index < product.rating ? (
                <Star fontSize="inherit" color="primary" />
              ) : (
                <StarBorder fontSize="inherit" color="primary" />
              )}
            </IconButton>
          ))}
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {product.rating}.0
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            px: 2,
            pb: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: "primary.main" }}>
            ${product.price}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
            component={RouterLink}
            to={`/cart/add/${product.id}`}
          >
            Add to cart
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
