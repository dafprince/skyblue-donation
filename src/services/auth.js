import { supabase } from './supabase';

// Connexion admin
export const loginAdmin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

// Déconnexion
export const logoutAdmin = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Vérifier si l'utilisateur est connecté
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Écouter les changements d'authentification
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};