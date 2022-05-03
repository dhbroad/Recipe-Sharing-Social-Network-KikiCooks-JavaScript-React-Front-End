import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { withParams } from '../hocs';


// 
// 
// See News.js for line by line comments on working with RCC (React Class Components)
// HOWEVER: This file is also demonstrating the advanced React technique of using "HOCs" (Higher-Order Components - a tool built only for RFC) in RCC
// In order to use "HOCs", you have to create a hocs.js file in the app's root level directory (the same level as App.js)
// 
// 


class SingleProduct extends Component {
    constructor() {
        super()
        this.state = {
            firstRender: true, // When we created our redirect feature below, you could see the page still rendering for a split second, so we created a way to render a loading screen instead until the /shop loads
            product: {},
            redirect: false // Creating the redirect state of our Class component so we can set up a redirect in our mount and render
        }
    }

    componentDidMount = async () => {
        const res = await fetch(`http://127.0.0.1:5000/api/products/${this.props.params.productId}`); // Anytime you want to fetch from Flask, you have to create an API endpoint in your Flask's route.py under the corresponding template directory
        // ^ This is where we are using params of RFC in our RCC ^
        const data = await res.json();
        console.log(data);
        if (data.status === 'ok') {
            this.setState({
                product: data.product,
                firstRender: false
            })
        }
        else {
            this.setState({redirect: true}) // if data.status is not 'ok', we are going to redirect, so we have to set the state to true
            // If we change the state, it triggers a rerender, and the user would be redirected to the /shop
        }
    }


    render() {
        if (this.state.redirect) {
            return <Navigate to='/shop'/>
        }
        if(this.state.firstRender){
            return <h1>Loading..</h1>
        }
        const product = this.state.product
        return (
            <div className="card" style={{ width: "18rem" }}>
                <img src={product.image} className="card-img-top" alt={product.product_name} />
                <div className="card-body">
                    <h5 className="card-title">{product.product_name}</h5>
                    <p className="card-text">{product.description}</p>
                </div>
                <form method="POST" action="/">
                    <input className="d-none" type="text" name='product_id' value={product.id} />
                    <button type='submit' className="btn btn-primary">Add To Cart</button>
                </form>
            </div>
        )
    }
};
export default withParams(SingleProduct) // exporting withParams 