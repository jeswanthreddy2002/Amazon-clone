import React, { useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckOutProduct from "./CheckOutProduct";
import { Link ,useNavigate} from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "./axios";
// Anywhere to use the navigate("") we should have to make sure that for that desination path there is already a Router .
function Payment() {
  const navigate=useNavigate();
  const [{ basket, user ,total}, dispatch] = useStateValue();
  const [succeeded,setSucceeded]=useState(false);
  const [processing,setProcessing]=useState("");
  const [clientSecret,setClientSecret]=useState(true);
  //now we need two pieces of states here for payment card
  // i.)  one for disabled state means we can disable the button
  // ii.) other is for saying if there is an error
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  useEffect(()=>{
    const getClientSecret= async()=>{
      const response=await axios({method:'post',
      url:`/payments/create?total=${{total}*100}`
      });
      setClientSecret(response.data.clientSecret);
    }
    getClientSecret();
  },[basket,total])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload= await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:CardElement  
        // elements.getElement(CardElement)
      }
    }).then((paymentIntent)=>{
      setSucceeded(true);
    setError(null);
    setProcessing(false);
    navigate("/CheckOut", { replace: true })
    })   
     
  };
  const handleChange = (event) => {
    setDisabled(event.empty); // if the event is empty then make it disabled otherwise no
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout {<Link to="/CheckOut">{basket?.length} items</Link>}</h1>
        <div className="payment__section">
          <div className="payment__title">
            <h1>Delivery address</h1>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>items </h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckOutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">payment method</div>
          <div className="payment__details">
            {/* stripe will do its stuff here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div>
                <CurrencyFormat
                  renderText={(value) => (
                   <h3>Order Total:{value}</h3>
                  )}
                  decimalScale={2}
                  value={total} //this is homework
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing||disabled||succeeded}>
                       {processing? <p>processing</p>:"Buy Now"}
                </button>
              </div>
              {/*errors*/}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
