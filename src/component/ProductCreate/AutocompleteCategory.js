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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AutocompleteCategory = ({ product, handleChange }) => {
  //   const [product, setProduct] = useState({
  //     name: "",
  //     description: "",
  //     barcode: "",
  //     price: 0,
  //     rating: 0,
  //     categoryId: "",
  //   });
  const [newCategoryName, setNewCategoryName] = useState("");

  const [categories, setCategories] = useState([]);
  const [openNewCategoryDialog, setOpenNewCategoryDialog] = useState(false);

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
    <>
      <Autocomplete
        options={[...categories, { id: "new", name: "Add new category" }]}
        getOptionLabel={(option) => option.name}
        value={categories.find((cat) => cat.id === product.categoryId) || null}
        onChange={(e, newValue) => {
          if (newValue?.id === "new") {
            handleNewCategoryDialog();
          } else {
            handleChange("categoryId", newValue?.id || "");
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Category" variant="outlined" />
        )}
      />
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
    </>
  );
};

export default AutocompleteCategory;
