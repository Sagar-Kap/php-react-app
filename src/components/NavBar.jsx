import React from 'react'
import "../Styles/NavBar.scss"

function NavBar({title, green, red}) {
  return (
    <nav className='nav'>
        <a className='nav-anchor'>{title}</a>
        <div className="buttons">
            <button className='add'><span>{green}</span></button>
            <button className='delete' id='delete-product-btn'><span>{red}</span></button>
        </div>
    </nav>
  )
}

export default NavBar