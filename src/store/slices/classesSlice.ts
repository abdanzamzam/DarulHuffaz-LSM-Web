import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Class } from '../../types';

interface ClassesState {
  classes: Class[];
  isLoading: boolean;
  error: string | null;
  selectedClass: Class | null;
}

// Mock data untuk development
const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Fiqih Ibadah',
    description: 'Mempelajari tata cara ibadah dalam Islam',
    teacherId: '2',
    students: [],
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Tafsir Al-Quran',
    description: 'Memahami makna dan hikmah ayat-ayat Al-Quran',
    teacherId: '2',
    students: [],
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Hadits Akhlak',
    description: 'Mempelajari hadits-hadits tentang akhlak mulia',
    teacherId: '2',
    students: [],
    createdAt: new Date()
  },
];

const initialState: ClassesState = {
  classes: [],
  isLoading: false,
  error: null,
  selectedClass: null,
};

// Async thunk untuk mengambil data kelas
export const fetchClasses = createAsyncThunk(
  'classes/fetchClasses',
  async (_, { rejectWithValue }) => {
    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockClasses;
    } catch (error) {
      return rejectWithValue('Gagal mengambil data kelas');
    }
  }
);

// Async thunk untuk mengambil detail kelas
export const fetchClassById = createAsyncThunk(
  'classes/fetchClassById',
  async (classId: string, { rejectWithValue }) => {
    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 300));
      const foundClass = mockClasses.find(c => c.id === classId);
      if (!foundClass) {
        return rejectWithValue('Kelas tidak ditemukan');
      }
      return foundClass;
    } catch (error) {
      return rejectWithValue('Gagal mengambil detail kelas');
    }
  }
);

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setSelectedClass: (state, action: PayloadAction<Class | null>) => {
      state.selectedClass = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchClasses
      .addCase(fetchClasses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action: PayloadAction<Class[]>) => {
        state.isLoading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // fetchClassById
      .addCase(fetchClassById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClassById.fulfilled, (state, action: PayloadAction<Class>) => {
        state.isLoading = false;
        state.selectedClass = action.payload;
      })
      .addCase(fetchClassById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedClass } = classesSlice.actions;

export default classesSlice.reducer;