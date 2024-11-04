import * as React from "react";
import { Search } from "./Search";
import { Container, CssBaseline, Paper, styled } from "@mui/material";
import DeckCard from "./DeckCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { fetchDecks } from "../../api/deckApi";
export function Home() {
  const [error, setError] = React.useState(null);
  const [decks, setDecks] = React.useState([]);

  React.useEffect(() => {
    const loadDecks = async () => {
      try {
        const data = await fetchDecks();
        setDecks(data.content);
        console.log(data.content);
      } catch (err) {
        setError("Failed to load decks");
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
          {decks.map((deck) => (
            <Grid item key={deck.id} xs={12} sm={6} md={4} lg={3}>
              <DeckCard deck={deck} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
