import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

// Definisikan tipe state untuk slice ini
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Definisikan state awal
const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

// Mock users untuk development
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@pesantren.id',
    role: 'admin' as const,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Teacher User',
    email: 'teacher@pesantren.id',
    role: 'teacher' as const,
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Student User',
    email: 'student@pesantren.id',
    role: 'student' as const,
    createdAt: new Date(),
  },
];

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

// Export actions
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Thunk untuk login
export const login = (email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch(loginStart());
    
    // Simulasi API call dengan mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      dispatch(loginSuccess(foundUser));
      localStorage.setItem('lms_user', JSON.stringify(foundUser));
      return true;
    } else {
      dispatch(loginFailure('Email atau password salah'));
      return false;
    }
  } catch (error) {
    dispatch(loginFailure('Terjadi kesalahan saat login'));
    return false;
  }
};

// Thunk untuk logout
export const logoutUser = () => (dispatch: any) => {
  localStorage.removeItem('lms_user');
  dispatch(logout());
};

// Thunk untuk check user dari localStorage saat aplikasi dimulai
export const checkAuth = () => (dispatch: any) => {
  const savedUser = localStorage.getItem('lms_user');
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      dispatch(loginSuccess(user));
    } catch (error) {
      localStorage.removeItem('lms_user');
    }
  }
};

export default authSlice.reducer;