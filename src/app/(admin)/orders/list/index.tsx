// OrderScreen.tsx
import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import OrderItemListItem from "@/components/OrderListItem";
import { useAdminOrderList } from "../../../../api/orders";
import { ThemedText } from "@/components/ThemedText";
import { useInsertOrderSubscription } from "../../../../api/orders/subsctiption";

export default function OrderScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ThemedText>Failed to fetch</ThemedText>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItemListItem order={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
