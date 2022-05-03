import React from 'react';
import { Link } from 'react-router-dom';


// 
// 
// See Article.js and Post.js for line by line comments on converting HTML to JSX
// 
//


export default function Product({ addToCart, product }) { // in RCC, we could just do this.parameterName, but because we're using RFC, we have to create a function to use props
    return (
        <div className="card" style={{width: "18rem"}}>
            <ul className="list-group list-group-flush">

                <li className="list-group item">
                    <Link to={`/shop/${product.id}`}> {/* the product ID route is a dynamic route, so we have to use an f string */}
                        <img src={ product.image } className="card-img-top" alt={ product.product_name }/>
                            <div className="card-body">
                                <h5 className="card-title">{ product.product_name }</h5>
                                <p className="card-text">{ product.price }</p>
                            </div>
                    </Link>
                </li>
                <li className="list-group item">
                    <button onClick={()=>addToCart(product)} href="/" className="btn btn-primary">Add To Cart</button>
                </li>
            </ul>
        </div>
    )
}
