import React from 'react'
import NavBar from './NavBar'
import "../Styles/AddProduct.scss"

function AddProduct() {
  return (
    <div className='add-product'>
        <NavBar title="Product Add" green="Save" red="Cancel"/>
        <form id='product_form'>
          <table>
            <tbody>
              <tr>
                <th>
                  <label>SKU</label>
                </th>
                <td><input type="text" id='#sku' /></td>
              </tr>
              <tr>
                <th>
                  <label>Name</label>
                </th>
                <td><input type="text" id='name'/></td>
              </tr>
              <tr>
                <th>
                  <label>Price ($)</label>
                </th>
                <td><input type="text" id='price' /></td>
              </tr>
              <tr>
                <th>
                  <label>Type Switcher</label>
                </th>
                <td>
                  <select name="Type Switcher" id="product-type">
                    <option>Type Switcher</option>
                    <option id='DVD' value="dvd">DVD</option>
                    <option id='Book' value="book">Book</option>
                    <option id='Furniture' value="furniture">Furniture</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
    </div>
  )
}

export default AddProduct