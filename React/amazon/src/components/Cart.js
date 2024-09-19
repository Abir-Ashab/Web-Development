import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    if(cart.length) {
    console.log("quantity is", cart[0].quantity);
    const total = cart.reduce((total, product) => total + product.price * product.quantity , 0)
    let shipping = 0;
    // const count = cart.quantity;
    if(total > 0) shipping = 12;
    if(total > 20) shipping = shipping - shipping*0.1;
    if(total > 200) shipping = shipping - shipping*0.5;
    let tax = total/10.00;
    return (
        <div>
            <h3 className='text-2xl font-semibold pl-20 pb-5'>Order Summery</h3>
            <h3>Items Ordered : {cart.length}</h3>
            <p>Shipping cost : {shipping} </p>
            <p>Tax : {tax} </p>
            <p>Total price : {total + shipping + tax} </p>
            <button className='bg-orange-400 rounded-lg pl-8 pr-8 pt-1 pb-1 relative'>
               <Link to = "/review">Review Order</Link> 
            </button>
        </div>
    );
}
};
export default Cart;