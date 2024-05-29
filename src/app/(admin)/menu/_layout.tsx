import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Colors } from "../../../constants/Colors"; // Import Colors from the correct path
import { useColorScheme } from "../../../hooks/useColorScheme";
import { Pressable } from "react-native";

export default function MenuStack() {
  const colorScheme = useColorScheme(); // Get the color scheme

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus-square-o"
                    size={25}
                    color={Colors[colorScheme ?? "light"].tint}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href="/">
              <FontAwesome
                name="pencil"
                size={25}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
