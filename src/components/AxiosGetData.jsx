/** @format */
import "./styles.css";
import axios from "../axios";
import { useEffect, useState } from "react";

export const AxiosGetData = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  async function getProducts() {
    try {
      const response = await axios.get("/products");
      setProducts(response.data.products);
      setError("");
    } catch (err) {
      setError(err.message);
      setProducts([]);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function addProduct() {
    const product = { title: "Apple 13", price: 799 };
    axios
      .post("products/add", product)
      .then((res) => alert(`Product added successfully...`));
  }
   function deleteProduct() {
     axios
       .delete("products/1")
       .then((res) => alert(`Product deleted successfully...`));
   }
  return (
    <div className='products-container'>
      {error !== "" && error}
      {products.map((prod) => {
        return (
          <ul key={prod.id}>
            <li>
              {prod.title} -- ${prod.price}
              <br />
              <img className='image' src={prod.images[0]} alt={prod.title} />
              <br />
              <p>{prod.description}</p>
            </li>
          </ul>
        );
      })}

      <button onClick={() => addProduct()}>Add Product</button>
      <button onClick={() => deleteProduct()}>Delete Product</button>
    </div>
  );
};
