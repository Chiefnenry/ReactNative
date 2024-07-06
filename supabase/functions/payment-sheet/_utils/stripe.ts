// ./_utils/stripe.ts

import Stripe from "https://esm.sh/stripe@16.0.0?target=deno&deno-std=0.132.0&no-check";

const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  httpClient: Stripe.createFetchHttpClient(),
});

export { stripe };
