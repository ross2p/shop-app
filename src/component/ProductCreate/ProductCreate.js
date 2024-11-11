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
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import ImageIcon from "@mui/icons-material/Image";
import { fetchUpdateProduct } from "../../api/productsApi";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../api/productsApi";
import { fetchProductCreate } from "../../api/productsApi";

const initialCategories = [
  { id: "70536671-390a-4610-a305-b215da6f9530", name: "Продукти" },
  { id: "12345678-90ab-cdef-1234-567890abcdef", name: "Напої" },
];

const ProductCreate = () => {
  const [product, setProduct] = useState({
    name: "Coca-Cola1111",
    description:
      "The Coca-Cola drink is a magic of taste, a unique recipe and a unique bottle shape that cannot be confused with another. ",
    barcode: "123454712",
    price: 20.0,
    rating: 4.0,
    categoryId: "70536671-390a-4610-a305-b215da6f9530",
    characteristic: {
      Brand: "Coca-Cola",
      Country: "Ukraine",
      View: "Strong carbonated",
      Weight: "1 kg",
    },
  });
  const [categories, setCategories] = useState(initialCategories);
  const [characteristic, setCharacteristic] = useState([
    { key: "", value: "", error: "" },
  ]);
  const [imageFile, setImageFile] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [openNewCategoryDialog, setOpenNewCategoryDialog] = useState(false);

  const handleChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = async () => {
    let characteristicCopy = [
      ...characteristic.filter((item) => item.key !== ""),
    ];
    let characteristicMap = {};
    characteristicCopy.forEach((item) => {
      characteristicMap[item.key] = item.value;
    });
    let productCopy = { ...product, characteristic: characteristicMap };

    // Create a FormData object to handle the file upload
    const formData = new FormData();

    productCopy = {
      name: "Coca-Cola1111",
      description:
        "The Coca-Cola drink is a magic of taste, a unique recipe and a unique bottle shape that cannot be confused with another. ",
      barcode: "123454712",
      price: 20.0,
      rating: 4.0,
      categoryid: "70536671-390a-4610-a305-b215da6f9530",
      characteristic: {
        Brand: "Coca-Cola",
        Country: "Ukraine",
        View: "Strong carbonated",
        Weight: "1 kg",
      },
    };
    formData.append("name", productCopy.name);
    formData.append("description", productCopy.description);
    formData.append("barcode", productCopy.barcode);
    formData.append("price", productCopy.price);
    formData.append("rating", productCopy.rating);
    formData.append("categoryId", productCopy.categoryid);
    // formData.append("characteristic", productCopy.characteristic);
    if (imageFile) {
      formData.append("images", imageFile); // Attach the image file
    }
    console.log("formData", formData);

    // Replace fetchUpdateProduct with your API function to send formData
    await fetchProductCreate(formData);
    console.log("Product saved successfully with image!");
  };

  const handleNewCategoryDialog = () => {
    setOpenNewCategoryDialog(true);
  };

  const handleNewCategorySubmit = () => {
    const newCategory = {
      id: crypto.randomUUID(),
      name: newCategoryName,
    };
    setCategories((prev) => [...prev, newCategory]);
    handleChange("categoryId", newCategory.id);
    setOpenNewCategoryDialog(false);
    setNewCategoryName("");
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
          <Autocomplete
            options={[
              ...categories,
              { id: "new", name: "Додати нову категорію" },
            ]}
            getOptionLabel={(option) => option.name}
            value={
              categories.find((cat) => cat.id === product.categoryId) || null
            }
            onChange={(e, newValue) => {
              if (newValue?.id === "new") {
                handleNewCategoryDialog();
              } else {
                handleChange("categoryId", newValue?.id || "");
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Категорія" variant="outlined" />
            )}
          />
        </Grid>

        {/* Image Upload Field */}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<ImageIcon />}
            fullWidth
          >
            Завантажити фото
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {imageFile && <Typography>{imageFile.name}</Typography>}
        </Grid>

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

      <Dialog
        open={openNewCategoryDialog}
        onClose={() => setOpenNewCategoryDialog(false)}
      >
        <DialogTitle>Додати нову категорію</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Назва категорії"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewCategoryDialog(false)}>
            Скасувати
          </Button>
          <Button
            onClick={handleNewCategorySubmit}
            startIcon={<AddCircleOutlineIcon />}
          >
            Додати
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProductCreate;
