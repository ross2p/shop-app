import React, { useState } from "react";
import { fetchProductCreate, fetchUpdateProduct } from "../../api/productsApi";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../api/productsApi";
import ProductEditCreate from "../ProductCreate/ProductEditCreate";

const ProductEdit = () => {
  const { id: productId } = useParams();
  const navigator = useNavigate();
  const [product, setProduct] = useState({
    name: "test",
    description: "",
    barcode: "",
    price: 0,
    categoryId: "",
    characteristic: [{ key: "", value: "", errors: "" }],
    previewImages: [],
    images: [],
  });

  const loadData = async () => {
    try {
      const data = await fetchProductById(productId);

      //change characteristic object to array
      const characteristic = Object.entries(data.characteristic).map(
        ([key, value]) => ({ key: key, value: value, error: "" })
      );
      setProduct({ ...data, characteristic });

      // handleChange("previewImages", data.images);
      setProduct((prev) => ({ ...prev, previewImages: data.images }));
    } catch (err) {
      console.error("Failed to load product");
    }
  };
  React.useEffect(() => {
    if (productId) {
      loadData();
    }
  }, [productId]);

  const handleUpdate = async () => {
    const characteristic = product.characteristic
      .filter((item) => item.key !== "" && item.value !== "")
      .reduce((acc, current) => {
        acc[current.key] = current.value;
        return acc;
      }, {});

    const formData = new FormData();
    formData.append(
      "body",
      new Blob([JSON.stringify({ ...product, characteristic })], {
        type: "application/json",
      })
    );

    product.images.forEach((file) => {
      formData.append("files", file);
    });
    const updateProduct = await fetchUpdateProduct(productId, formData);
    navigator(`/product/${updateProduct.id}`);
  };
  return (
    <ProductEditCreate
      product={product}
      setProduct={setProduct}
      handleOperator={handleUpdate}
    />
  );
};

export default ProductEdit;
