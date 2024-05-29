import React from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Button from "../components/Button";

import { useCart } from "../provider/CartProvider";
import { FlatList } from "react-native";
import CartListItem from "@/components/CartListItem";
// import { getBackgroundColorAsync } from "expo-system-ui";

const CartScreen = () => {
  const { items, total } = useCart();
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{
          gap: 10,
        }}
      />

      <ThemedText style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Total: ${total}
      </ThemedText>

      <Button text="checkout" />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    padding: 10,
  },
});
export default CartScreen;
