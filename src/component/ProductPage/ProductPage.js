import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Box,
  Rating,
  TextField,
  Avatar,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import PersonIcon from "@mui/icons-material/Person";
import { fetchAddProduct } from "../../api/orderApi";
import { fetchProductById } from "../../api/productsApi";
import { useParams } from "react-router-dom";

function ProductPage() {
  const product = {
    id: "4f5813e0-07d4-441f-9cde-b19079077172",
    name: "Coca-Cola111111",
    description: "Coca-Cola non-alcoholic drink 1.25 l",
    barcode: "123454712",
    price: 20.0,
    rating: 0.0,
    image: [
      "https://image.maudau.com.ua/webp/size/lg/products/54/8a/a9/548aa9f4-e5be-41c9-916d-8a249e84762b.jpg",
    ],
    characteristic: {
      Brand: "Coca-Cola",
      Country: "Ukraine",
      View: "Strong carbonated",
      Weight: "1 kg",
      "Shelf Life": "12 months",
    },
    comments: [
      {
        id: 1,
        user: "User1",
        text: "Це чудовий напій!",
        avatar: null,
        replies: [
          {
            id: 2,
            user: "User2",
            text: "Цілком згоден!",
            avatar: null,
            replies: [],
          },
        ],
      },
    ],
  };

  const { id: orderId } = useParams();
  console.log("orderId", orderId);

  const [productData, setProductData] = useState(product);

  const [rating, setRating] = useState(0.0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  React.useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(orderId);
        console.log(data);
        setProductData(data);
        setRating(data.rating);
        setComments(data.comments);
      } catch (err) {
        console.error("Failed to load product");
      }
    };
    console.log("orderId", orderId);
    loadProduct();
  }, [orderId]);

  const handleAddComment = (parentCommentId = null) => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        user: "Anonymous", // Replace with actual user data
        text: newComment.trim(),
        avatar: null,
        replies: [],
      };

      if (parentCommentId) {
        const updatedComments = addReply(
          comments,
          parentCommentId,
          newCommentObj
        );
        setComments(updatedComments);
      } else {
        setComments([newCommentObj, ...comments]);
      }

      setNewComment("");
      setReplyTo(null);
    }
  };

  const handleAddProduct = () => {
    fetchAddProduct(productData.id, 1);
  };

  const addReply = (comments, parentCommentId, reply) => {
    return comments?.map((comment) => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
        };
      }

      return {
        ...comment,
        replies: addReply(comment.replies, parentCommentId, reply),
      };
    });
  };

  const handleReplyClick = (comment) => {
    setReplyTo(comment);
  };

  const renderComments = (comments, parentId = null) => {
    return comments?.map((comment) => (
      <Box
        key={comment.id}
        sx={{
          marginBottom: 2,
          padding: 2,
          borderBottom: "1px solid #ddd",
          marginLeft: parentId ? 4 : 0,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar>
            {comment.avatar ? (
              <img src={comment.avatar} alt="avatar" />
            ) : (
              <PersonIcon />
            )}
          </Avatar>
          <Box>
            <Typography variant="body2">
              <strong>{comment.user}</strong>
            </Typography>
            <Typography variant="body1">{comment.text}</Typography>
            <Button
              size="small"
              onClick={() => handleReplyClick(comment)}
              sx={{ marginTop: 1 }}
            >
              Відповісти
            </Button>
          </Box>
        </Box>
        {renderComments(comment.replies, comment.id)}
      </Box>
    ));
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Card sx={{ padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Carousel>
              {productData.image?.map((img, index) => (
                <CardMedia
                  component="img"
                  height="300"
                  image={img}
                  alt={productData.name}
                  key={index}
                  sx={{
                    objectFit: "contain",
                  }}
                />
              ))}
            </Carousel>
          </Box>

          <Box sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h4">{productData.name}</Typography>
              {/* <Typography variant="body1" color="textSecondary" paragraph>
                {productData.description}
              </Typography> */}
              <Typography variant="h5" color="primary" paragraph>
                ₴{productData.price?.toFixed(2)}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Rating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  ({rating} зірок)
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddProduct()}
              >
                Add to cart
              </Button>
            </CardContent>
          </Box>
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h6">Description:</Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {productData.description}
            </Typography>
          </CardContent>
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h6">Характеристики:</Typography>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableBody>
                  {Object.entries(productData.characteristic)?.map(
                    ([key, value]) => (
                      <TableRow key={key}>
                        <TableCell sx={{ fontWeight: "bold" }}>{key}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Box>
      </Card>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Коментарі:</Typography>
        <Box sx={{ display: "flex", gap: 1, marginBottom: 2 }}>
          <TextField
            fullWidth
            placeholder={
              replyTo
                ? `Відповідь на ${replyTo.user}: ${replyTo.text.slice(
                    0,
                    20
                  )}...`
                : "Напишіть коментар..."
            }
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddComment(replyTo?.id)}
          >
            Надіслати
          </Button>
        </Box>
        {renderComments(comments)}
      </Box>
    </Container>
  );
}

export default ProductPage;
