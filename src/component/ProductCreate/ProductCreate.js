import React, { useState } from "react";
import { Button, Grid, Typography, Paper } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { fetchProductCreate } from "../../api/productsApi";

import ProductImage from "./ProductImage";
import ProductData from "./ProductData";
import Characteristic from "./Characteristic";

const ProductCreate = () => {
  const [product, setProduct] = useState({
    name: "test",
    description: "",
    barcode: "",
    price: 0,
    categoryId: "",
    characteristic: [{ key: "", value: "", errors: "" }],
    imageFiles: [],
  });

  const handleChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    //map characteristic
    const characteristic = product.characteristic
      .filter(
        (item) => item.key !== "" && item.value !== "" && item.errors === ""
      )
      .reduce((acc, current) => {
        acc[current.id] = current;
        return acc;
      }, {});

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("barcode", product.barcode);
    formData.append("price", product.price);
    formData.append("categoryId", product.categoryId);
    formData.append("characteristic", characteristic);

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
