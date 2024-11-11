import * as React from "react";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../../api/orderApi"; // Функція для отримання замовлень

export default function OrdersPage() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const fetchedOrders = await fetchOrders(); // отримуємо замовлення
        setOrders(fetchedOrders.content); // зберігаємо в стейт
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const handleViewOrderDetails = (orderId) => {
    navigate(`/order-trecking/${orderId}`); // Перехід на сторінку деталей замовлення
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Orders
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {orders.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary" align="center">
                No orders found.
              </Typography>
            </Grid>
          ) : (
            orders.map((order) => (
              <Grid item xs={12} sm={6} md={4} key={order.id}>
                <Paper
                  sx={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Order ID: {order.id}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    gutterBottom
                  >
                    Status: <strong>{order.status}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    User: {order.user.firstName} {order.user.lastName} (
                    {order.user.email})
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    Total Amount:{" "}
                    <strong>${order.totalAmount.toFixed(2)}</strong>
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onClick={() => handleViewOrderDetails(order.id)}
                  >
                    View Details
                  </Button>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Box>
  );
}
