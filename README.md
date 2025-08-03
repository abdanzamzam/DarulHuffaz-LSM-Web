# DarulHuffaz Learning Management System

## Tentang Aplikasi

DarulHuffaz LMS adalah sistem manajemen pembelajaran untuk pondok pesantren yang memungkinkan pengelolaan kelas, materi, dan interaksi antara guru dan siswa.

## Teknologi yang Digunakan

- React 18
- TypeScript
- Vite
- Redux Toolkit
- TailwindCSS
- Lucide React (icons)

## Struktur Redux

Aplikasi ini menggunakan Redux Toolkit untuk manajemen state. Berikut adalah struktur Redux yang digunakan:

### Store

Store Redux dikonfigurasi di `src/store/index.ts` dan terdiri dari beberapa slice:

```typescript
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    classes: classesReducer,
    // Reducer lain dapat ditambahkan di sini
  },
});
```

### Slices

1. **authSlice** - Mengelola state autentikasi pengguna
   - State: user, isLoading, error
   - Actions: login, logout, checkAuth

2. **uiSlice** - Mengelola state UI aplikasi
   - State: isSidebarCollapsed, currentPage, theme
   - Actions: toggleSidebar, setCurrentPage, toggleTheme, setTheme

3. **classesSlice** - Mengelola state kelas
   - State: classes, isLoading, error, selectedClass
   - Actions: fetchClasses, fetchClassById, setSelectedClass

### Hooks

Untuk memudahkan penggunaan Redux dengan TypeScript, aplikasi ini menyediakan custom hooks di `src/store/hooks.ts`:

```typescript
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## Cara Menggunakan Redux dalam Komponen

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, logout } from '../store/slices/authSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector(state => state.auth);

  const handleLogin = async (email, password) => {
    await dispatch(login(email, password));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    // JSX component
  );
};
```

## Menjalankan Aplikasi

1. Install dependencies:
   ```
   npm install
   ```

2. Jalankan aplikasi dalam mode development:
   ```
   npm run dev
   ```

3. Build untuk production:
   ```
   npm run build
   ```
