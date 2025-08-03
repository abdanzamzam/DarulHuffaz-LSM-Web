import React, { createContext, useContext } from 'react';
import { User } from '../types';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { login as loginAction, logoutUser, checkAuth } from '../store/slices/authSlice';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector(state => state.auth);

  React.useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const login = async (email: string, password: string): Promise<boolean> => {
    return dispatch(loginAction(email, password)) as unknown as Promise<boolean>;
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};