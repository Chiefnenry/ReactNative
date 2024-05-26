import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

const PoductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <ThemedView>
      <Stack.Screen options={{ title: "Details" + id }} />
      <ThemedText style={{ fontSize: 20 }}>
        PoductDetailsScreen for id: {id}
      </ThemedText>
    </ThemedView>
  );
};

export default PoductDetailsScreen;
