import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchOrderItems,
  fetchOrderById,
  fetchUpdateOrder,
  fetchUpdateOrderItem,
  fetchDeleteOrderItem,
} from "../../api/orderApi";
import { fetchAddresses } from "../../api/userApi";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const CartItem = ({ item, onRemove, onAdd, onSubtract, onToggleSelect }) => (
  <Paper sx={{ p: 2, margin: "auto", flexGrow: 1, mb: 2 }}>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={4} md={3}>
        <ButtonBase sx={{ width: 128, height: 128 }}>
          <Img
            alt={item.product.name}
            src={
              item.product?.images?.[0]
                ? `data:image/jpeg;base64,${item.product.images[0].data}`
                : ""
            }
          />
        </ButtonBase>
      </Grid>
      <Grid
        item
        container
        direction="column"
        spacing={1}
        xs={12}
        sm={6}
        md={4}
        lg={3}
      >
        <Grid item>
          <Typography gutterBottom variant="h5" component="div">
            {item.product.name}
          </Typography>
        </Grid>
        <Grid item direction="column" xs={4}>
          <Box display="flex" alignItems="center">
            <IconButton
              aria-label="subtract"
              onClick={() => onSubtract(item.id)}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="body2" sx={{ mx: 1 }}>
              Quantity: {item.quantity}
            </Typography>
            <IconButton aria-label="add" onClick={() => onAdd(item.id)}>
              <AddIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <Typography variant="subtitle1" component="div">
          ${item.price.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton aria-label="delete" onClick={() => onRemove(item.id)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  </Paper>
);

export default function ShoppingCart() {
  const { id: orderId } = useParams();
  const [cartItems, setCartItems] = React.useState([]);
  const [order, setOrder] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const [addresses, setAddresses] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    loadData();
  }, [orderId]);

  async function loadData() {
    try {
      const [orderItems, order, fetchedAddresses] = await Promise.all([
        fetchOrderItems(orderId),
        fetchOrderById(orderId),
        fetchAddresses(),
      ]);
      setOrder(order);
      setCartItems(orderItems.content);
      setAddresses(fetchedAddresses.content);
    } catch (error) {
      console.error("Failed to load order data", error);
    }
  }

  const handleRemove = async (id) => {
    await fetchDeleteOrderItem(id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAdd = (id) => {
    handleQuantity(id, (quantity) => quantity + 1);
  };

  const handleSubtract = async (id) => {
    handleQuantity(id, (quantity) => quantity - 1);
  };

  const handleQuantity = async (id, operator) => {
    let updatedItem;
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            updatedItem = { ...item, quantity: operator(item.quantity) };
            return updatedItem;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
    if (updatedItem) {
      await fetchUpdateOrderItem(id, {
        productId: updatedItem.product.id,
        quantity: updatedItem.quantity,
      });
      await loadData();
    }
  };

  const handleToggleSelect = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleChangeStatus = async () => {
    if (selectedAddress) {
      await fetchUpdateOrder(orderId, {
        status: "DELIVERY",
        addressId: selectedAddress,
      });
      navigate("/");
    }
  };

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={handleRemove}
          onAdd={handleAdd}
          onSubtract={handleSubtract}
          onToggleSelect={handleToggleSelect}
        />
      ))}
      <Divider sx={{ my: 2 }} />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6">Total: ${order.totalAmount}</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setOpenModal(true)}
        >
          Proceed to Checkout
        </Button>
      </Box>

      {/* Address Selection Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Select an Address</DialogTitle>
        <DialogContent sx={{ padding: 4 }}>
          <List>
            {addresses.map((address) => (
              <ListItem
                button
                key={address.id}
                onClick={() => setSelectedAddress(address.id)}
                selected={selectedAddress === address.id}
                sx={{
                  padding: 2,
                  marginBottom: 2,
                  borderRadius: 2,
                  border:
                    selectedAddress === address.id
                      ? "2px solid #3f51b5"
                      : "1px solid #ddd",
                }}
              >
                <ListItemText
                  primary={`${address.country}, ${address.city}, ${address.street} ${address.building}, Apt ${address.apartment}, ${address.postcode}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangeStatus} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
