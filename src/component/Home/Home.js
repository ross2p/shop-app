import * as React from "react";
import { Container, Box, Grid, Pagination } from "@mui/material";
import { Search } from "./Search";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../../api/productsApi";

export function Home() {
  const [products, setProducts] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [sortBy, setSortBy] = React.useState("name");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    loadDecks();
  }, [page, sortBy]);

  const loadDecks = async () => {
    try {
      const data = await fetchProducts({
        offset: page,
        pageSize: 8,
        sortBy,
        search: searchQuery,
      });
      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ marginTop: 5 }}>
        <Grid container spacing={2}>
          <Search
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={loadDecks}
          />
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={12} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={(e, value) => setPage(value - 1)}
                color="primary"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
