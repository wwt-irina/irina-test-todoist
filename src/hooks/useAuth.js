import { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

/**
 * useAuth Hook
 * 
 * Custom hook to access Okta authentication state, user information,
 * and authentication methods. Handles MFA-authenticated sessions.
 * 
 * @returns {Object} Authentication state and methods
 * - isAuthenticated: boolean indicating if user is authenticated
 * - user: user information object (null if not authenticated)
 * - loading: boolean indicating if auth state is being determined
 * - login: function to initiate login flow (includes MFA if configured)
 * - logout: function to log out the user
 * - oktaAuth: Okta auth instance for advanced operations
 */
export const useAuth = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authState?.isAuthenticated) {
      oktaAuth.getUser().then((userInfo) => {
        setUser(userInfo);
        setLoading(false);
      }).catch((err) => {
        console.error('Error fetching user info:', err);
        setLoading(false);
      });
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [authState, oktaAuth]);

  const login = async () => {
    try {
      // Redirects to Okta login page, where MFA is handled
      await oktaAuth.signInWithRedirect();
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await oktaAuth.signOut();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      throw err;
    }
  };

  return {
    isAuthenticated: authState?.isAuthenticated || false,
    user,
    loading: loading || !authState,
    login,
    logout,
    oktaAuth,
  };
};
