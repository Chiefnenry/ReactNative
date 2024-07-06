import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { stripe } from "./_utils/stripe.ts";
import { createOrRetrieveProfile } from "./_utils/supabase.ts";

console.log("Server started: Listening for requests...");

serve(async (req: Request) => {
  console.log("Received a request:", req);

  try {
    const { amount } = await req.json();
    console.log("Request JSON parsed:", { amount });

    const customer = await createOrRetrieveProfile(req);
    console.log("Customer retrieved or created:", customer);

    // Create an ephermeralKey so that the Stripe SDK can fetch the customer's stored payment methods.
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer },
      { apiVersion: "2020-08-27" }
    );

    // Create a PaymentIntent so that the SDK can charge the logged in customer.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "usd",
      customer: customer,
      // ephemeralKey: ephemeralKey.secret,
    });
    console.log("PaymentIntent created:", paymentIntent);

    const res = {
      publishableKey: Deno.env.get("EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer,
    };

    console.log("Response prepared:", res);

    return new Response(JSON.stringify(res), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error occurred:", error);

    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
