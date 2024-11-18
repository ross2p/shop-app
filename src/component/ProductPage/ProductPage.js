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
  Badge,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import PersonIcon from "@mui/icons-material/Person";
import { fetchAddProduct } from "../../api/orderApi";
import { fetchProductById, fetchUpdateProduct } from "../../api/productsApi";
import { fetchAddComment } from "../../api/commentsApi";
import { fetchComments } from "../../api/commentsApi";
import { fetchUser } from "../../api/authApi";
import { useParams, useNavigate } from "react-router-dom";

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
        id: "de2eadd8-22a3-4a9c-9639-28110ceaa77d",
        text: "Second comment",
        user: {
          id: "76fffd7c-9c3a-4cab-9bea-ab82b0fd6504",
          firstName: "User",
          lastName: "User",
          email: "user@user.com",
          birthDate: "2005-06-22",
          role: {
            id: "a01593ee-052b-44dd-99b2-5cf72a017dbe",
            name: "USER",
            description: "",
            createdAt: "2024-11-10T18:19:55.213+00:00",
            updatedAt: "2024-11-10T18:19:55.213+00:00",
            deletedAt: null,
          },
          createdAt: "2024-11-10T18:19:55.213+00:00",
          updatedAt: "2024-11-10T18:19:55.213+00:00",
          deletedAt: null,
        },
        createdAt: "2024-11-10T18:29:06.774+00:00",
        updatedAt: "2024-11-10T18:29:06.774+00:00",
        deletedAt: null,
        children: [],
      },
    ],
  };

  const { id: productId } = useParams();
  const navigate = useNavigate();
  // console.log("productId", productId);

  const [productData, setProductData] = useState(product);

  const [rating, setRating] = useState(0.0);
  const [comments, setComments] = useState([{}]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  React.useEffect(() => {
    const loadProduct = async () => {
      try {
        const [data, comments, user] = await Promise.all([
          fetchProductById(productId),
          fetchComments(productId),
          fetchUser(),
        ]);

        console.log(data);
        setProductData(data);
        setRating(data.rating);
        setIsUserAdmin(user.role.name === "ADMIN");
        setComments(comments.content);
        console.log("comments2", comments);
      } catch (err) {
        console.error("Failed to load product");
      }
    };
    console.log("productId1sss", productId);
    loadProduct();
  }, [productId]);

  const handleAddComment = async (parentCommentId = null) => {
    if (newComment.trim()) {
      const newCommentObj = {
        text: newComment.trim(),
        parentId: parentCommentId,
        productId: productData.id,
      };
      console.log("newCommentObj", newCommentObj);
      await fetchAddComment(newCommentObj);

      const allComments = await fetchComments(productData.id);

      setComments(allComments.content);

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
  const handleSetRating = async (value) => {
    console.log("value", value);
    const product = await fetchUpdateProduct(productData.id, { rating: value });
    setRating(product.rating);
  };

  const renderComments = (comments, parentId = null) => {
    console.log("render comment", comments);
    return comments?.map((comment) => (
      <Box
        key={comment.id}
        sx={{
          marginBottom: 2,
          padding: 2,
          borderBottom: parentId ? "none" : "1px solid #ddd",
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
              <strong>
                {comment?.user?.firstName} {comment?.user?.lastName}
              </strong>
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
        {comment.children &&
          comment.children.length > 0 &&
          renderComments(comment.children, comment.id)}
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
            {productData.promotion && (
              <Badge
                sx={{
                  top: 16,
                  left: 16,
                  backgroundColor: "error.main",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                }}
              >
                {productData.promotion.name}
              </Badge>
            )}
            <Carousel>
              {productData.images?.map((img, index) => (
                <CardMedia
                  component="img"
                  height="300"
                  image={`data:image/jpeg;base64,${img.data}`}
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
            <CardContent sx={{ position: "relative" }}>
              {isUserAdmin && (
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/product-edit/${productData.id}`)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  Edit
                </Button>
              )}
              <Typography variant="h4">{productData.name}</Typography>
              <Typography variant="h5" color="primary" paragraph>
                ₴{productData.price?.toFixed(2)}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <Rating
                  value={rating}
                  onChange={(event, newValue) => handleSetRating(newValue)}
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
            Send
          </Button>
        </Box>
        {renderComments(comments)}
      </Box>
    </Container>
  );
}

export default ProductPage;
