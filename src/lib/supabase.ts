import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient, SupabaseClientOptions } from "@supabase/supabase-js"; // Make sure to import SupabaseClientOptions if needed
import { Database } from "../database.types";

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON || "";

// Example of using Database type in Supabase client configuration
const supabaseOptions: SupabaseClientOptions<"public"> = {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
};

// Create Supabase client using the specified options
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  supabaseOptions
);
