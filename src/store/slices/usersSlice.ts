import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UsersState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
}

// Data pengguna awal untuk development
const initialUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@pesantren.id',
    role: 'admin',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Teacher User',
    email: 'teacher@pesantren.id',
    role: 'teacher',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Student User',
    email: 'student@pesantren.id',
    role: 'student',
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Ahmad Santri',
    email: 'ahmad@pesantren.id',
    role: 'student',
    createdAt: new Date(),
  },
  {
    id: '5',
    name: 'Fatimah Guru',
    email: 'fatimah@pesantren.id',
    role: 'teacher',
    createdAt: new Date(),
  },
];

const initialState: UsersState = {
  users: initialUsers,
  selectedUser: null,
  isLoading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setUsers,
  setSelectedUser,
  addUser,
  updateUser,
  deleteUser,
} = usersSlice.actions;

export default usersSlice.reducer;