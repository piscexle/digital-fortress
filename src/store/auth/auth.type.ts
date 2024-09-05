import { AxiosResponse } from 'axios';

export interface FormAddressType {
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  street: string;
  zipCode: string;
  district?: string;
  ward?: string;
}

export interface ProfileAccountModel {
  firstName: string;
  lastName: string;
  avatar?: string;
  national?: {
    id: string;
    zipCode: string;
    name: string;
  };
  phoneNumber: string;
}

export interface GetAddressUserResponse {
  id: string;
  fullName: string;
  city: string;
  street: string;
  phoneNumber: string;
  zipCode: string;
  isDefault?: boolean;
  email?: string;
  district?: string;
  ward?: string;
}

export interface PostAddressUserResponse extends Omit<GetAddressUserResponse, 'id'> {}

export type ParamLogin = {
  email: string;
  password: string;
  type?: string;
};

export type ParamRegister = {
  gender: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginResponse = AxiosResponse<{
  data: {
    token: {
      expiresIn: number;
      accessToken: string;
      refreshToken: string;
    };
    user: {
      id: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
      role: string;
      email: string;
      firstName: string | null;
      lastName: string | null;
      avatar: string;
      phoneNumber: string;
    };
  };
  error?: string;
}>;

export interface AuthState {
  user: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    role: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    avatar: string;
    phoneNumber: string;
  };
  token: {
    expiresIn: number;
    accessToken: string;
    refreshToken: string;
  };
  error: string;
  loading: boolean;
  isModalAuthVisible: boolean;
  myAddress: {
    loading: boolean;
    data: GetAddressUserResponse[];
  };
  myDetailAddress: {
    loading: boolean;
    data: GetAddressUserResponse;
  };
  infoOrderPayment: {
    infoAddress: FormAddressType;
    infoShipping: any;
  };
  typeLogin: string;
}

export interface ResetPasswordModel {
  email: string;
  newPassword: string;
  oldPassword: string;
}

export type TokenPayloadAction = { expiresIn: number; accessToken: string; refreshToken: string };

export type UserPayloadAction = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  role: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string;
  phoneNumber: string;
};

export interface ResetPasswordWithToken {
  newPassword: string;
  token: string;
}

export interface UpdateProfile {
  address?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  avatar?: string;
  phoneNumber?: string | null;
  provinces?: string;
  districts?: string;
  ward?: string;
}

export interface ParamLoginWithSocial {
  gender: string;
  socialToken: string;
  fullName: string;
  email: string;
}
