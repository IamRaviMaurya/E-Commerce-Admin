import React, { useEffect, useState } from "react";
import "./ProductList.css";
import cross_icon from "../../assets/cross_icon.png";

const ProductList = () => {
  const [allProduct, setAllProduct] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/productList")
      .then((res) => res.json())
      .then((data) => {
        setAllProduct(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:4000/removeProduct/${productId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        fetchInfo();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("There was an error removing the product! " + error);
    }
  };

  return (
    <div className="product-list">
      <h1>All Product List</h1>
      <div className="product-list-format-name">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="all-product-list">
        <hr />
        {allProduct.map((product, index) => {
          return (
            <div
              key={index}
              className="product-list-format-main product-list-format"
            >
              <img src={product.image} alt="" className="product-list-icon" />
              <p>{product.name}</p>
              <p>
                <i className="fa fa-inr"></i>
                {product.old_price}
              </p>
              <p>
                <i className="fa fa-inr"></i>
                {product.new_price}
              </p>
              <p>{product.category}</p>
              <img
                onClick={() => removeProduct(product.id)}
                src={cross_icon}
                alt=""
                className="product-list-remove-icon"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
