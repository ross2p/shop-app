import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { fetchUser } from "../../api/authApi";
import { fetchUpdateUser, fetchCreateAddress } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [newAddresses, setNewAddresses] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const fetchedUser = await fetchUser();
        setUser(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    loadUser();
  }, []);

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (index, field, value, isNew) => {
    const updatedAddresses = isNew ? [...newAddresses] : [...user.addresses];
    updatedAddresses[index][field] = value;
    isNew
      ? setNewAddresses(updatedAddresses)
      : setUser((prev) => ({ ...prev, addresses: updatedAddresses }));
  };

  const handleAddNewAddress = () => {
    setNewAddresses((prev) => [
      ...prev,
      {
        country: "",
        city: "",
        street: "",
        building: "",
        apartment: "",
        postcode: "",
      },
    ]);
  };

  const handleRemoveAddress = (index, isNew) => {
    const updatedAddresses = isNew
      ? newAddresses.filter((_, i) => i !== index)
      : user.addresses.filter((_, i) => i !== index);
    isNew
      ? setNewAddresses(updatedAddresses)
      : setUser((prev) => ({ ...prev, addresses: updatedAddresses }));
  };

  const handleSave = async () => {
    try {
      await fetchUpdateUser(user.id, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthDate: user.birthDate,
      });

      for (const address of newAddresses) {
        await fetchCreateAddress({
          ...address,
          userId: user.id,
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Failed to save user or address:", error);
    }
  };

  if (!user) return <Typography>Loading...</Typography>;

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
        Існуючі Адреси
      </Typography>

      {user.addresses.map((address, index) => (
        <AddressForm
          key={index}
          address={address}
          index={index}
          isNew={false}
          handleAddressChange={handleAddressChange}
          handleRemoveAddress={handleRemoveAddress}
        />
      ))}

      <Typography variant="h6" sx={{ mb: 2 }}>
        Нові Адреси
      </Typography>

      {newAddresses.map((address, index) => (
        <AddressForm
          key={`new-${index}`}
          address={address}
          index={index}
          isNew={true}
          handleAddressChange={handleAddressChange}
          handleRemoveAddress={handleRemoveAddress}
        />
      ))}

      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddNewAddress}
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
};

const AddressForm = ({
  address,
  index,
  isNew,
  handleAddressChange,
  handleRemoveAddress,
}) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Країна"
              fullWidth
              value={address.country}
              onChange={(e) =>
                handleAddressChange(index, "country", e.target.value, isNew)
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Місто"
              fullWidth
              value={address.city}
              onChange={(e) =>
                handleAddressChange(index, "city", e.target.value, isNew)
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Вулиця"
              fullWidth
              value={address.street}
              onChange={(e) =>
                handleAddressChange(index, "street", e.target.value, isNew)
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
                handleAddressChange(index, "building", e.target.value, isNew)
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
                handleAddressChange(index, "apartment", e.target.value, isNew)
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Поштовий індекс"
              fullWidth
              value={address.postcode}
              onChange={(e) =>
                handleAddressChange(index, "postcode", e.target.value, isNew)
              }
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => handleRemoveAddress(index, isNew)}
        >
          Видалити
        </Button>
      </CardActions>
    </Card>
  );
};

export default Profile;
