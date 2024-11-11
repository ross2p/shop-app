import React, { useState } from "react";
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
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchOrderById, fetchOrderItems } from "../../api/orderApi";

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
  const [orderItems, setOrderItems] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  const loadData = async () => {
    try {
      const orderData = await fetchOrderById(orderId);
      const itemsData = await fetchOrderItems(orderId);
      setOrder(orderData);
      setOrderItems(itemsData.content);
    } catch (err) {
      setError("Failed to load order data");
    }
  };

  React.useEffect(() => {
    loadData();
  }, [orderId]);

  const steps = ["PENDING", "AWAITING_PAYMENT", "DELIVERY", "COMPLETED"];
  const activeStep = steps.indexOf(order.status);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSaveStatus = () => {
    setOrder((prevOrder) => ({ ...prevOrder, status: selectedStatus }));
    setOpenModal(false);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom align="center">
        Order Tracking
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Card sx={{ my: 2, p: 2 }}>
        <CardContent sx={{ position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "space-between" },
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Order Information
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={2} sx={{ textAlign: "center" }}>
              <Avatar sx={{ width: 56, height: 56 }}>
                {order.user.firstName[0]}
                {order.user.lastName[0]}
              </Avatar>
            </Grid>
            <Grid item xs={12} sm={10}>
              <Typography variant="body1">
                {order.user.firstName} {order.user.lastName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {order.user.email}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ my: 2 }}>
            <Typography variant="body1">
              <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
            </Typography>
            <Typography variant="body1">
              <strong>Order Date:</strong> {order.orderDate || "No date"}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {order.status}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            sx={{
              position: { md: "absolute" },
              top: { md: 8 },
              right: { md: 16 },
              mt: { xs: 2, md: 0 },
              alignSelf: { xs: "center" },
            }}
          >
            Change Status
          </Button>
          {/* Destination information */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Order Address</Typography>
          {order.address ? (
            <TableContainer
              component={Paper}
              sx={{ boxShadow: "none" }}
              md={{ width: "50%", boxShadow: "none" }}
            >
              <Table sx={{ borderCollapse: "collapse" }}>
                <TableBody>
                  <TableRow sx={{ border: "none" }}>
                    <TableCell sx={{ border: "none" }}>
                      <strong>Street</strong>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {order.address.street}, {order.address.building}
                    </TableCell>
                  </TableRow>
                  {order.address.apartment && (
                    <TableRow sx={{ border: "none" }}>
                      <TableCell sx={{ border: "none" }}>
                        <strong>Apartment</strong>
                      </TableCell>
                      <TableCell sx={{ border: "none" }}>
                        {order.address.apartment}
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow sx={{ border: "none" }}>
                    <TableCell sx={{ border: "none" }}>
                      <strong>City</strong>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {order.address.city}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ border: "none" }}>
                    <TableCell sx={{ border: "none" }}>
                      <strong>Postal Code</strong>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {order.address.postcode}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ border: "none" }}>
                    <TableCell sx={{ border: "none" }}>
                      <strong>Country</strong>
                    </TableCell>
                    <TableCell sx={{ border: "none" }}>
                      {order.address.country}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Address not provided
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Order Items Section */}
      <Card sx={{ my: 2, p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {orderItems.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ width: { xs: "50px", md: "100px" } }}>
                        <Avatar
                          src={
                            item.product?.images?.[0]
                              ? `data:image/jpeg;base64,${item.product.images[0]}`
                              : ""
                          }
                          variant="rounded"
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          <strong>{item.product.name}</strong>
                        </Typography>
                        <Typography variant="body2">
                          <strong>Quantity:</strong> {item.quantity}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1">
                          <strong>Price:</strong> ${item.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Total:</strong> $
                          {(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No items found in this order.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Change Status Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Change Order Status</DialogTitle>
        <DialogContent>
          <Select
            value={selectedStatus}
            onChange={handleStatusChange}
            fullWidth
          >
            {steps.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveStatus} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default OrderTracking;
