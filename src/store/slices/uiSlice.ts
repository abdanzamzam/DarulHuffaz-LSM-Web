import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isSidebarCollapsed: boolean;
  currentPage: string;
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  isSidebarCollapsed: true,
  currentPage: 'dashboard',
  theme: 'light',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleSidebar, setCurrentPage, toggleTheme, setTheme } = uiSlice.actions;

export default uiSlice.reducer;