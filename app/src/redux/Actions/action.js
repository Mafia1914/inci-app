
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LOGIN, SIGNUP,FORGETPASSWORD ,VERIFYOPT,RESETPASSWORD,PROFILE ,PROFILE_UPDATE} from '../../config/urls';



export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error:', errorData); 
        return rejectWithValue(errorData.message || 'Login failed. Please try again.');
      }

      const data = await response.json();
      console.log('Login response:', data); 
      return data;
    } catch (error) {
      console.error('Login request failed:', error.message); 
      return rejectWithValue(error.message || 'Something went wrong with the login request.');
    }
  }
);



export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user, { rejectWithValue }) => {
    try {
      console.log('Sending registration request with:', user);
      const response = await fetch(SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration API error:', errorData);
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      console.log('Registration API response:', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const forgetPasswordEmail = createAsyncThunk(
  'auth/forgetPasswordEmail',
  async ({email}, { rejectWithValue }) => {
    try {
      
      const response = await fetch(FORGETPASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('ForgetPassword error:', errorData);
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      console.log('ForgetPassword response:', data);
      return data;
    } catch (error) {
      console.error('ForgetPassword caught error:', error);
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);


export const VerifyOTP = createAsyncThunk(
  'auth/VerifyOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      console.log('Sending OTP verification request with:', { email, otp });
      const response = await fetch(VERIFYOPT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Verify OTP error:', errorData);
        return rejectWithValue(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      console.log('Verify OTP response:', data);
      return data;
    } catch (error) {
      console.error('Verify OTP caught error:', error);
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);


export const ResetPassword = createAsyncThunk(
  'auth/ResetPassword',
  async ({ email, password, token }, { rejectWithValue }) => {
    try {
      console.log('Sending ResetPassword request with:', { email, password, token });
      const response = await fetch(RESETPASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('ResetPassword error:', errorData);
        return rejectWithValue(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      console.log('ResetPassword response:', data);
      return data;
    } catch (error) {
      console.error('ResetPassword caught error:', error);
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);



export const GetProfile = createAsyncThunk(
  'auth/GetProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
  
      const state = getState();
      const token = state.auth.token;

      if (!token) {
      }

      const response = await fetch(PROFILE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Profile API error:', errorData);
        return rejectWithValue(errorData.message || 'Network response was not ok');
      }

      const responseBody = await response.json();

      if (!responseBody.data) {
        console.error('Response does not contain data');
        return rejectWithValue('Response does not contain data');
      }

      return responseBody.data;
    } catch (error) {
      console.error('Profile API caught error:', error);
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);



export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(PROFILE_UPDATE, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Update Profile error:', errorData);
        return rejectWithValue(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      console.log('Update Profile response:', data);
      return data;
    } catch (error) {
      console.error('Update Profile caught error:', error);
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);





