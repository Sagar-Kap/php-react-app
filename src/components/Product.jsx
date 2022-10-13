import React from "react";
import "../Styles/Product.scss";

function Product({
  sku,
  name,
  price,
  weight,
  size,
  length,
  width,
  height,
  onSelect,
  select,
}) {
  return (
    <div className="product">
      <div className="select">
        <input
          type="checkbox"
          checked={Boolean(select)}
          onChange={() => onSelect(sku)}
        />
      </div>
      <div className="list">
        <ul>
          <li>{sku}</li>
          <li>{name}</li>
          <li>{price} $</li>
          {weight !== null && <li>Weight: {weight}KG</li>}
          {size !== null && <li>Size: {size} MB</li>}
          {length !== null && (
            <li>
              Dimension: {height}x{width}x{length}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Product;
