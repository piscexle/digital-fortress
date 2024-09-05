import { instanceAxios } from '@/config/axios';
import omit from 'lodash/omit';
import {
  GetAddressUserResponse,
  LoginResponse,
  ParamLogin,
  ParamLoginWithSocial,
  ParamRegister,
  PostAddressUserResponse,
  ProfileAccountModel,
  ResetPasswordModel,
  ResetPasswordWithToken,
  UpdateProfile,
  UserPayloadAction,
} from './auth.type';

const auth = {
  login({ email, password }: ParamLogin): Promise<LoginResponse> {
    const url = '/auth/login';
    return instanceAxios.post(url, {
      email,
      password,
    });
  },

  registerUser(params: ParamRegister): Promise<LoginResponse> {
    const url = '/auth/register';
    return instanceAxios.post(url, params);
  },

  resetPasswordByEmail(data: ResetPasswordModel): Promise<LoginResponse> {
    const url = '/auth/reset-password';
    return instanceAxios.put(url, data);
  },

  putProfileAccount(data: ProfileAccountModel): Promise<any> {
    const url = '/auth/profile';
    return instanceAxios.put(url, data);
  },

  getAllAddressWithUser(): Promise<GetAddressUserResponse[]> {
    const url = '/auth/address';
    return instanceAxios.get(url);
  },

  getDetailAddressWithUser(id: string): Promise<GetAddressUserResponse> {
    const url = `/auth/${id}/single-address`;
    return instanceAxios.get(url);
  },

  postAddressWithUser(body: PostAddressUserResponse): Promise<GetAddressUserResponse> {
    const url = '/auth/address';
    return instanceAxios.post(url, body);
  },

  putAddressWithUser(body: GetAddressUserResponse): Promise<GetAddressUserResponse> {
    const url = `/auth/${body.id}/address`;
    return instanceAxios.put(url, omit(body, 'id'));
  },

  getInfoMyAccount(): Promise<UserPayloadAction> {
    const url = `/v1/auth/me`;
    return instanceAxios.get(url);
  },

  patchAddressDefault(id: string): Promise<GetAddressUserResponse> {
    const url = `/auth/${id}/address/is-default`;
    return instanceAxios.patch(url);
  },

  deleteAddressWithUser(id: string): Promise<GetAddressUserResponse> {
    const url = `/auth/${id}/address`;
    return instanceAxios.delete(url);
  },

  doSendMailForgotPassword(email: string): Promise<{ messageCode: string }> {
    const url = `/auth/forgot-password/otp/${encodeURIComponent(email)}`;
    return instanceAxios.get(url);
  },

  verifyTokenForgotPassword(token: string): Promise<any> {
    const url = `/auth/forgot-password/token/verify`;
    return instanceAxios.post(url, { token });
  },

  resetPasswordWithToken(token: ResetPasswordWithToken): Promise<any> {
    const url = `/auth/forgot-password/reset-with-token`;
    return instanceAxios.put(url, token);
  },

  getUserInfo(): Promise<UserPayloadAction> {
    const url = '/v1/auth/me';
    return instanceAxios.get(url);
  },

  patchUserInfo(data: UpdateProfile): Promise<any> {
    const url = '/auth/profile';
    return instanceAxios.put(url, data);
  },

  loginWithGoogle(body: ParamLoginWithSocial): Promise<any> {
    const url = '/auth/login/user/google';
    return instanceAxios.post(url, body);
  },

  loginWithFacebook(body: ParamLoginWithSocial): Promise<any> {
    const url = '/auth/login/user/facebook';
    return instanceAxios.post(url, body);
  },
};

export default auth;
