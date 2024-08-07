import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import QueryProvider from "../provider/QueryProvider";
import CartProvider from "../provider/CartProvider";
import AuthProvider from "../provider/AuthProvider";
import { useColorScheme } from "../hooks/useColorScheme";
import { StripeProvider } from "@stripe/stripe-react-native";
import NotificationProvider from "../provider/NotificationProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../src/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""}
      >
        <AuthProvider>
          <QueryProvider>
            <NotificationProvider>
              <CartProvider>
                <Stack>
                  <Stack.Screen
                    name="(admin)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(user)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="cart"
                    options={{ presentation: "modal" }}
                  />
                </Stack>
              </CartProvider>
            </NotificationProvider>
          </QueryProvider>
        </AuthProvider>
      </StripeProvider>
    </ThemeProvider>
  );
}
