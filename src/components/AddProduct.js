import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate(); //????

  const addProduct = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category || !form.company) {
      setError(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("company", form.company);

    videos.forEach((video) => formData.append("videos", video));
    images.forEach((image) => formData.append("images", image));
    files.forEach((file) => formData.append("files", file));

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.post(
        "http://localhost:5000/add-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Backend response:", response.data);
      navigate("/");
    } catch (error) {
      console.error("There was an error adding the product!", error);
    }
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <form onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Enter product name"
          className="inputBox"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        {error && !form.name && (
          <span className="invalid-input">Enter valid name</span>
        )}

        <input
          type="text"
          placeholder="Enter product price"
          className="inputBox"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        {error && !form.price && (
          <span className="invalid-input">Enter valid price</span>
        )}

        <input
          type="text"
          placeholder="Enter product category"
          className="inputBox"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />
        {error && !form.category && (
          <span className="invalid-input">Enter valid category</span>
        )}

        <input
          type="text"
          placeholder="Enter product company"
          className="inputBox"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          required
        />
        {error && !form.company && (
          <span className="invalid-input">Enter valid company</span>
        )}

        <input
          type="file"
          className="inputBox"
          multiple
          accept="video/*"
          onChange={(e) => setVideos([...e.target.files])}
        />
        <input
          type="file"
          className="inputBox"
          multiple
          accept="image/*"
          onChange={(e) => setImages([...e.target.files])}
        />
        <input
          type="file"
          className="inputBox"
          multiple
          onChange={(e) => setFiles([...e.target.files])}
        />

        <button type="submit" className="appButton">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
