import React, { useState } from "react";
import { Button, Grid, Typography, Paper } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { fetchProductCreate } from "../../api/productsApi";

import ProductImage from "./ProductImage";
import ProductData from "./ProductData";
import Characteristic from "./Characteristic";
import { useNavigate } from "react-router-dom";

const ProductCreate = () => {
  const navigator = useNavigate();
  const [product, setProduct] = useState({
    name: "test",
    description: "",
    barcode: "",
    price: 0,
    categoryId: "",
    characteristic: [{ key: "", value: "", errors: "" }],
    images: [],
  });

  const handleChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const characteristic = product.characteristic
      .filter((item) => item.key !== "" && item.value !== "")
      .reduce((acc, current) => {
        acc[current.key] = current.value;
        return acc;
      }, {});

    const formData = new FormData();
    formData.append(
      "body",
      new Blob([JSON.stringify({ ...product, characteristic })], {
        type: "application/json",
      })
    );

    product.images.forEach((file) => {
      formData.append("files", file);
    });

    const newProduct = await fetchProductCreate(formData);
    navigator(`/product/${newProduct.id}`);
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
        <Characteristic handleChange={handleChange} product={product} />

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
