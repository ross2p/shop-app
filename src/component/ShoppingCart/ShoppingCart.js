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
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { fetchOrderItems } from "../../api/orderApi";
import { useParams } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const CartItem = ({ item, onRemove, onAdd, onSubtract, onToggleSelect }) => (
  <Paper
    sx={{
      p: 2,
      margin: "auto",
      flexGrow: 1,
      mb: 2,
    }}
  >
    <Grid container spacing={2} alignItems="center">
      {/* <Grid item xs={12} sm={1}>
        <Checkbox
          checked={item.selected}
          onChange={() => onToggleSelect(item.id)}
          inputProps={{ "aria-label": "select item" }}
        />
      </Grid> */}
      <Grid item xs={12} sm={4} md={3}>
        <ButtonBase sx={{ width: 128, height: 128 }}>
          <Img alt={item.product.name} src={item.product.image} />
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
          <Typography gutterBottom variant="subtitle1" component="div">
            {item.product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {item.product.description}
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
  console.log(orderId);
  const [cartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    async function loadDate() {
      try {
        const orders = await fetchOrderItems(orderId);
        console.log("orders", orders);
        setCartItems(orders.content);
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    }
    loadDate();
  }, [orderId]);

  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAdd = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleSubtract = (id) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // Automatically remove items with 0 quantity
    );
  };

  const handleToggleSelect = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const totalPrice = cartItems
    .filter((item) => item.selected)
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

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
        <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="/checkout"
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
}
