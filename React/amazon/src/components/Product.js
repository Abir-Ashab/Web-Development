import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.pd; // it means img = props.pd.img, name = props.pd.name
    return (
        <div className='flex gap-x-[5%] ml-[5%] mt-5 border-b-2 border-r-gray-300 p-6'>
            <div className='w-[20%]'>
                <img src={img} alt={name} />
            </div>
            <div className='w-[80%] text-justify space-y-3'>
                <h1 className='text-2xl font-semibold text-blue-800'><Link to={"/product/" + key}>{name}</Link></h1>
                <br />
                <p className='text-sm'>By: {seller}</p>
                <br />
                <p className='text-xl'>{price}$</p>
                <p className='text-sm'>Only {stock} left in stock - Order soon</p>
                <p></p>
                {
                    props.show && 
                <button className='bg-orange-400 rounded-lg pl-8 pr-8 pt-1 pb-1 relative' onClick={ ()=>
                    props.handleProduct(props.pd)}>
                    <FontAwesomeIcon icon={faCartShopping} /> add to cart
                </button>
                }
            </div>       
        </div>
    );
};

export default Product;
