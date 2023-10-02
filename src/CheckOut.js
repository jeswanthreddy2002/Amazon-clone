import React from 'react';
import "./CheckOut.css";
import SubTotal from './SubTotal';
import { useStateValue } from './StateProvider';
import CheckOutProduct from './CheckOutProduct';
const CheckOut = () => {
    const [{basket},dispatch]=useStateValue();
    return (
        <div className='checkout'>
             <div className='checkout__left'>
                <div >
                 <h2 className='checkout__title'>your shopping basket</h2>
                 {basket.map(item=>(
                    <CheckOutProduct id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating}/>
                 ))}
                </div>
                
             </div>
             <div className='checkout__right'>
                 <SubTotal/>
             </div>
             {/* <CheckOutProduct/> */}
        </div>
    );
}

export default CheckOut;
