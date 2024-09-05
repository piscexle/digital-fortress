import auth from '@/store/auth/auth.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  GetAddressUserResponse,
  ParamLogin,
  ParamLoginWithSocial,
  ParamRegister,
  PostAddressUserResponse,
  ProfileAccountModel,
  ResetPasswordModel,
  ResetPasswordWithToken,
  UpdateProfile,
} from './auth.type';

// login user and admin
const loginAction = createAsyncThunk('auth/loginAction', async (params: ParamLogin, thunkAPI) => {
  try {
    const res: any = await auth.login(params);
    if (params.type === 'ADMIN') {
      if (res.data.user.role === 'USER') {
        return thunkAPI.rejectWithValue({ error: 'Error' });
      }
      return res;
    }
    return res;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.response.data.message });
  }
});

const registerAction = createAsyncThunk(
  'auth/registerAction',
  async (params: ParamRegister, thunkAPI) => {
    try {
      const res = await auth.registerUser(params);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);

// admin

// const forgotPasswordByEmailAction = createAsyncThunk(
//   "auth/forgotPasswordByEmailAction",
//   async (params, thunkAPI) => {
//     try {
//       const { email } = params;
//       const res = await auth.forgotPasswordByEmail(email).then((response) => {
//         if (response && response?.data) {
//           return response;
//         }
//         return {};
//       });
//       return res;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error.message });
//     }
//   }
// );

const resetPasswordByEmailAction = createAsyncThunk(
  'auth/resetPasswordByEmail',
  async (resetPasswordModel: ResetPasswordModel, thunkAPI) => {
    try {
      const res = await auth.resetPasswordByEmail(resetPasswordModel);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);

const putProfileAccountAction = createAsyncThunk(
  'auth/putProfileAccount',
  async (data: ProfileAccountModel, thunkAPI) => {
    try {
      const res = await auth.putProfileAccount(data);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);

const getAllAddressWithUserAction = createAsyncThunk(
  'auth/getAllAddressWithUser',
  async (_, thunkAPI) => {
    try {
      const res = await auth.getAllAddressWithUser();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const postAddressWithUserAction = createAsyncThunk(
  'auth/postAddressWithUser',
  async (body: PostAddressUserResponse, thunkAPI) => {
    try {
      const res = await auth.postAddressWithUser(body);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const putAddressWithUserAction = createAsyncThunk(
  'auth/putAddressWithUser',
  async (body: GetAddressUserResponse, thunkAPI) => {
    try {
      const res = await auth.putAddressWithUser(body);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const getDetailAddressWithUserAction = createAsyncThunk(
  'auth/getDetailAddressWithUser',
  async (id: string, thunkAPI) => {
    try {
      const res = await auth.getDetailAddressWithUser(id);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const getInfoMyAccountAction = createAsyncThunk('auth/getInfoMyAccount', async (_, thunkAPI) => {
  try {
    const res = await auth.getInfoMyAccount();
    return res;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const patchAddressDefaultAction = createAsyncThunk(
  'auth/patchAddressDefault',
  async (id: string, thunkAPI) => {
    try {
      const res = await auth.patchAddressDefault(id);
      return { ...res, id };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const deleteAddressWithUserAction = createAsyncThunk(
  'auth/deleteAddressWithUser',
  async (id: string, thunkAPI) => {
    try {
      const res = await auth.deleteAddressWithUser(id);
      return { ...res, id };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const doSendMailForgotPasswordAction = createAsyncThunk(
  'auth/doSendMailForgotPassword',
  async (email: string, thunkAPI) => {
    try {
      const res = await auth.doSendMailForgotPassword(email);
      return { ...res, email };
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);

const verifyTokenForgotPasswordAction = createAsyncThunk(
  'auth/verifyTokenForgotPassword',
  async (token: string, thunkAPI) => {
    try {
      const res = await auth.verifyTokenForgotPassword(token);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);

const resetPasswordWithTokenAction = createAsyncThunk(
  'auth/resetPasswordWithToken',
  async (token: ResetPasswordWithToken, thunkAPI) => {
    try {
      const res = await auth.resetPasswordWithToken(token);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);

const getUserInfoAction = createAsyncThunk('auth/getUserInfoAction', async (_, thunkApi) => {
  try {
    const res = await auth.getUserInfo();
    return res;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.message });
  }
});

const patchUserInfoAction = createAsyncThunk(
  'auth/patchUserInfo',
  async (params: UpdateProfile, thunkApi) => {
    try {
      const res = await auth.patchUserInfo(params);
      return res;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const loginWithGoogleAction = createAsyncThunk(
  'auth/loginWithGoogle',
  async (params: ParamLoginWithSocial, thunkApi) => {
    try {
      const res = await auth.loginWithGoogle(params);
      return res;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const loginWithFacebookAction = createAsyncThunk(
  'auth/loginWithFacebook',
  async (params: ParamLoginWithSocial, thunkApi) => {
    try {
      const res = await auth.loginWithFacebook(params);
      return res;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export {
  loginAction,
  registerAction,
  resetPasswordByEmailAction,
  putProfileAccountAction,
  getAllAddressWithUserAction,
  postAddressWithUserAction,
  putAddressWithUserAction,
  getDetailAddressWithUserAction,
  getInfoMyAccountAction,
  patchAddressDefaultAction,
  deleteAddressWithUserAction,
  doSendMailForgotPasswordAction,
  verifyTokenForgotPasswordAction,
  resetPasswordWithTokenAction,
  getUserInfoAction,
  patchUserInfoAction,
  loginWithFacebookAction,
  loginWithGoogleAction,
};
