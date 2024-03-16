import React, { useEffect, useState } from "react";
import "../ProductDetailLayout/detail.css";
import { useSelector } from "react-redux";

function ProductDetailLayout(props) {
  const { detail, idDetail, addCart } = props;
  const [currentSize, setCurrentSize] = useState(null);
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [priceNew, setPriceNew] = useState()

  const handleClickSize = (size) => {
    const selectedProduct = detail?.idProductDetails?.sizeProducts.find(
      (product) => product._id === size._id
    );
    setPrice(selectedProduct.price);
    setSelectedSize(selectedProduct);
  };
  const handleAddToCart = () => {
    if (selectedSize) {
      const productWithSize = {
        ...selectedSize,
        productName: detail.nameProduct,
        quantity: quantity,
        price: parseFloat(priceNew ),
        id_product: detail._id,
        id_user: props.customer?.customer?._id
      };
      addCart(productWithSize)
    }
  };
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0 && newQuantity <= selectedSize.quantity) {
      setQuantity(newQuantity);
    }
  };
  // console.log(price);
  useEffect(() => {
    const newPrice = (price * quantity  * 1000 )
    setPriceNew(parseFloat(newPrice))
  }, [quantity, selectedSize]);

  useEffect(() => {
    if (selectedSize) {
      setQuantity(1);
    }
  }, [selectedSize]);

  useEffect(() => {
    const current = detail.idProductDetails?.sizeProducts.find(
      (size) => size._id === idDetail
    );
    setPrice(current?.price);
    setSelectedSize(current);
    setCurrentSize(current);
  }, [detail, idDetail]);
  if (!detail) {
    return <p>Loading...</p>;
  }

  if (!currentSize) {
    return <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  }

  return (
    <div className="product-detail-layout">
      <div className="image-section">
        <img
          className="product-image"
          src={selectedSize ? selectedSize.img : currentSize.img}
          alt={selectedSize ? selectedSize.size : currentSize.size}
        />
      </div>
      <div className="price-section">
        <h5>
          {detail.nameProduct}:{" "}
          <span>{selectedSize ? selectedSize?.size : currentSize?.size}</span>
        </h5>
        {detail.idProductDetails.sizeProducts.map((product) => (
          <button
            key={product._id}
            className={` mx-1 ${
              selectedSize && selectedSize._id === product._id ? "active" : ""
            }`}
            onClick={() => handleClickSize(product)}
          >
            {product.size}
          </button>
        ))}
        <p>Quantity: {selectedSize.quantity}</p>

        {selectedSize && (
          <div className="quantity-section">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min={1}
              max={selectedSize.quantity}
              onChange={handleQuantityChange}
            />
          </div>
        )}
        {/* <p>Price: {selectedSize ? selectedSize.price : currentSize.price}</p> */}
        <p>{priceNew}</p>
        <button onClick={() => handleAddToCart()}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetailLayout;
