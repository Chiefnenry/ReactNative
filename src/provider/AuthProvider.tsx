import { Session } from "@supabase/supabase-js";
import { supabase } from "../../src/lib/supabase";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Profile = {
  id: string;
  group: string;
};

type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: Profile | null;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        console.log("Fetching session...");
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        // console.log("Fetched session:", session);

        if (session) {
          // console.log("Session found, fetching profile...");
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          if (error) throw error;
          setProfile(data || null);
          // console.log("Fetched profile:", data);
        } else {
          // console.log("No session found.");
        }
      } catch (error) {
        // console.error("Error fetching session or profile:", error);
      } finally {
        setLoading(false);
        // console.log("Loading set to false");
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        // console.log("Auth state changed, new session:", session);
        setSession(session);

        if (session) {
          try {
            console
              .log
              // "Session found on auth state change, fetching profile..."
              ();
            const { data, error } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();
            if (error) throw error;
            setProfile(data || null);
            // console.log("Fetched profile on auth state change:", data);
          } catch (error) {
            console.error(
              // "Error fetching profile on auth state change:",
              error
            );
          }
        } else {
          setProfile(null);
          // console.log("Profile set to null on auth state change");
        }
      }
    );

    // Cleanup the listener on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{ session, loading, profile, isAdmin: profile?.group === "ADMIN" }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
