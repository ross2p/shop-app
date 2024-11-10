import React from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
  Avatar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../../api/orderApi";
const orderData = {
  id: "57c322ae-af6d-4790-b04b-4f84087da515",
  status: "PENDING",
  user: {
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@admin.com",
    addresses: ["123 Main St, Springfield, USA"],
  },
  totalAmount: 100.0,
  orderDate: "2024-11-05T20:01:45.311+00:00",
};

export function OrderTracking() {
  const { id: orderId } = useParams();
  const [order, setOrder] = React.useState(orderData);
  const [error, setError] = React.useState(null);

  const loadData = async () => {
    try {
      const data = await fetchOrderById(orderId);
      setOrder(data);
    } catch (err) {
      setError("Failed to load order");
    }
  };
  React.useEffect(() => {
    loadData();
  }, [orderId]);
  const steps = [
    "PENDING",
    "AWAITING_PAYMENT",
    "DELIVERY",
    "COMPLETED",
    "CANCELED",
  ];
  const activeStep = steps.indexOf(order.status);

  return (
    <Box sx={{ margin: "5%", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Відстеження замовлення
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6">Інформація про замовлення</Typography>
          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar>
              {order.user.firstName[0]}
              {order.user.lastName[0]}
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body1">
                {order.user.firstName} {order.user.lastName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {order.user.email}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1">
            <strong>Сума замовлення:</strong> ${order.totalAmount.toFixed(2)}
          </Typography>
          <Typography variant="body1">
            <strong>Дата замовлення:</strong> {order.orderDate || "Немає дати"}
          </Typography>
          <Typography variant="body1">
            <strong>Статус:</strong> {order.status}
          </Typography>

          {/* Destination information */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Адреса доставки</Typography>
          {order.user.addresses.length > 0 ? (
            <Typography variant="body1">{order.user.addresses[0]}</Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Адреса не вказана
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default OrderTracking;
