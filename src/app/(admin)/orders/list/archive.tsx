// OrderScreen.tsx
import React from "react";
import { ActivityIndicator, FlatList } from "react-native";
import OrderItemListItem from "@/components/OrderListItem";
import { useAdminOrderList } from "../../../../api/orders";
import { ThemedText } from "@/components/ThemedText";

const OrderScreen: React.FC = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: true });

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
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
};

export default OrderScreen;
