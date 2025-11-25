import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// mock async thunk to simulate login/checkUser
export const checkUser = createAsyncThunk("user/checkUser", async () => {
  // simulate API delay
  await new Promise((res) => setTimeout(res, 100));
  // return fake user data
  return { isAuthenticated: true, role: "student" };
});

const initialState = {
  isAuthenticated: false,
  role: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAsStudent(state) {
      state.isAuthenticated = true;
      state.role = "student";
    },
    loginAsHelpSeeker(state) {
      state.isAuthenticated = true;
      state.role = "help-seeker";
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.role = action.payload.role;
      })
      .addCase(checkUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.role = null;
      });
  },
});

export const { loginAsStudent, loginAsHelpSeeker, logout } = userSlice.actions;
export default userSlice.reducer;
