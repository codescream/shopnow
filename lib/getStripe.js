import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = async () => {
  if(!stripePromise) {
    stripePromise = loadStripe("pk_test_51OOnlABmFrZc9YdUJvD1BgSgXlJdoErlc9yM8TfvA37LH52yWu6emMcxJtIwxRVYazQntHbGFCKxOPrjE5jrdpeI00WH0SDG1K");
  }

  return stripePromise;
}

export default getStripe;