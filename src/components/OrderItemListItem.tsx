import { StyleSheet, Image } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { OrderItem, Tables } from "../types";
import { defaultPizzaImage } from "./ProductListItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import RemoteImage from "./RemoteImage";

type OrderItemListItemProps = {
  item: { products: Tables<"products"> } & Tables<"order_items">;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <ThemedView style={styles.container}>
      <RemoteImage
        path={item.products.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode="contain"
      />
      <ThemedView style={{ flex: 1 }}>
        <ThemedText style={styles.title}>{item.products.name}</ThemedText>
        <ThemedView style={styles.subtitleContainer}>
          <ThemedText style={styles.price}>
            ${item.products.price.toFixed(2)}
          </ThemedText>
          <ThemedText style={styles.size}>Size: {item.size}</ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.quantitySelector}>
        <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    marginVertical: 3,
    gap: 3,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    color: Colors.light.tint,
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
    color: "black",
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
    backgroundColor: "white",
    color: Colors.light.tint,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },

  size: {
    color: Colors.light.tint,
  },
});

export default OrderItemListItem;
