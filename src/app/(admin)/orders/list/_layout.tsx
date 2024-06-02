import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
// import { ThemedText } from "@/components/ThemedText";
// import ScreenOne from "@/screens/ScreenOne"; // Replace with actual screen components
// import ScreenTwo from "@/screens/ScreenTwo"; // Replace with actual screen components

const TopTab = withLayoutContext(createMaterialTopTabNavigator().Navigator);
const TopTabScreen = createMaterialTopTabNavigator().Screen;

export default function OrderListNavigation() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <TopTab>
        <TopTab.Screen name="index" options={{ title: "Active" }} />
        {/* <TopTabScreen name="ScreenTwo" component={ScreenTwo} /> */}
      </TopTab>
    </SafeAreaView>
  );
}
