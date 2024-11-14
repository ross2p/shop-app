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
import AutocompleteCategory from "./AutocompleteCategory";

const initialCategories = [
  { id: "70536671-390a-4610-a305-b215da6f9530", name: "Продукти" },
  { id: "12345678-90ab-cdef-1234-567890abcdef", name: "Напої" },
];
const ProductData = ({ product, handleChange }) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Назва"
          fullWidth
          value={product.name}
          onChange={(e) => handleChange("name", e.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Штрих-код"
          fullWidth
          value={product.barcode}
          onChange={(e) => handleChange("barcode", e.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Опис"
          fullWidth
          multiline
          rows={4}
          value={product.description}
          onChange={(e) => handleChange("description", e.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Ціна"
          type="number"
          fullWidth
          value={product.price}
          onChange={(e) => handleChange("price", e.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AutocompleteCategory product={product} handleChange={handleChange} />
      </Grid>
    </>
  );
};

export default ProductData;
