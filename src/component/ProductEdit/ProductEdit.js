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
  Avatar,
  IconButton,
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

const initialCategories = [
  { id: "70536671-390a-4610-a305-b215da6f9530", name: "Продукти" },
  { id: "12345678-90ab-cdef-1234-567890abcdef", name: "Напої" },
];

const ProductEdit = () => {
  const [product, setProduct] = useState({
    name: "Coca-Cola",
    description:
      "The Coca-Cola drink is a magic of taste, a unique recipe and a unique bottle shape that cannot be confused with another.",
    barcode: "123454712",
    price: 20.0,
    categoryId: "70536671-390a-4610-a305-b215da6f9530",
    image: [
      "https://image.maudau.com.ua/webp/size/lg/products/54/8a/a9/548aa9f4-e5be-41c9-916d-8a249e84762b.jpg",
    ],
    characteristic: {
      Brand: "Coca-Cola",
      Country: "Ukraine",
      View: "Strong carbonated",
      Weight: "1 kg",
    },
  });

  const { id: productId } = useParams();

  const [categories, setCategories] = useState(initialCategories);
  const [characteristic, setCharacteristic] = useState([
    { key: "Brand", value: "Coca-Cola", error: "The key is duplicated" },
    { key: "Country", value: "Ukraine", error: "" },
    { key: "View", value: "Strong carbonated", error: "" },
    { key: "Weight", value: "1 kg", error: "" },
    { key: "", value: "", error: "" },
  ]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [openNewCategoryDialog, setOpenNewCategoryDialog] = useState(false);

  const loadData = async () => {
    try {
      const data = await fetchProductById(productId);
      setProduct(data);
    } catch (err) {
      console.error("Failed to load product");
    }
  };
  React.useEffect(() => {
    loadData();
  }, [productId]);

  React.useEffect(() => {
    const map = Object.entries(product.characteristic).map(([key, value]) => ({
      key,
      value,
      error: "",
    }));
    setCharacteristic(map);
  }, [product]);

  const handleChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleCharacteristicChange = (key, value, index) => {
    let characteristicCopy = [...characteristic];
    if (key === "" && value === "") {
      characteristicCopy.splice(index, 1);
      setCharacteristic([...characteristicCopy]);
    }

    if (index === characteristic.length - 1) {
      console.log("length", characteristic.length - 1);
      characteristicCopy.push({ key: "", value: "" });
      setCharacteristic([...characteristicCopy]);
    }

    characteristicCopy[index] = { key, value };
    setCharacteristic(characteristicCopy);

    console.log("characteristic", characteristic);
    characteristicCopy = validateCharacteristic(characteristicCopy);

    // setProduct((prev) => ({
    //   ...prev,
    //   characteristic: { ...characteristicCopy },
    // }));
  };

  const handleSave = async () => {
    let characteristicCopy = [
      ...characteristic.filter((item) => item.key !== ""),
    ];
    let characteristicMap = {};
    characteristicCopy.forEach((item) => {
      characteristicMap[item.key] = item.value;
    });
    const productCopy = { ...product, characteristic: characteristicMap };
    console.log("productCopy", productCopy);
    await fetchUpdateProduct(productId, productCopy);
    console.log("productCopy success", productCopy);
  };
  const validateCharacteristic = (characteristic) => {
    for (let i = 0; i < characteristic.length - 1; i++) {
      for (let j = 0; j < characteristic.length - 1; j++) {
        if (i !== j && characteristic[i].key === characteristic[j].key) {
          console.log("characteristic[i].key", characteristic[i].key);
          characteristic[i].error = "The key is duplicated";
          characteristic[j].error = "The key is duplicated";
        }
      }
      if (characteristic.key === "" || characteristic.value === "") {
        characteristic[i].error = "The field cannot be empty";
      } else {
        characteristic[i].error = "";
      }
      console.log("characteristic.error", characteristic[i].error);
    }

    // return characteristic;
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

  const handleAddNewCharacteristicRow = () => {
    setProduct((prev) => ({
      ...prev,
      characteristic: { ...prev.characteristic, "": "" },
    }));
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
        Редагування продукту
      </Typography>

      <Box
        elevation={2}
        sx={{ padding: 2, mb: 4, display: "flex", alignItems: "center" }}
      >
        <Avatar
          src={
            product.images?.[0]
              ? `data:image/jpeg;base64,${product.images[0]}`
              : ""
          }
          alt="Product Image"
          sx={{ width: 80, height: 80, marginRight: 2 }}
        >
          <ImageIcon />
        </Avatar>
        <TextField
          label="URL зображення"
          fullWidth
          value={product.image[0]}
          onChange={(e) => handleChange("image", [e.target.value])}
          variant="outlined"
        />
      </Box>

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

        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ mt: 2, px: 4, py: 1 }}
          >
            Save
          </Button>
        </Grid>
      </Grid>

      {/* Діалогове вікно для нової категорії */}
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

export default ProductEdit;
