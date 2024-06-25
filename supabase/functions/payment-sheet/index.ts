import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { stripe } from "./_utils/stripe.ts"; // Ensure this path is correct

// Initialize Stripe with your secret key (in your utils file)
// export const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
//   httpClient: Stripe.createFetchHttpClient(),
// });

console.log("Hello from Functions!");

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      status: 204,
    });
  }

  try {
    const { amount, currency } = await req.json();

    // Create a PaymentIntent so that the SDK can charge the logged-in customer.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      // customer: customer, // Add customer if needed
    });

    const res = {
      publishableKey: Deno.env.get("EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
      paymentIntent: paymentIntent.client_secret,
      // ephemeralKey: ephemeralKey.secret,
      // customer: customer,
    };

    return new Response(JSON.stringify(res), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow all origins
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow all origins
      },
      status: 400,
    });
  }
});

//  To invoke locally:

//   1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
//   2. Make an HTTP request:

// curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/payment-sheet' \
//   --header 'Authorization: Bearer YOUR_SUPABASE_ANON_KEY' \
//   --header 'Content-Type: application/json' \
//   --data '{"amount":1000,"currency":"usd"}'
