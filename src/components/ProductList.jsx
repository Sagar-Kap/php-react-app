import React from 'react'
import Product from './Product'
import "../Styles/ProductList.scss" 
import NavBar from './NavBar'

function ProductList() {
  return (
    <div>
      <NavBar title="Product List" green="Add" red="Mass Delete" />
      <div className='display'>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      <Product/>
      </div>
    </div>
  )
}

export default ProductList