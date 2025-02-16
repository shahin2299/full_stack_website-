import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); //????

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `http://localhost:5000/product/${id}`, //????
          {
            headers: { authorization: `bearer ${token}` },
          }
        );
        const product = response.data;
        setForm({
          name: product.name,
          price: product.price,
          category: product.category,
          company: product.company,
        });
      } catch (error) {
        console.error("There was an error fetching the product!", error);
      }
    };

    fetchProduct();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();

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
      const response = await axios.put(
        `http://localhost:5000/product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `bearer ${token}`,
          },
        }
      );
      console.log("Backend response:", response.data);
      navigate("/");
    } catch (error) {
      console.error("There was an error updating the product!", error);
    }
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <form onSubmit={updateProduct}>
        <input
          type="text"
          placeholder="Enter product name"
          className="inputBox"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Enter product price"
          className="inputBox"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Enter product category"
          className="inputBox"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Enter product company"
          className="inputBox"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          required
        />

        <input
          type="file"
          accept="video/*"
          multiple
          onChange={(e) => setVideos(Array.from(e.target.files))}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />
        <button type="submit" className="appButton">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
//###################################################################################################################
//###################################################################################################################
//###################################################################################################################

// import React, { useEffect, useState } from "react";
// import { useParams,useNavigate } from "react-router-dom";
// const UpdateProduct = () => {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [company, setCompany] = useState("");
//   const params = useParams();
//   const navigate = useNavigate();
//    useEffect(()=>{
//     getProductsDetails();

//    },[])
//    const getProductsDetails = async ()=>{
//     console.warn(params)
//     let result =await fetch(http://localhost:5000/product/${params.id},{
//       headers:{
//         authorization: bearer ${JSON.parse(localStorage.getItem('token'))}
//       }
//     });
//     result = await result.json();
//     setName(result.name)
//     setPrice(result.price)
//     setCategory(result.category)
//     setCompany(result.company)
//    //console.warn(result)
//    }

//   const updateProduct = async () => {
//     console.warn(name, price, category, company)
//     let result = await fetch(http://localhost:5000/product/${params.id},{
//         method :'Put',
//         body: JSON.stringify({name, price, category, company}),
//         headers:{
//             'Content-Type':"application/json",
//             authorization: bearer ${JSON.parse(localStorage.getItem('token'))}
//         }
//     });
//      result = await result.json()
//      console.warn(result)
//      navigate('/')
//   };

//   return (
//     <div className="product">
//       <h1>Update Product</h1>
//       <input
//         type="text"
//         placeholder="Enter product name"
//         className="inputBox"
//         value={name}
//         onChange={(e) => {
//           setName(e.target.value);
//         }}
//       />

//       <input
//         type="text"
//         placeholder="Enter product price"
//         className="inputBox"
//         value={price}
//         onChange={(e) => {
//           setPrice(e.target.value);
//         }}
//       />

//       <input
//         type="text"
//         placeholder="Enter product category"
//         className="inputBox"
//         value={category}
//         onChange={(e) => {
//           setCategory(e.target.value);
//         }}
//       />

//       <input
//         type="text"
//         placeholder="Enter product company"
//         className="inputBox"
//         value={company}
//         onChange={(e) => {
//           setCompany(e.target.value);
//         }}
//       />

//       <button onClick={updateProduct} className="appButton">
//         Update Product
//       </button>
//     </div>
//   );
// };

// export default UpdateProduct;
