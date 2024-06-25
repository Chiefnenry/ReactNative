import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import "expo-router/entry";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "../provider/AuthProvider";
import { ActivityIndicator } from "react-native";
import { supabase } from "../lib/supabase";

const Index = () => {
  const { session, loading, profile, isAdmin } = useAuth();
  // const navigate = navigate(); // Use useNavigate hook for navigation

  // Debug logs to understand state changes
  // console.log("Loading:", loading);
  //   console.log("Session:", session);
  // console.log("Profile:", profile);
  // console.log("Is Admin:", isAdmin);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    // console.log("Redirecting to /sign-in because session is null");
    return <Redirect href={"/sign-in"} />;
  }

  if (!isAdmin && profile) {
    // console.log("Redirecting to /(user) because user is not admin");
    return <Redirect href={"/(user)"} />;
  }

  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </ThemedView>
  );
};

export default Index;
