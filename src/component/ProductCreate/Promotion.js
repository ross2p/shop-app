import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Switch,
  Typography,
  Box,
} from "@mui/material";

const promotionTypes = [
  { value: "FIXED_AMOUNT", label: "Fixed Amount" },
  { value: "PERCENTAGE", label: "Percentage" },
];

const ProductData = ({ product, handleChange }) => {
  const [promotion, setPromotion] = useState({
    name: "",
    description: "",
    type: "",
    startDate: "",
    endDate: "",
    discount: 0,
    amount: 0,
    maxAmount: 0,
  });

  const handleChangePromotion = (field, value) => {
    setPromotion({ ...promotion, [field]: value });
    handleChange("promotion", { ...product.promotion, [field]: value });
  };

  const handleIsPromotionActive = (value) => {
    console.log("value", value);
    handleChange("promotion", value ? promotion : null);
  };

  return (
    <Grid container spacing={2}>
      {/* Promotion Switcher */}
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ mr: 2 }}>
            Enable Promotion:
          </Typography>
          <Switch
            checked={!!product.promotion}
            onChange={(e) => handleIsPromotionActive(e.target.checked)}
            color="primary"
          />
        </Box>
      </Grid>

      {!!product.promotion && (
        <>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Promotion Name"
              value={product.promotion.name || ""}
              onChange={(e) => handleChangePromotion("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Description"
              value={product.promotion.description || ""}
              onChange={(e) =>
                handleChangePromotion("description", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Type"
              value={product.promotion.type || ""}
              onChange={(e) => handleChangePromotion("type", e.target.value)}
            >
              {promotionTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Date"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={product.promotion.startDate || ""}
              onChange={(e) =>
                handleChangePromotion("startDate", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="End Date"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={product.promotion.endDate || ""}
              onChange={(e) => handleChangePromotion("endDate", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Discount"
              type="number"
              value={product.promotion.discount || ""}
              onChange={(e) =>
                handleChangePromotion("discount", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={product.promotion.amount || ""}
              onChange={(e) => handleChangePromotion("amount", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Max Amount"
              type="number"
              value={product.promotion.maxAmount || ""}
              onChange={(e) =>
                handleChangePromotion("maxAmount", e.target.value)
              }
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ProductData;
