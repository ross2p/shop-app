import React, { useState } from "react";
import { fetchProductCreate } from "../../api/productsApi";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../api/productsApi";
import { fetchPromotionCreate } from "../../api/promotionApi";
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
    promotion: null,
  });

  const handleSave = async () => {
    const promotion = product.promotion;
    let data = { ...product };
    if (promotion) {
      promotion.startDate = new Date(promotion.startDate);
      promotion.endDate = new Date(promotion.endDate);
      const newPromotion = await fetchPromotionCreate(promotion);
      // setProduct((prev) => ({ ...prev, promotionId: promotionId }));
      console.log("promotionId", newPromotion.id);
      data = { ...product, promotionId: newPromotion.id };
      console.log(JSON.stringify(data));
    }
    const characteristic = product.characteristic
      .filter((item) => item.key !== "" && item.value !== "")
      .reduce((acc, current) => {
        acc[current.key] = current.value;
        return acc;
      }, {});
    const images = product.images.map((img) => img.id);

    data = { ...data, characteristic, images };
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
