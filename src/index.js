import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://snkrsden.herokuapp.com/products/")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="App">
      <h1>Products List</h1>
      <input
        type="text"
        placeholder="Search products"
        onChange={e => setSearch(e.target.value)}
      />
      {filteredProducts.map((country, idx) => (
        <CountryDetail key={idx} {...country} />
      ))}
    </div>
  );
}

const CountryDetail = props => {
  const { name, slug, shape1 } = props;
  return (
    <div className='Box'>
      <p>1. {name}</p>
      <p>2. {slug}</p>
      <p>3. {shape1}</p>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
