import React from "react";
import Product from "./Product";
import "../Styles/ProductList.scss";
import NavBar from "./NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductList() {
  let navigate = useNavigate();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    axios.get("http://localhost/kamkar/").then(function (response) {
      let responseData = response.data;
      let newArr = responseData.map((d) => {
        return {
          select: false,
          ...d,
        };
      });
      setProducts(newArr);
    });
  }

  const greenButton = (event) => {
    event.preventDefault();
    navigate("/add-product");
  };

  const onSelect = (sku) => {
    setProducts((prev) =>
      prev.map((v) => (v.sku === sku ? { ...v, select: !v.select } : v))
    );
  };

  const redButton = (event) => {
    event.preventDefault();
    let arrayId = [];
    products.forEach((e) => {
      if (e.select) {
        arrayId.push(e.id);
      }
    });

    let json = JSON.stringify(arrayId);
    let post_data = { json_data: json };

    axios
      .delete(`http://localhost/kamkar/manipulation/`, { data: post_data })
      .then(getProducts);
  };

  return (
    <div>
      <NavBar
        title="Product List"
        green="Add"
        red="Mass Delete"
        greenButton={greenButton}
        redButton={redButton}
      />

      <div className="display">
        {products.map((product, key) => (
          <Product key={key} {...product} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
