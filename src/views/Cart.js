import React from 'react'

export default function Cart({ cart, sumTotalCart, removeFromCart }) {
    const getQuantity = (cartItem, cartList) => {
        let count = 0;
        for (let item of cartList) {
            if (cartItem.id === item.id) {
                count++;
            }
        }
        return count
    };
    const getUniqueCart = (cartList) => {
        let uniqueCart = [];
        let ids = new Set();
        for (let item of cartList) {
            if (!ids.has(item.id)) {
                uniqueCart.push(item);
                ids.add(item.id);
            }
        }
    };

    return (
        <div>
            <h1>Cart:</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>

                    {getUniqueCart(cart).map(item => (
                    <tr key={item.id}>
                        <td>{ item.id }</td>
                        <td>{ item.product_name }</td>
                        <td>{ getQuantity(item, cart) }</td>
                        <td>{ item.price }</td>
                        <td>{ (getQuantity(item, cart)*item.price).toFixed(2)  }</td>
                        <td>
                            <button className="btn btn-danger" onClick={()=>removeFromCart(item)}>
                                Remove
                            </button>
                        </td>
                    </tr>
                    ))}
                   
                </tbody>
                <tfoot>
                <tr>
                        <td>TOTAL</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{ sumTotalCart(cart) }</td>
                        <td>
                            
                        </td>
                    </tr>

                </tfoot>
            </table>


            </div>
    )
}
