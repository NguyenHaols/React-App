import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface themMode {
  mode: string;
  loading: boolean;
  error: string | null;
}

const initialState: themMode = {
  mode: "light",
  loading: false,
  error: null,
};

export const themeModeSlice = createSlice({
  name: "themMode",
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
  },
});

export const { changeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
