import { StyleSheet, Platform, Image } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { products } from "../../../src/assets/data/products";
import ProductListItem from "../../components/ProductListItem";

export default function MenuScreen() {
  return (
    <ThemedView>
      <ProductListItem product={products[0]} />
      <ProductListItem product={products[1]} />
    </ThemedView>
  );
}
