import React, { useState } from "react";
import { fetchProductCreate } from "../../api/productsApi";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../api/productsApi";
import ProductEditCreate from "./ProductEditCreate";

const ProductCreate = () => {
  const navigator = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    barcode: "",
    price: 0,
    categoryId: "",
    characteristic: [{ key: "", value: "", errors: "" }],
    images: [],
  });

  const handleSave = async () => {
    const characteristic = product.characteristic
      .filter((item) => item.key !== "" && item.value !== "")
      .reduce((acc, current) => {
        acc[current.key] = current.value;
        return acc;
      }, {});
    const images = product.images.map((img) => img.id);

    const data = { ...product, characteristic, images };
    console.log(JSON.stringify(data));

    const newProduct = await fetchProductCreate(data);
    console.log(newProduct);
    navigator(`/product/${newProduct.id}`);
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
