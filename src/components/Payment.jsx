import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";
const Payment = () => {
  const location = useLocation();
  const { price, campId } = location.state || {};
  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-6">Payment to Go next Step</h2>
      <p className="text-center text-lg mb-4">
        You are about to pay <strong>${price}</strong> for Camp ID:{" "}
        <strong>{campId}</strong>
      </p>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm campId={campId} price={price}/>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
