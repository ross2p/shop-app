import React, { useState } from "react";
import { Button, Box, Grid, CardMedia, IconButton } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import Carousel from "react-material-ui-carousel";

const ProductImage = ({ product, handleChange }) => {
  const [previewImages, setPreviewImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [...(product.images || []), ...files];
    handleChange("images", updatedImages);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    handleChange("images", updatedImages);

    setPreviewImages((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <>
      {previewImages.length > 0 && (
        <Grid item xs={12}>
          <Box sx={{ flex: 1 }}>
            <Carousel>
              {previewImages.map((img, index) => (
                <Box key={index} sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={img}
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
          <input type="file" hidden multiple onChange={handleFileChange} />
        </Button>
      </Grid>
    </>
  );
};

export default ProductImage;
