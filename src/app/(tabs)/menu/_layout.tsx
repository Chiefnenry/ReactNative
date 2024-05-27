import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Colors } from "../../../constants/Colors"; // Import Colors from the correct path
import { useColorScheme } from "../../../hooks/useColorScheme";

export default function MenuStack() {
  const colorScheme = useColorScheme(); // Get the color scheme

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart">
            <FontAwesome
              name="shopping-cart"
              size={25}
              color={Colors[colorScheme ?? "light"].tint}
            />
          </Link>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
  );
}
