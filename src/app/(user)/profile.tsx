import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "react-native";
import { supabase } from "../../lib/supabase";

const profile = () => {
  return (
    <ThemedView>
      <ThemedText>profile</ThemedText>

      <Button
        title="Sign out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </ThemedView>
  );
};

export default profile;
