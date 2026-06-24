'use client';

import type {Session, User} from '@supabase/supabase-js';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';

import {createSupabaseBrowserClient} from '@/lib/supabase-browser';

// Contexte React pour l'état d'authentification
type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {}
});

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Mémoïse le client Supabase pour éviter de le recréer à chaque rendu
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  useEffect(() => {
    // Récupère la session courante au montage
    const getSession = async () => {
      const {
        data: {session: currentSession}
      } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    };

    void getSession();

    // Écoute les changements d'état d'authentification
    const {
      data: {subscription}
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{user, session, loading, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook pour accéder au contexte d'authentification
export function useAuth() {
  return useContext(AuthContext);
}
