import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./productlist.css"; // Assuming you're importing the CSS

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Specify the API base URL here
  const apiBaseUrl = "http://localhost:5000"; // Replace with your actual API base URL

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/products`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      setError("Error fetching products");
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/product/${id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setProducts(products.filter((item) => item._id !== id));
    } catch (error) {
      setError("Error deleting product");
      console.error("Error deleting product:", error);
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      try {
        const response = await axios.get(`${apiBaseUrl}/search/${key}`, {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        setError("Error searching products");
        console.error("Error searching products:", error);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="products-list">
      <h3>Product List</h3>
      <input
        type="text"
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      {error && <p className="error">{error}</p>}
      {products.length > 0 ? (
        <div className="product-container">
          {products.map((item) => (
            <div className="product-item" key={item._id}>
              {/* Images Scroller */}
              {item.images && item.images.length > 0 && (
                <div className="image-scroller">
                  <div className="image-container">
                    {item.images.map((image, index) => (
                      <img
                        key={index}
                        src={`${apiBaseUrl}${image}`}
                        alt={`Image ${index + 1}`}
                        className="product-image"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Videos Scroller */}
              {item.videos && item.videos.length > 0 && (
                <div className="video-scroller">
                  <div className="video-container">
                    {item.videos.map((video, index) => (
                      <video
                        key={index}
                        src={`${apiBaseUrl}${video}`}
                        controls
                        className="product-video"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* PDFs Scroller */}
              {item.files && item.files.length > 0 && (
                <div className="pdf-scroller">
                  <div className="pdf-container">
                    {item.files.map((file, index) => (
                      <button
                        key={index}
                        className="pdf-button"
                        onClick={() =>
                          window.open(`${apiBaseUrl}${file}`, "_blank")
                        }
                      >
                        PDF {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Price:</strong> {item.price}
                </p>
                <p>
                  <strong>Category:</strong> {item.category}
                </p>
                <p>
                  <strong>Company:</strong> {item.company}
                </p>
              </div>
              <div>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                 <Link to={`/update/${item._id}`}>Update</Link> 
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>No Result found</h1>
      )}
    </div>
  );
};

export default ProductList;

//#######################################################################################################################
//#######################################################################################################################
//#######################################################################################################################
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./productlist.css";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);

//   // Directly specify the API base URL here
//   const apiBaseUrl = "http://localhost:5000"; // Replace with your actual API base URL

//   useEffect(() => {
//     getProducts();
//   }, []);

//   const getProducts = async () => {
//     try {
//       const response = await axios.get(`${apiBaseUrl}/products`, {
//         headers: {
//           authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
//         },
//       });
//       setProducts(response.data);
//     } catch (error) {
//       setError("Error fetching products");
//       console.error("Error fetching products:", error);
//     }
//   };

//   const deleteProduct = async (id) => {
//     try {
//       await axios.delete(`${apiBaseUrl}/product/${id}`, {
//         headers: {
//           authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
//         },
//       });
//       setProducts(products.filter((item) => item._id !== id));
//     } catch (error) {
//       setError("Error deleting product");
//       console.error("Error deleting product:", error);
//     }
//   };

//   const searchHandle = async (event) => {
//     let key = event.target.value;
//     if (key) {
//       try {
//         const response = await axios.get(`${apiBaseUrl}/search/${key}`, {
//           headers: {
//             authorization: `bearer ${JSON.parse(
//               localStorage.getItem("token")
//             )}`,
//           },
//         });
//         setProducts(response.data);
//       } catch (error) {
//         setError("Error searching products");
//         console.error("Error searching products:", error);
//       }
//     } else {
//       getProducts();
//     }
//   };

//   return (
//     <div className="products-list">
//       <h3>Product List</h3>
//       <input
//         type="text"
//         className="search-product-box"
//         placeholder="Search Product"
//         onChange={searchHandle}
//       />
//       {error && <p className="error">{error}</p>}
//       {products.length > 0 ? (
//         <div className="product-container">
//           {products.map((item) => (
//             <div className="product-item" key={item._id}>
//               <div className="content">
//                 {/* <p>
//                   {item.video && (
//                     <video
//                       src={`${apiBaseUrl}${item.video}`}
//                       controls
//                       width="300"
//                     />
//                   )}
//                 </p>
//                 <p>
//                   {item.image && (
//                     <img
//                       src={`${apiBaseUrl}${item.image}`}
//                       alt="Item"
//                       width="300"
//                     />
//                   )}
//                 </p>
//                 <p>
//                   {item.file && (
//                     <button
//                       className="btn btn-primary"
//                       onClick={() =>
//                         window.open(`${apiBaseUrl}${item.file}`, "_blank")
//                       }
//                     >
//                       Show Pdf
//                     </button>
//                   )}
//                 </p> */}
//               </div>
//               <div>
//                 <div>
//                   {/* <video src={`${apiBaseUrl}${item.videos}`} controls width="300" />
//                       <img src={`${apiBaseUrl}${item.images}`} alt="Item" width="300" />
//                        <button onClick={() => window.open(`${apiBaseUrl}${item.files}`, "_blank")}>Show Pdf</button> */}
//                   {item.videos &&
//                     item.videos.map((video, index) => (
//                       <video
//                         key={index}
//                         src={`${apiBaseUrl}${video}`}
//                         controls
//                         width="300"
//                       />
//                     ))}

//                   {item.images &&
//                     item.images.map((image, index) => (
//                       <img
//                         key={index}
//                         src={`${apiBaseUrl}${image}`}
//                         alt="Item"
//                         width="300"
//                       />
//                     ))}

//                   {item.files &&
//                     item.files.map((file, index) => (
//                       <button
//                         key={index}
//                         onClick={() =>
//                           window.open(`${apiBaseUrl}${file}`, "_blank")
//                         }
//                       >
//                         Show Pdf
//                       </button>
//                     ))}

//                   <p>
//                     <strong>Name:</strong> {item.name}
//                   </p>
//                   <p>
//                     <strong>Price:</strong> {item.price}
//                   </p>
//                   <p>
//                     <strong>Category:</strong> {item.category}
//                   </p>
//                   <p>
//                     <strong>Company:</strong> {item.company}
//                   </p>
//                 </div>
//                 <div>
//                   <button onClick={() => deleteProduct(item._id)}>
//                     Delete
//                   </button>
//                   <Link to={`/update/${item._id}`}>Update</Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <h1>No Result found</h1>
//       )}
//     </div>
//   );
// };

// export default ProductList;
//#######################################################################################################################
//#######################################################################################################################
//#######################################################################################################################
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const ProductList = () => {
//   const [Products, setProducts] = useState([]); // by default [] set array

//   useEffect(() => {
//     getProducts();
//   }, []);

//   const getProducts = async () => {
//     let result = await fetch('http://localhost:5000/products',{
//       headers:{
//         authorization: bearer ${JSON.parse(localStorage.getItem('token'))}
//       }
//     });
//     result = await result.json();
//     setProducts(result);
//   };

//   const deleteProduct = async (id) => {
//     let result = await fetch(http://localhost:5000/product/${id}, {
//       method: "Delete",
//       headers:{
//         authorization: bearer ${JSON.parse(localStorage.getItem('token'))}
//       }
//     });
//     result = await result.json();
//     if (result) {
//       getProducts();
//       // alert("record is deleted")
//     }
//     // console.warn(id)
//   };

//   const searchHandle = async (event) => {
//     // console.warn(event.target.value)
//     let key = event.target.value;
//     if (key) {
//       let result = await fetch(http://localhost:5000/search/${key},{
//         headers:{
//           authorization: bearer ${JSON.parse(localStorage.getItem('token'))}
//         }
//       });

//       result = await result.json();
//          if (result) {
//            setProducts(result);
//            }
//     }else {
//         getProducts();
//       }

//   };

//   return (
//     <div className="products-list">
//       <h3>Product List</h3>
//       <input
//         type="text"
//         className="search-product-box"
//         placeholder="Search Product"
//         onChange={searchHandle}
//       />
//       <ul>
//       {/* <img src="img_avatar.png" alt="Avatar" /> */}
//         <li>s.No</li>
//         <li>Name</li>
//         <li>Price</li>
//         <li>Category</li>
//         <li>Operation</li>
//       </ul>
//       {Products.length > 0 ? (
//         Products.map((item, index) => (
//           <ul key={item._id}>

//             <div class="card">
//             <img src="https://picsum.photos/id/287/250/300"  alt="Avatar" style={{ width: '100%' }}></img>

//             {/* <input
//     type="file"
//     accept="image/*"
//     onChange={(e) => handleImageUpload(e, item._id)} // Assuming you have a function to handle image upload
//   />
//   <img src={item.imageUrl || "https://picsum.photos/id/287/250/300"} alt="Avatar" style={{ width: '100%' }}></img> */}
//             <div class="container">

//             <li>{index + 1}</li>
//             <ul>
//             <li>Name: {item.name}</li>
//             <li>Price: {item.price}</li>
//             <li>category: {item.category}</li>
//             <li>
//               <button onClick={() => deleteProduct(item._id)}>Delete</button>
//               <Link to={"/update/" + item._id}>Update</Link>
//             </li>
//             </ul>
//             </div>
//             </div>

//           </ul>
//         ))
//       ) : (
//         <h1>No Result found</h1>
//       )}
//     </div>
//   );
// };

// export default ProductList;
