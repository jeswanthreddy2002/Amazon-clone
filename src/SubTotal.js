import React from 'react';
import "./SubTotal.css";
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { useNavigate } from 'react-router';
const SubTotal = () => {
    const navigate=useNavigate();
    const [{ basket, total }, dispatch] = useStateValue();
    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value)=>(
                    <>
                        <p> 
                        {/* this no of items is also hoework */}
                            Subtotal({basket?.length} items): <strong>{value}</strong>
                        </p>
                        <small className='subtotal__gift'>
                        <input type="checkbox"/>
                        This order contains a gift

                        </small>
                    </>
                )}
                decimalScale={2}
                value={total} //this is homework
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={e=>navigate('/Payment')}>Proceed to Checkout</button>
        </div>
    );
}

export default SubTotal;
 