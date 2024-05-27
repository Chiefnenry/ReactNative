import { StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { CartItem } from "../types";
import { Link } from "expo-router";
// import { defaultPizzaImage } from "../constants/Images";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../provider/CartProvider";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity } = useCart();
  if (!cartItem || !cartItem.product) {
    return null;
  }
  return (
    <ThemedView style={styles.container}>
      <Image
        source={{ uri: cartItem.product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <ThemedView style={{ flex: 1 }}>
        <ThemedText style={styles.title}>{cartItem.product.name}</ThemedText>
        <ThemedView style={styles.subtitleContainer}>
          <ThemedText style={styles.price}>
            ${cartItem.product.price.toFixed(2)}
          </ThemedText>
          <ThemedText>Size: {cartItem.size}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5 }}
        />

        <ThemedText style={styles.quantity}>{cartItem.quantity}</ThemedText>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5 }}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
    backgroundColor: "white",
    color: Colors.light.tint,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: "white",
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
    // backgroundColor: "white",
    // color: Colors.light.tint,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
    backgroundColor: "white",
  },
});

export default CartListItem;
