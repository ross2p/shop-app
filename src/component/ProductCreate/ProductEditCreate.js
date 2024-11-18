import React, { useState } from "react";
import { Button, Grid, Typography, Paper } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { fetchProductCreate } from "../../api/productsApi";

import ProductImage from "./ProductImage";
import ProductData from "./ProductData";
import Characteristic from "./Characteristic";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../api/productsApi";
import Promotion from "./Promotion";

const ProductEditCreate = ({ name, product, setProduct, handleOperator }) => {
  const handleChange = (field, value) => {
    console.log(product);
    setProduct((prev) => ({ ...prev, [field]: value }));
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
        {name}
      </Typography>

      <Grid container spacing={3}>
        <ProductImage handleChange={handleChange} product={product} />
        <ProductData handleChange={handleChange} product={product} />
        <Characteristic handleChange={handleChange} product={product} />
        <Promotion handleChange={handleChange} product={product} />

        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleOperator}
            sx={{ mt: 2, px: 4, py: 1 }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductEditCreate;
