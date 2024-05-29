import { StyleSheet, Platform, Image, Pressable } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "../constants/Colors";
import { products } from "../assets/data/products";
import { Product } from "../types";
import { Link, useSegments } from "expo-router";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
type ProductListItemProps = {
  product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.titleContainer}>
        <ParallaxScrollView>
          <Image
            source={{ uri: product.image || defaultPizzaImage }}
            style={styles.image}
            resizeMode="contain"
          />
          <ThemedText style={styles.title}>{product.name}</ThemedText>
          <ThemedText style={styles.price}>${product.price}</ThemedText>
        </ParallaxScrollView>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
  },

  image: {
    width: "100%",
    aspectRatio: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
    color: "#000",
  },

  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});
