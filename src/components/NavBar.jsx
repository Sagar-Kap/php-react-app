import React from "react";
import "../Styles/NavBar.scss";

function NavBar({
  title,
  green,
  red,
  greenButton,
  redButton,
  form,
  type,
  disabled,
}) {
  return (
    <nav className="nav">
      <a className="nav-anchor">{title}</a>
      <div className="buttons">
        <button
          form={form}
          type={type}
          onClick={greenButton}
          className="add"
          disabled={disabled}
        >
          <span>{green}</span>
        </button>
        <button onClick={redButton} className="delete" id="delete-product-btn">
          <span>{red}</span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
