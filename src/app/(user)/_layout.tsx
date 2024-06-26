import { Link, Redirect, Tabs } from "expo-router";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "../../hooks/useColorScheme";
import { Colors } from "../../constants/Colors";
import { Pressable } from "react-native";
import { useAuth } from "../../provider/AuthProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ href: null }} />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="cutlery" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? "list" : "list"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
