import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../fakeData';
import Product from './Product';

const ProductDetails = () => {
    const {key} = useParams();//it is a hook used to receive parameters passed through /:name
    const data = fakeData.find(pd => pd.key === key);
    return (
        <div>
            <h1>{key} Product details coming soon</h1>
            <Product pd = {data} show = {false}></Product>
        </div>
    );
};

export default ProductDetails;