import React, { useState, useEffect } from 'react';
import fakeData from '../fakeData';
import Product from './Product';
import Cart from './Cart';
import { addToDatabaseCart, getDatabaseCart } from '../utilities/databaseManager';


const Shop = () => {
    const slice = fakeData.slice(0, 10);
    const [products, setProducts] = useState(slice);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map( existingKey => {
            const product = fakeData.find( pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            // console.log("product quantity is", product.quantity);
            return product;
        } )
        setCart(previousCart);
    }, [])
    // console.log("cart is" , cart);
    
    const HandleProduct =(product)=> {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);      
    }
    return (
        <div className='flex text-justify'>
            <div className='w-[70%] border-r-2 border-r-gray-300'>
                {
                    products.map(product => <Product pd = {product} show = {true} handleProduct = {HandleProduct}></Product>)
                }
            </div>
            <div className='ml-6'>
                <Cart cart = {cart} ></Cart>
            </div>
        </div>
    );
};

export default Shop;