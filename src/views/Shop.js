import React, { useEffect, useState } from 'react'
import Product from '../components/Product';


// 
// 
// See Contact.js and SinglePost.js for line by line comments on using RFC (react functional components)
// 
// 


export default function Shop({ addToCart }) {
    const [products, setProducts] = useState([]);

    useEffect(async ()=>{
        const res = await fetch(`http://localhost:5000/api/products`); // Anytime you want to fetch from Flask, you have to create an API endpoint in your Flask's route.py under the corresponding template directory
        const data = await res.json();
        if (data.status === 'ok') {
            setProducts(data.products)
        }
        else {
            // redirect
        }
    },[])


  return (
    <div className='row'> {/* className='row' is using Bootstraps system to turn our Product page into a flexbox where each item shows up on 1 row (which also wraps if you shrink the page) */}
        {products.map((p, i)=><Product key={i} addToCart={addToCart} product={p}/>)} {/* Look at Product.js to see how we accept this prop from this RFC file, vs an RCC file */}
    </div>
  )
}
