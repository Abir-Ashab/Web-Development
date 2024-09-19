import React from 'react';
import logo from '../images/logo.png';

const Header = () => {
    return (
        <div>
            <div className='flex justify-center mt-3 mb-2'>
                <img class = "h-10" src={logo} alt="baal" />
            </div>
            <div className='bg-black text-cyan-50 p-4'>
                <nav className='flex justify-start space-x-6 ml-12'>
                    <a className=' hover:bg-slate-600' href="/shop">Shop</a>
                    <a className=' hover:bg-slate-600' href="/review">Order Review</a>
                    <a className=' hover:bg-slate-600' href="/inventory">Manage Inventory</a>
                </nav>
            </div>
            
        </div>
    );
};

export default Header;