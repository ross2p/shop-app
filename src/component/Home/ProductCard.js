import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Badge } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Star, StarBorder } from "@mui/icons-material";
import { fetchAddProduct } from "../../api/orderApi";

export default function ProductCard({ product }) {
  const calculateDiscount = (originalPrice, discountedPrice) => {
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  async function handleAddToCart(productId) {
    await fetchAddProduct(productId, 1);
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        mx: "auto",
        mt: 4,
        boxShadow: 3,
        position: "relative",
      }}
    >
      {product.promotion && (
        <Badge
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            backgroundColor: "error.main",
            color: "white",
            padding: "4px 8px",
            borderRadius: "8px",
            fontSize: "0.75rem",
          }}
        >
          {product.promotion.name}
        </Badge>
      )}

      <CardMedia
        sx={{
          height: 240,
          backgroundSize: "contain",
        }}
        image={
          product.images?.[0]
            ? `data:image/jpeg;base64,${product.images[0].data}`
            : ""
        }
        title={product.name}
      />

      <CardContent>
        <RouterLink
          to={`/product/${product.id}`}
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
            onClick={() => {
              handleAddToCart(product.id);
            }}
          >
            Add to cart
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
