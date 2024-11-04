import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Pagination,
} from "@mui/material";
import { fetchOrders } from "../../api/orderApi";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadOrders = async (pageNumber = 1) => {
    try {
      const data = await fetchOrders(0);
      setOrders(data.content);
      setPage(data.pageable.pageNumber + 1);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchOrders(value);
  };

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Order List
      </Typography>

      {orders.length > 0 ? (
        orders.map((order) => (
          <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">Order ID: {order.id}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {order.status}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {order.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total: ${order.totalAmount}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} textAlign="right">
                <Button variant="outlined" href={`/orders/${order.id}`}>
                  View Details
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))
      ) : (
        <Typography variant="body1">No orders found.</Typography>
      )}

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default OrderList;
