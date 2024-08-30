import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, forgetPasswordEmail, VerifyOTP, ResetPassword, GetProfile,updateProfile } from './action';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    otpData: null,
    profile: null,
    tempEmail: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.profile = null;
    },
    setToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Login pending...');
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; 
        state.isAuthenticated = true;
        console.log('Login fulfilled:', action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        console.error('Login rejected:', action.payload);
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Registration pending...');
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        console.log('Registration fulfilled:', action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
        console.error('Registration rejected:', action.payload);
      })
      .addCase(forgetPasswordEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('ForgetPassword pending...');
      })
      .addCase(forgetPasswordEmail.fulfilled, (state, action) => {
        state.tempEmail = action.payload.email;
        state.loading = false;
        console.log('ForgetPassword fulfilled:', action.payload);
      })
      .addCase(forgetPasswordEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'ForgetPassword failed';
        console.error('ForgetPassword rejected:', action.payload);
      })
      .addCase(VerifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Verify OTP pending...');
      })
      .addCase(VerifyOTP.fulfilled, (state, action) => {
        state.token = action.payload.token; 
        state.loading = false;
        state.otpData = action.payload;
        console.log('Verify OTP fulfilled:', action.payload);
      })
      .addCase(VerifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Verify OTP rejected:', action.payload);
      })
      .addCase(ResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('ResetPassword pending...');
      })
      .addCase(ResetPassword.fulfilled, (state, action) => {
        state.token = action.payload.token; 
        state.loading = false;
        state.otpData = action.payload;
        console.log('ResetPassword fulfilled:', action.payload);
      })
      .addCase(ResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('ResetPassword rejected:', action.payload);
      })
      .addCase(GetProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Get Profile pending...');
      })
      .addCase(GetProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        console.log('Get Profile fulfilled:', action.payload);
      })
      .addCase(GetProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Get Profile failed';
        console.error('Get Profile rejected:', action.payload);
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Update Profile pending...');
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; // Update profile in the state
        console.log('Update Profile fulfilled:', action.payload);
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Update Profile failed';
        console.error('Update Profile rejected:', action.payload);
      });
  },
});

export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;



