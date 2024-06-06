import React, { useState } from "react";
import { StyleSheet, Image, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { useCart } from "../../../provider/CartProvider";
import Button from "@/components/Button";
import { PizzaSize } from "../../../types";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useProduct } from "../../../api/products";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = idString ? parseFloat(idString as string) : null;

  // Ensure id is a valid number before using it
  const { data: product, error, isLoading } = useProduct(id ?? 0);

  const { addItem } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <ThemedText>Failed to fetch products</ThemedText>;
  }

  if (!product) {
    return <ThemedText>Product not found</ThemedText>;
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`}>
              <FontAwesome name="pencil" size={25} color={Colors.light.tint} />
            </Link>
          ),
        }}
      />

      <ThemedText style={styles.title}>{product.name}</ThemedText>
      <Image source={{ uri: product.image }} style={styles.image} />

      <ThemedText style={styles.price}>${product.price}</ThemedText>
      <Button text="Add to Cart" onPress={addToCart} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
});

export default ProductDetailsScreen;
