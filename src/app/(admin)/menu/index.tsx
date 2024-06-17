import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ProductListItem from "../../../components/ProductListItem";
import { useProductList } from "../../../api/products";
import { useAuth } from "../../../provider/AuthProvider"; // Ensure the path to useAuth is correct
import { Redirect } from "expo-router"; // Assuming you're using expo-router for navigation

export default function MenuScreen() {
  const { session, isAdmin, loading } = useAuth();
  const { data: products, error, isLoading } = useProductList();

  // Debug logs to understand state changes
  // console.log("Loading (auth):", loading);
  // console.log("Session (auth):", session);
  // console.log("Is Admin (auth):", isAdmin);

  if (loading || isLoading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    // console.log("Redirecting to /sign-in because session is null");
    return <Redirect href={"/sign-in"} />;
  }

  if (!isAdmin) {
    // console.log("Redirecting to /(user) because user is not admin");
    return <Redirect href={"/(user)"} />;
  }

  if (error) {
    return <ThemedText>Failed to fetch products</ThemedText>;
  }

  return (
    <ThemedView>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </ThemedView>
  );
}
