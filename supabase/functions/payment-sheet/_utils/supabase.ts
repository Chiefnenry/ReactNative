import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { stripe } from "./stripe.ts";

export const createOrRetrieveProfile = async (req: Request) => {
  // Log the initiation of the function
  console.log("Starting createOrRetrieveProfile function");

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    }
  );

  // Log the creation of the Supabase client
  console.log("Supabase client created");

  // Now we can get the session or user object
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  // Log the retrieved user object
  console.log("User retrieved:", user);

  if (!user) {
    console.error("No user found");
    throw new Error("No user found");
  }

  const { data: profile, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Log the retrieved profile or any errors
  if (error || !profile) {
    console.error("Error retrieving profile:", error);
    throw new Error("Profile not found");
  }

  console.log("Profile retrieved:", profile);

  if (profile.stripe_customer_id) {
    return profile.stripe_customer_id;
  }

  // Create a Stripe customer
  const customer = await stripe.customers.create({
    email: user.email,
    metadata: { uid: user.id },
  });

  await supabaseClient
    .from("profiles")
    .update({ stripe_customer_id: customer.id })
    .eq("id", profile.id);

  // Log the created customer
  console.log("Stripe customer created:", customer);

  return customer.id;
};

// Example usage with a mock request object
// const mockRequest = new Request("https://example.com", {
//   headers: new Headers({
//     Authorization: "Bearer YOUR_TOKEN_HERE",
//   }),
// });

createOrRetrieveProfile(mockRequest)
  .then((result) => {
    console.log("Function result:", result);
  })
  .catch((error) => {
    console.error("Function error:", error);
  });
