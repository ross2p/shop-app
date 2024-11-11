import { useEffect } from "react";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

function Profile() {
  const initialUser = {
    id: "9f3e06da-a890-4980-b4cc-d9e816f84c97",
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@admin.com",
    birthDate: "2005-06-22",
    role: {
      id: "edf10bdf-a0ce-4f16-91d7-a9d3dd1f6d35",
      name: "ADMIN",
      description: "",
      createdAt: "2024-11-10T18:19:55.213+00:00",
      updatedAt: "2024-11-10T18:19:55.213+00:00",
      deletedAt: null,
    },
    addresses: [
      {
        id: "9f36b011-199c-4f73-8eed-1498305454a7",
        country: "Ukraine",
        city: "Lviv",
        street: "Shevchenka str",
        building: "2a",
        apartment: "54",
        postcode: "89077",
        createdAt: "2024-11-11T18:55:05.741+00:00",
        updatedAt: "2024-11-11T18:55:05.741+00:00",
        deletedAt: null,
      },
    ],
    createdAt: "2024-11-10T18:19:55.213+00:00",
    updatedAt: "2024-11-10T18:19:55.213+00:00",
    deletedAt: null,
    history: [
      {
        id: "7ef4b023-1477-4806-8fd4-70086ad07f75",
        status: "PENDING",
        orderDate: null,
        totalAmount: 0.0,
        createdAt: "2024-11-10T21:15:15.989+00:00",
        updatedAt: "2024-11-10T21:15:15.989+00:00",
        deletedAt: null,
      },
      {
        id: "57c322ae-af6d-4790-b04b-4f84087da515",
        status: "COMPLETED",
        orderDate: null,
        totalAmount: 0.0,
        createdAt: "2024-11-10T18:19:55.213+00:00",
        updatedAt: "2024-11-10T21:15:15.965+00:00",
        deletedAt: null,
      },
    ],
  };

  const [user, setUser] = useState(initialUser);
  const [newAddress, setNewAddress] = useState({
    country: "",
    city: "",
    street: "",
    building: "",
    apartment: "",
    postcode: "",
  });

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...user.addresses];
    updatedAddresses[index][field] = value;
    setUser((prev) => ({ ...prev, addresses: updatedAddresses }));
  };

  const handleAddAddress = () => {
    setUser((prev) => ({
      ...prev,
      addresses: [...prev.addresses, { ...newAddress }],
    }));
    setNewAddress({
      country: "",
      city: "",
      street: "",
      building: "",
      apartment: "",
      postcode: "",
    });
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = user.addresses.filter((_, i) => i !== index);
    setUser((prev) => ({ ...prev, addresses: updatedAddresses }));
  };

  const handleSave = () => {
    console.log("Updated User:", user);
    alert("User information saved!");
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
        Редагування користувача
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Ім'я"
            fullWidth
            value={user.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Прізвище"
            fullWidth
            value={user.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            fullWidth
            value={user.email}
            onChange={(e) => handleChange("email", e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Дата народження"
            type="date"
            fullWidth
            value={user.birthDate}
            onChange={(e) => handleChange("birthDate", e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" sx={{ mb: 2 }}>
        Адреси
      </Typography>

      {user.addresses.map((address, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Країна"
                fullWidth
                value={address.country}
                onChange={(e) =>
                  handleAddressChange(index, "country", e.target.value)
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Місто"
                fullWidth
                value={address.city}
                onChange={(e) =>
                  handleAddressChange(index, "city", e.target.value)
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Вулиця"
                fullWidth
                value={address.street}
                onChange={(e) =>
                  handleAddressChange(index, "street", e.target.value)
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Будинок"
                fullWidth
                value={address.building}
                onChange={(e) =>
                  handleAddressChange(index, "building", e.target.value)
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Квартира"
                fullWidth
                value={address.apartment}
                onChange={(e) =>
                  handleAddressChange(index, "apartment", e.target.value)
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Поштовий індекс"
                fullWidth
                value={address.postcode}
                onChange={(e) =>
                  handleAddressChange(index, "postcode", e.target.value)
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <IconButton
                color="error"
                onClick={() => handleRemoveAddress(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}

      <Box>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddAddress}
        >
          Додати нову адресу
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{ mt: 2, px: 4 }}
        >
          Зберегти
        </Button>
      </Box>
    </Paper>
  );
}

export default Profile;
