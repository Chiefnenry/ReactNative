// Import Stripe from the latest version
import Stripe from "https://esm.sh/stripe@16.0.0?target=deno&deno-std=0.132.0&no-check";

// Initialize Stripe with the secret key
export const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  httpClient: Stripe.createFetchHttpClient(),
});
