import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import "expo-router/entry";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "../provider/AuthProvider";
import { ActivityIndicator } from "react-native";
import { supabase } from "../lib/supabase";

const Index = () => {
  const { session, loading, isAdmin } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  if (!isAdmin) {
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
      {/* <Link href={"/sign-in"} asChild>
        <Button text="Sign in" />
      </Link> */}
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </ThemedView>
  );
};

export default Index;
