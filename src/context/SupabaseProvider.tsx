import { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  role: null,
  loading: true,
});

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId: string) => {
    try {
      console.log('[SupabaseProvider] loadProfile called with userId:', userId);

      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error || !data) {
        console.error('[SupabaseProvider] Error loading profile:', error?.message ?? 'No profile found');
        setRole(null);
      } else {
        console.log('[SupabaseProvider] Profile loaded, role:', data.role);
        setRole(data.role);
      }
    } catch (err) {
      console.error('[SupabaseProvider] Unexpected error in loadProfile:', err);
      setRole(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      console.log('[SupabaseProvider] Waiting for Supabase to hydrate...');
      await new Promise(res => setTimeout(res, 50)); // ⏳ let Supabase session stabilize
  
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user ?? null;
  
      setSession(data.session ?? null);
      setUser(currentUser);
  
      if (currentUser) {
        await loadProfile(currentUser.id);
      } else {
        setRole(null);
      }
  
      setLoading(false);
    };
  
    init();
  
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setSession(session ?? null);
      setUser(currentUser);
  
      if (currentUser) {
        await loadProfile(currentUser.id);
      } else {
        setRole(null);
      }
  
      setLoading(false);
    });
  
    return () => {
      console.log('[SupabaseProvider] Cleaning up auth listener');
      authListener.subscription.unsubscribe();
    };
  }, []);
  

  return (
    <AuthContext.Provider value={{ user, session, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
