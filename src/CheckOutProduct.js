import React from 'react';
import "./CheckOutProduct.css";
import { useStateValue } from './StateProvider';
const CheckOutProduct = ({id,image,title,price,rating}) => {
    const [{basket},dispatch]=useStateValue();
    const removeFromBasket=()=>{
         dispatch({type:'REMOVE_FROM_THE_BASKET',
                    id:id})
    }
    const increase= ()=>{
        dispatch({type:"increase_the_value",price:price});
    }
    const decrease= ()=>{
        dispatch({type:"decrease_the_value",price:price});
    } 
    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} alt='product'/>
            <div className='checkoutProduct__info'>
               <p className='checkoutProduct__title'>{title}</p>
               <p className='checkoutProduct__price'>
                   <div> <button onClick={increase}>+ </button><small>$</small>
                    <strong>{price}</strong> <button onClick={decrease}> -</button>
                    </div>
               </p>
           
            <div className='checkoutProduct__rating'> 
            {Array(rating)
                .fill()
                .map((_, i) => (
                  <p>🌟</p>
                ))}
                
                <button onClick={removeFromBasket}>Remove from Basket</button>
            </div>
            </div>
        </div>

    );
}

export default CheckOutProduct;
