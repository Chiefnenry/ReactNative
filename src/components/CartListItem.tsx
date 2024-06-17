import { StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { CartItem } from "../types";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../provider/CartProvider";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import RemoteImage from "./RemoteImage";
import { defaultPizzaImage } from "./ProductListItem";

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
      <RemoteImage
        path={cartItem.product?.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode="contain"
      />
      <ThemedView style={{ flex: 1 }}>
        <ThemedText style={styles.title}>{cartItem.product.name}</ThemedText>
        <ThemedView style={styles.subtitleContainer}>
          <ThemedText style={styles.price}>
            ${cartItem.product.price.toFixed(2)}
          </ThemedText>
          <ThemedText style={styles.size}>Size: {cartItem.size}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={styles.icon}
        />
        <ThemedText style={styles.quantity}>{cartItem.quantity}</ThemedText>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={styles.icon}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
    color: Colors.light.tint,
    backgroundColor: "white",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    // backgroundColor: "white",
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  price: {
    fontWeight: "bold",
    marginRight: 10,
    color: Colors.light.tint,
  },
  icon: {
    padding: 5,
  },

  size: {
    color: Colors.light.tint,
  },
});

export default CartListItem;
