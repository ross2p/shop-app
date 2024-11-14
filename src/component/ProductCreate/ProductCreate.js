import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Autocomplete,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  CardMedia,
  IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { fetchProductCreate } from "../../api/productsApi";

import ProductImage from "./ProductImage";
import ProductData from "./ProductData";

const ProductCreate = () => {
  const [product, setProduct] = useState({
    name: "test",
    description: "",
    barcode: "",
    price: 0,
    rating: 0,
    categoryId: "",
    imageFiles: [],
  });

  const handleChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("barcode", product.barcode);
    formData.append("price", product.price);
    formData.append("rating", product.rating);
    formData.append("categoryId", product.categoryId);

    //todo
    product.imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    await fetchProductCreate(formData);
    console.log("Product saved successfully with images!");
  };

  return (
    <Paper
      sx={{
        padding: 4,
        borderRadius: 3,
        boxShadow: 4,
        maxWidth: 800,
        margin: "auto",
        mt: 5,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
        Create new product
      </Typography>

      <Grid container spacing={3}>
        <ProductImage handleChange={handleChange} product={product} />
        <ProductData handleChange={handleChange} product={product} />

        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ mt: 2, px: 4, py: 1 }}
          >
            Зберегти
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductCreate;
