import React, { useState } from "react";
import { fetchProductCreate } from "../../api/productsApi";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../api/productsApi";
import ProductEditCreate from "./ProductEditCreate";

const ProductCreate = () => {
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

  const handleSave = async () => {
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

    const newProduct = await fetchProductCreate(formData);
    console.log(newProduct);
    // navigator(`/product/${newProduct.id}`);
  };
  return (
    <ProductEditCreate
      product={product}
      setProduct={setProduct}
      handleOperator={handleSave}
    />
  );
};

export default ProductCreate;
