import { StyleSheet, Image, Pressable, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Colors } from "../../../constants/Colors";
import Button from "@/components/Button";
import { useCart } from "../../../provider/CartProvider";
import { PizzaSize } from "../../../types";
import { useProduct } from "../../../api/products";
import RemoteImage from "@/components/RemoteImage";
import { defaultPizzaImage } from "@/components/ProductListItem";

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
      <Stack.Screen options={{ title: product?.name }} />
      <RemoteImage
        path={product?.image}
        fallback={defaultPizzaImage}
        style={styles.image}
      />

      <ThemedText style={styles.select}>Select size</ThemedText>
      <ThemedView style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size);
            }}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
            key={size}
          >
            <ThemedText
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? "black" : "gray",
                },
              ]}
            >
              {size}
            </ThemedText>
          </Pressable>
        ))}
      </ThemedView>

      <ThemedText style={styles.price}>${product.price}</ThemedText>
      <Button onPress={addToCart} text="Add to cart" />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.tint,
    marginTop: "auto",
  },
  select: {
    color: Colors.light.tint,
    fontSize: 18,
    fontWeight: "bold",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.light.tint,
  },
});

export default ProductDetailsScreen;
