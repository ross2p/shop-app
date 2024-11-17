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
    description:
      "Potato flakes (60%), starch, rapeseed oil, seasoning Taste of chanterelles in sour cream (maltodextrin, flavorings (contains milk), table salt, rice flour, gelling agent (calcium chloride), sugar, white pepper, acidity regulator (calcium lactate), coloring agent (paprika extract)), sugar, emulsifiers (lecithin, mono- and diglycerides of fatty acids), dextrose, acidity regulator (citric acid).",
    barcode: "48123231252",
    price: 80.0,
    categoryId: "70536671-390a-4610-a305-b215da6f9530",
    characteristic: [{ key: "Calories", value: "441.00kcal", errors: "" }],
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
