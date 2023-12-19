import toast from "react-hot-toast";
import { default as getStripe } from "./getStripe";



const handleCheckout = async (toBuy) => {
  const stripe = await getStripe();

  const response = await fetch('/api/stripe', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(toBuy),
  });

  if(response.status === 500) return;

  const data = await response.json();

  toast.loading('Redirecting....');

  stripe.redirectToCheckout({ sessionId: data.id });
}

export default handleCheckout;