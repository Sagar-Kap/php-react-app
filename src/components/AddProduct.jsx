import React, { useEffect } from "react";
import NavBar from "./NavBar";
import "../Styles/AddProduct.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const objectError = {};
  let error = null;
  const [optionError, setOptionError] = useState(null);

  const [object, setObject] = useState({});
  // error array
  const elementArray = ["price", "size", "weight", "height", "length", "width"];

  const [formObject, setForm] = useState({
    sku: "",
    name: "",
    price: "",
    size: "",
    weight: "",
    height: "",
    width: "",
    length: "",
  });

  const [disabled, setDisabled] = useState(false);

  const preventclick = (objectOfError) => {
    let hj = 0;
    for (let q in objectOfError) {
      if (objectOfError[q] !== null) {
        hj++;
      }
    }
    if (hj > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  useEffect(
    (e) => {
      for (e in formObject) {
        const value = formObject[e];
        const name = e;
        if (elementArray.includes(name)) {
          if (value.match(/^\d*\.?\d*$/) !== null) {
            error = null;
            objectError[name] = error;
          } else if (value !== "") {
            error = "Please, submit required data";
            objectError[name] = error;
          }
        }
      }
      setObject(objectError);
      preventclick(objectError);
    },
    [formObject]
  );

  const handleSubmit = (event) => {
    const mapArray = ["size", "weight", "height", "width", "length"];
    event.preventDefault();
    let obj = {};
    for (let i in formObject) {
      if (formObject[i] !== "") {
        obj[i] = formObject[i];
      }
    }
    if (selectedOption === "dvd") {
      mapArray.map((j) => {
        if (j !== "size") {
          delete obj[j];
        }
      });
    } else if (selectedOption === "book") {
      mapArray.map((j) => {
        if (j !== "weight") {
          delete obj[j];
        }
      });
    } else if (selectedOption === "furniture") {
      delete obj["size"];
      delete obj["weight"];
    }

    if (selectedOption === null) {
      setOptionError("Please, submit required data");
      return;
    } else if (selectedOption === "Type Switcher") {
      return;
    } else {
      axios.post("http://localhost/kamkar/", obj).then(function () {
        navigate("/");
      });
    }
  };

  const redButton = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const Options = (option) => {
    setSelectedOption(option.target.value);
  };

  useEffect(() => {
    if (
      selectedOption === "dvd" ||
      selectedOption === "book" ||
      selectedOption === "furniture"
    ) {
      setOptionError(null);
    } else if (selectedOption === "Type Switcher") {
      setOptionError("Please, submit required data");
    }
  }, [selectedOption]);

  return (
    <div className="add-product">
      <NavBar
        title="Product Add"
        green="Save"
        red="Cancel"
        redButton={redButton}
        form="product_form"
        type="submit"
        disabled={disabled}
      />
      <form id="product_form" onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th>
                <label>SKU</label>
              </th>
              <td>
                <input
                  onChange={(e) =>
                    setForm({ ...formObject, sku: e.target.value })
                  }
                  name="sku"
                  type="text"
                  id="#sku"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>Name</label>
              </th>
              <td>
                <input
                  name="name"
                  onChange={(e) =>
                    setForm({ ...formObject, name: e.target.value })
                  }
                  type="text"
                  id="name"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label>Price ($)</label>
              </th>
              <td>
                <input
                  name="price"
                  onChange={(e) =>
                    setForm({ ...formObject, price: e.target.value })
                  }
                  type="text"
                  id="price"
                  required
                />
              </td>
              <th className="error">{object["price"]}</th>
            </tr>

            <tr>
              <th>
                <label>Type Switcher</label>
              </th>
              <td>
                <select name="type" onChange={Options} id="product-type">
                  <option id="productType">Type Switcher</option>
                  <option id="DVD" value="dvd">
                    DVD
                  </option>
                  <option id="Book" value="book">
                    Book
                  </option>
                  <option id="Furniture" value="furniture">
                    Furniture
                  </option>
                </select>
              </td>
              <th className="options-error">{optionError}</th>
            </tr>
            {selectedOption === "dvd" && (
              <React.Fragment>
                <tr>
                  <th>
                    <label>Size (MB)</label>
                  </th>
                  <td>
                    <input
                      name="size"
                      type="text"
                      id="size"
                      onChange={(e) =>
                        setForm({ ...formObject, size: e.target.value })
                      }
                      required
                    />
                  </td>
                  <th className="error">{object["size"]}</th>
                </tr>
                <tr className="advise">
                  <th colSpan={2}>Please provide size in MegaBytes (MB).</th>
                </tr>
              </React.Fragment>
            )}
            {selectedOption === "book" && (
              <React.Fragment>
                <tr>
                  <th>
                    <label>Weight (KG)</label>
                  </th>
                  <td>
                    <input
                      name="weight"
                      type="text"
                      id="weight"
                      required
                      onChange={(e) =>
                        setForm({ ...formObject, weight: e.target.value })
                      }
                    />
                  </td>
                  <th className="error">{object["weight"]}</th>
                </tr>
                <tr className="advise">
                  <th colSpan={2}>Please provide weight in Kilograms (KG).</th>
                </tr>
              </React.Fragment>
            )}
            {selectedOption === "furniture" && (
              <React.Fragment>
                <tr>
                  <th>
                    <label>Height (CM)</label>
                  </th>
                  <td>
                    <input
                      name="height"
                      type="text"
                      id="height"
                      required
                      onChange={(e) =>
                        setForm({ ...formObject, height: e.target.value })
                      }
                    />
                  </td>
                  <th className="error">{object["height"]}</th>
                </tr>
                <tr>
                  <th>
                    <label>Width (CM)</label>
                  </th>
                  <td>
                    <input
                      name="width"
                      type="text"
                      id="width"
                      required
                      onChange={(e) =>
                        setForm({ ...formObject, width: e.target.value })
                      }
                    />
                  </td>
                  <th className="error">{object["width"]}</th>
                </tr>
                <tr>
                  <th>
                    <label>Length (CM)</label>
                  </th>
                  <td>
                    <input
                      name="length"
                      type="text"
                      id="length"
                      required
                      onChange={(e) =>
                        setForm({ ...formObject, length: e.target.value })
                      }
                    />
                  </td>
                  <th className="error">{object["length"]}</th>
                </tr>
                <tr className="advise">
                  <th colSpan={2}>
                    Please provide dimensions in HxWxL format.
                  </th>
                </tr>
              </React.Fragment>
            )}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default AddProduct;
