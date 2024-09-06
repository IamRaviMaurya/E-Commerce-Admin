import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const productDetailsHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState("");
  const[loading, setLoading] = useState(false);

  const add_product = async () => {
    let responseData;
    let product = productDetails;
    setLoading(true);
    setError("");

    let formData = new FormData();
    formData.append("product", image);
    try{
      await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          responseData = data;
        });
        if (responseData.success) {
          product.image = responseData.image_url;
        
          await fetch('http://localhost:4000/addProduct', {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                alert("Product Added");
        
                // Clear product details and image if product is successfully added
                setProductDetails({
                  name: "",
                  category: "women",
                  new_price: "",
                  old_price: "",
                });
                setImage(null);
              } else {
                new Error("Product Upload Failed");
              }
            })
            .catch((error) => {
              console.error("Error adding product:", error);
              alert("Error adding product :"+ error);
            });
        }
    }catch(error){
      setError(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-item-fields">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={productDetailsHandler}
          type="text"
          name="name"
          id=""
          placeholder="Type here"
        />
      </div>
      <div className="add-product-price">
        <div className="add-product-item-fields">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={productDetailsHandler}
            type="text"
            name="old_price"
            id=""
            placeholder="Type here"
          />
        </div>
        <div className="add-product-item-fields">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={productDetailsHandler}
            type="text"
            name="new_price"
            id=""
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="add-product-item-fields">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={productDetailsHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="add-product-item-fields">
        <label htmlFor="file-input">
          <img
            value={productDetails.image}
            onChange={productDetailsHandler}
            src={image ? URL.createObjectURL(image) : upload_area}
            className="add-product-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          add_product();
        }}
        className="add-product-button"
      >
        Add
      </button>
    </div>
  );
};

export default AddProduct;
