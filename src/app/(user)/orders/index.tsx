import React from "react";
import { ActivityIndicator, FlatList, View, StyleSheet } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import { ThemedText } from "@/components/ThemedText";
import { useMyOrderList } from "../../../api/orders";

export default function OrderScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  // console.log("Orders:", orders); // Debug log
  // console.log("Is Loading:", isLoading); // Debug log
  // console.log("Error:", error); // Debug log

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <ThemedText>Failed to fetch</ThemedText>
      </View>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.centered}>
        <ThemedText>No orders available</ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    gap: 10,
    padding: 10,
  },
});
