import * as React from "react";
import { Search } from "./Search";
import { Container, CssBaseline, Paper, styled } from "@mui/material";
import ProductCard from "./ProductCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { featchProducts } from "../../api/productsApi";
export function Home() {
  const [error, setError] = React.useState(null);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const loadDecks = async () => {
      try {
        const data = await featchProducts();
        setProducts(data.content);
      } catch (err) {
        setError("Failed to load products");
      }
    };
    loadDecks();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, marginTop: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Search />
          </Grid>

          <Grid item xs={0} sm={4}></Grid>
          {products?.map((product) => (
            <Grid item key={product.id} xs={12} sm={12} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
