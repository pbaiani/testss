import React, { Component } from 'react';

/* Stateless component or pure component
 * { product } syntax is the object destructing
 */

const Product = ({ product, onDelete }) => {

    const divStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        margin: '30px 10px 10px 30px'
    }
    const delStyle = {
        cursor: 'pointer'
    }
    
    const handleDelete = (e) => {
        //prevent default prevents page reload
        /* A call back to the onAdd props
        The current state is passed as a parameter
        */
     onDelete();
    }


    // if the props is null, return Product doesn't exist
    if (!product) {
        return (<div style-={divStyle}>Product Doesn't Exist</div>
        );
    }

    // else, display the product data

    return (
        <div style={divStyle}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <h3>Status {product.availability ? 'Available' : 'Out of Stock'}</h3>
            <h3>Price: {product.price}</h3>
            <div style={delStyle} onClick={handleDelete}>Delete This Bitch</div>
        </div>
    )
}
export default Product;
