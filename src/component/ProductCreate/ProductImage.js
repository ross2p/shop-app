import React, { useState } from "react";
import { Button, Box, Grid, CardMedia, IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import Carousel from "react-material-ui-carousel";
import { fetchCreateImage, fetchDeleteImage } from "../../api/imageApi";

const ProductImage = ({ product, handleChange }) => {
  const handleUploadImage = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      console.error("No files selected");
      return;
    }
    const newImages = [];
    for (const file of files) {
      const formData = new FormData();

      formData.append("file", file);
      const result = await fetchCreateImage(formData);
      newImages.push(result);
    }
    await handleChange("images", [...product.images, ...newImages]);

    console.log("product.images", product.images);
  };

  const handleDeleteImage = async (index) => {
    await fetchDeleteImage(product.images[index].id);
    const updatedImages = product.images.filter((_, i) => i !== index);
    handleChange("images", updatedImages);
  };

  return (
    <>
      {product.images.length > 0 && (
        <Grid item xs={12}>
          <Box sx={{ flex: 1 }}>
            <Carousel>
              {product.images.map((img, index) => (
                <Box key={index} sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={`data:image/jpeg;base64,${img.data}`}
                    alt={`Preview ${index + 1}`}
                    sx={{
                      objectFit: "contain",
                    }}
                  />
                  <IconButton
                    aria-label="delete"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 60,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                    }}
                    // onClick={() => handleDeleteImage(index)}
                    onClick={() => handleDeleteImage(index)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              ))}
            </Carousel>
          </Box>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<ImageIcon />}
          fullWidth
        >
          Upload Photos
          <input type="file" hidden multiple onChange={handleUploadImage} />
        </Button>
      </Grid>
    </>
  );
};

export default ProductImage;
