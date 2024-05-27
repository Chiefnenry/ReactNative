import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import { useCart } from "../provider/CartProvider";
import { FlatList } from "react-native";
import CartListItem from "@/components/CartListItem";
import { getBackgroundColorAsync } from "expo-system-ui";

const CartScreen = () => {
  const { items } = useCart();
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{
          padding: 10,
          gap: 10,
          //   backgroundColor: "white",
        }}
      />
      <ThemedText>Cart items length: {items.length}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
  },
});
export default CartScreen;
