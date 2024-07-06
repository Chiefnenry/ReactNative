import { Alert } from "react-native";
import { supabase } from "./supabase";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

// Fetch payment sheet parameters
const fetchPaymentSheetParams = async (amount: number) => {
  console.log("Fetching payment sheet params for amount:", amount);

  // Create payment session for our customer
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: { amount },
  });

  if (data) {
    console.log("Payment sheet params fetched successfully:", data);
    return data;
  }

  console.error(
    "Error fetching payment sheet params:",
    error?.message ?? "no data"
  );
  Alert.alert(`Error: ${error?.message ?? "no data"}`);
  return {};
};

export const initialisePaymentSheet = async (amount: number) => {
  console.log("Initializing payment sheet for amount:", amount);

  // setLoading(true);
  const { paymentIntent, publishableKey, customer, ephemeralKey } =
    await fetchPaymentSheetParams(amount);

  if (!publishableKey || !paymentIntent) {
    console.error("Missing publishableKey or paymentIntent");
    return;
  }

  const { error } = await initPaymentSheet({
    merchantDisplayName: "Example, Inc.",
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: "Jane Doe",
    },
  });

  if (error) {
    console.error("Error initializing payment sheet:", error.message);
  } else {
    console.log("Payment sheet initialized successfully");
  }
};

export const openPaymentSheet = async () => {
  console.log("Opening payment sheet");

  const { error } = await presentPaymentSheet();

  if (error) {
    console.error("Error presenting payment sheet:", error.message);
    Alert.alert(`Error code: ${error.code}`, error.message);
    return false;
  } else {
    console.log("Payment sheet presented successfully");
    Alert.alert("Success", "Your order is confirmed!");
    return true;
  }
};
