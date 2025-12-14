/**
 * Custom hooks for Authentication
 */
import { useState, useEffect } from 'react';
import { authApi, LoginRequest, SignUpRequest } from '@/api';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const storedUser = authApi.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.login(credentials);
      setUser(response.user);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.signUp(data);
      setUser(response.user);
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const isAuthenticated = authApi.isAuthenticated();

  return { user, loading, error, login, signUp, logout, isAuthenticated };
};
