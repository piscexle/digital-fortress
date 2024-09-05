import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  deleteAddressWithUserAction,
  getAllAddressWithUserAction,
  getDetailAddressWithUserAction,
  getInfoMyAccountAction,
  getUserInfoAction,
  loginAction,
  loginWithFacebookAction,
  loginWithGoogleAction,
  patchAddressDefaultAction,
  patchUserInfoAction,
  postAddressWithUserAction,
  putAddressWithUserAction,
  putProfileAccountAction,
  registerAction,
} from './auth.action';
import {
  AuthState,
  FormAddressType,
  GetAddressUserResponse,
  TokenPayloadAction,
  UserPayloadAction,
} from './auth.type';

const initialState: AuthState = {
  user: {
    id: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
    role: '',
    email: '',
    firstName: null,
    lastName: null,
    avatar: '',
    phoneNumber: '',
  },
  token: {
    expiresIn: 0,
    accessToken: '',
    refreshToken: '',
  },
  error: '',
  loading: false,
  isModalAuthVisible: false,
  myAddress: {
    loading: false,
    data: [] as GetAddressUserResponse[],
  },
  myDetailAddress: {
    loading: false,
    data: {} as GetAddressUserResponse,
  },
  infoOrderPayment: {
    infoAddress: {} as FormAddressType,
    infoShipping: '',
  },
  typeLogin: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuth: (state: AuthState, action: PayloadAction<UserPayloadAction>) => ({
      ...state,
      user: action.payload,
    }),
    setTokenAuth: (state: AuthState, action: PayloadAction<TokenPayloadAction>) => ({
      ...state,
      token: action.payload,
    }),
    setErrorAuth: (state: AuthState, action: any) => ({
      ...state,
      error: action.payload,
    }),
    setIsModalAuthVisible: (state: AuthState, action: PayloadAction<boolean>) => ({
      ...state,
      isModalAuthVisible: action.payload,
    }),
    setInfoAddress: (state: AuthState, action: PayloadAction<FormAddressType>) => ({
      ...state,
      infoOrderPayment: {
        ...state.infoOrderPayment,
        infoAddress: action.payload,
      },
    }),
    setInfoShipping: (state: AuthState, action: PayloadAction<any>) => ({
      ...state,
      infoOrderPayment: {
        ...state.infoOrderPayment,
        infoShipping: action.payload,
      },
    }),
    setTypeLogin: (state: AuthState, action: PayloadAction<any>) => ({
      ...state,
      typeLogin: action.payload,
    }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state: AuthState) => ({
        ...state,
        token: {
          expiresIn: 0,
          accessToken: '',
          refreshToken: '',
        },
        user: {
          id: '',
          createdAt: '',
          updatedAt: '',
          deletedAt: null,
          role: '',
          email: '',
          firstName: null,
          lastName: null,
          avatar: '',
          phoneNumber: '',
        },
        error: '',
        loading: true,
      }))
      .addCase(loginAction.fulfilled, (state: AuthState, action: any) => {
        const { data } = action.payload;
        // khi đăng nhập thành công thì lưu vào local ở dạng string
        localStorage.setItem(
          'persist:auth-digital-fortress',
          JSON.stringify({
            token: data.token,
            user: data.user,
          })
        );

        // return tự động đồng bộ persist auth ở dạng json object
        return {
          ...state,
          token: data.token,
          user: data.user,
          error: '',
          loading: false,
        };
      })
      .addCase(loginAction.rejected, (state: AuthState, action: any) => {
        const { error } = action.payload || { error: 'error' };
        return {
          ...state,
          token: {
            expiresIn: 0,
            accessToken: '',
            refreshToken: '',
          },
          user: {
            id: '',
            createdAt: '',
            updatedAt: '',
            deletedAt: null,
            role: '',
            email: '',
            firstName: null,
            lastName: null,
            avatar: '',
            phoneNumber: '',
          },
          error,
          loading: false,
        };
      })

      // ---------------
      .addCase(registerAction.pending, (state: AuthState) => ({
        ...state,
        token: {
          expiresIn: 0,
          accessToken: '',
          refreshToken: '',
        },
        user: {
          id: '',
          createdAt: '',
          updatedAt: '',
          deletedAt: null,
          role: '',
          email: '',
          firstName: null,
          lastName: null,
          avatar: '',
          phoneNumber: '',
        },
        error: '',
        loading: true,
      }))
      .addCase(registerAction.fulfilled, (state: AuthState, action: any) => {
        const { data } = action.payload;
        localStorage.setItem(
          'persist:auth-digital-fortress',
          JSON.stringify({
            token: data.token,
            user: data.user,
          })
        );
        return {
          ...state,
          token: {
            ...data.token,
          },
          user: {
            ...data.user,
          },
          error: '',
          loading: false,
        };
      })
      .addCase(registerAction.rejected, (state: AuthState) =>
        // const { error } = action.payload;
        ({
          ...state,
          token: {
            expiresIn: 0,
            accessToken: '',
            refreshToken: '',
          },
          user: {
            id: '',
            createdAt: '',
            updatedAt: '',
            deletedAt: null,
            role: '',
            email: '',
            firstName: null,
            lastName: null,
            avatar: '',
            phoneNumber: '',
          },
          error: '',
          loading: false,
        })
      )

      // ---------------
      .addCase(putProfileAccountAction.pending, (state: AuthState) => ({
        ...state,
        loading: true,
      }))
      .addCase(putProfileAccountAction.fulfilled, (state: AuthState) => ({
        ...state,
        error: '',
        loading: false,
      }))
      .addCase(putProfileAccountAction.rejected, (state: AuthState) => ({
        ...state,
        error: '',
        loading: false,
      }))

      // ---------------
      .addCase(getAllAddressWithUserAction.pending, (state: AuthState) => ({
        ...state,
        myAddress: {
          ...state.myAddress,
          loading: true,
        },
      }))
      .addCase(getAllAddressWithUserAction.fulfilled, (state: AuthState, action: any) => {
        const { data } = action.payload;
        return {
          ...state,
          myAddress: {
            data,
            loading: false,
          },
        };
      })
      .addCase(getAllAddressWithUserAction.rejected, (state: AuthState) => ({
        ...state,
        myAddress: {
          ...state.myAddress,
          loading: false,
        },
      }))

      // ---------------
      .addCase(getDetailAddressWithUserAction.pending, (state: AuthState) => ({
        ...state,
        myDetailAddress: {
          ...state.myDetailAddress,
          loading: true,
        },
      }))
      .addCase(getDetailAddressWithUserAction.fulfilled, (state: AuthState, action: any) => {
        const { data } = action.payload;
        return {
          ...state,
          myDetailAddress: {
            data,
            loading: false,
          },
        };
      })
      .addCase(getDetailAddressWithUserAction.rejected, (state: AuthState) => ({
        ...state,
        myDetailAddress: {
          ...state.myDetailAddress,
          loading: false,
        },
      }))

      // ---------------
      .addCase(postAddressWithUserAction.pending, (state: AuthState) => ({
        ...state,
        myAddress: {
          ...state.myAddress,
          loading: true,
        },
      }))
      .addCase(postAddressWithUserAction.fulfilled, (state: AuthState, action: any) => {
        const { data } = action.payload;
        return {
          ...state,
          myAddress: {
            data: [data, ...state.myAddress.data],
            loading: false,
          },
        };
      })
      .addCase(postAddressWithUserAction.rejected, (state: AuthState) => ({
        ...state,
        myAddress: {
          ...state.myAddress,
          loading: false,
        },
      }))

      // ---------------
      .addCase(putAddressWithUserAction.pending, (state: AuthState) => ({
        ...state,
        myAddress: {
          ...state.myAddress,
          loading: true,
        },
      }))
      .addCase(putAddressWithUserAction.fulfilled, (state: AuthState, action: any) => {
        const { data } = action.payload;

        const newAddress = state.myAddress.data.map((item) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        });
        return {
          ...state,
          myAddress: {
            data: newAddress,
            loading: false,
          },
        };
      })
      .addCase(putAddressWithUserAction.rejected, (state: AuthState) => ({
        ...state,
        myAddress: {
          ...state.myAddress,
          loading: false,
        },
      }))

      // ---------------
      .addCase(patchAddressDefaultAction.pending, (state: AuthState) => ({
        ...state,
        myAddress: {
          ...state.myAddress,
          loading: true,
        },
      }))
      .addCase(patchAddressDefaultAction.fulfilled, (state: AuthState, action: any) => {
        const { id } = action.payload;
        const newAddress = state.myAddress.data.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isDefault: true,
            };
          }
          return {
            ...item,
            isDefault: false,
          };
        });
        return {
          ...state,
          myAddress: {
            data: newAddress,
            loading: false,
          },
        };
      })
      .addCase(patchAddressDefaultAction.rejected, (state: AuthState) => ({
        ...state,
        myAddress: {
          ...state.myAddress,
          loading: false,
        },
      }))

      // ---------------
      .addCase(deleteAddressWithUserAction.pending, (state: AuthState) => ({
        ...state,
        myAddress: {
          ...state.myAddress,
          loading: true,
        },
      }))
      .addCase(deleteAddressWithUserAction.fulfilled, (state: AuthState, action: any) => {
        const { id } = action.payload;
        const newAddress = state.myAddress.data.filter((item) => item.id !== id);
        return {
          ...state,
          myAddress: {
            data: newAddress,
            loading: false,
          },
        };
      })
      .addCase(deleteAddressWithUserAction.rejected, (state: AuthState) => ({
        ...state,
        myAddress: {
          ...state.myAddress,
          loading: false,
        },
      }))

      // ---------------
      .addCase(getInfoMyAccountAction.pending, (state: AuthState) => ({
        ...state,
        user: {
          ...state.user,
          loading: false,
        },
      }))
      .addCase(getInfoMyAccountAction.fulfilled, (state: AuthState, action: any) => {
        const { data } = action.payload;
        const newData = {
          firstName: data.firstName,
          lastName: data.lastName,
          avatar: data.avatar,
          phoneNumber: data.phoneNumber,
        };
        return {
          ...state,
          user: {
            ...state.user,
            ...newData,
            loading: false,
          },
        };
      })
      .addCase(getInfoMyAccountAction.rejected, (state: AuthState) => ({
        ...state,
        user: {
          ...state.user,
          loading: false,
        },
      }));

    // -------------------
    builder
      .addCase(getUserInfoAction.pending, (state: AuthState) => ({
        ...state,
        loading: true,
      }))
      .addCase(getUserInfoAction.fulfilled, (state: AuthState, action: any) => {
        const { data } = action.payload;
        return {
          ...state,
          user: data,
          loading: false,
        };
      })
      .addCase(getUserInfoAction.rejected, (state: AuthState, action: any) => {
        const { error } = action.payload;
        return {
          ...state,
          error,
          loading: false,
        };
      });

    // -------------------
    builder
      .addCase(patchUserInfoAction.pending, (state: AuthState) => ({
        ...state,
        user: {
          ...state.user,
          loading: true,
        },
      }))
      .addCase(patchUserInfoAction.fulfilled, (state: AuthState) => ({
        ...state,
        loading: false,
      }))
      .addCase(patchUserInfoAction.rejected, (state: AuthState, action: any) => {
        const { error } = action.payload;
        return {
          ...state,
          error,
          loading: false,
        };
      });

    // -------------------
    builder
      .addCase(loginWithGoogleAction.pending, (state: AuthState) => ({
        ...state,
        token: {
          expiresIn: 0,
          accessToken: '',
          refreshToken: '',
        },
        user: {
          id: '',
          createdAt: '',
          updatedAt: '',
          deletedAt: null,
          role: '',
          email: '',
          firstName: null,
          lastName: null,
          avatar: '',
          phoneNumber: '',
        },
        error: '',
        loading: true,
      }))
      .addCase(loginWithGoogleAction.fulfilled, (state: AuthState, action: any) => {
        const { data } = action.payload;
        console.log('data.token: ', data.token);
        // khi đăng nhập thành công thì lưu vào local ở dạng string
        localStorage.setItem(
          'persist:auth-digital-fortress',
          JSON.stringify({
            token: data.token,
            user: data.user,
          })
        );

        // return tự động đồng bộ persist auth ở dạng json object
        return {
          ...state,
          token: data.token,
          user: data.user,
          error: '',
          loading: false,
        };
      })
      .addCase(loginWithGoogleAction.rejected, (state: AuthState, action: any) => {
        const { error } = action.payload || { error: 'error' };
        return {
          ...state,
          token: {
            expiresIn: 0,
            accessToken: '',
            refreshToken: '',
          },
          user: {
            id: '',
            createdAt: '',
            updatedAt: '',
            deletedAt: null,
            role: '',
            email: '',
            firstName: null,
            lastName: null,
            avatar: '',
            phoneNumber: '',
          },
          error,
          loading: false,
        };
      });
    // -------------------
    builder
      .addCase(loginWithFacebookAction.pending, (state: AuthState) => ({
        ...state,
        token: {
          expiresIn: 0,
          accessToken: '',
          refreshToken: '',
        },
        user: {
          id: '',
          createdAt: '',
          updatedAt: '',
          deletedAt: null,
          role: '',
          email: '',
          firstName: null,
          lastName: null,
          avatar: '',
          phoneNumber: '',
        },
        error: '',
        loading: true,
      }))
      .addCase(loginWithFacebookAction.fulfilled, (state: AuthState, action: any) => {
        const { data } = action.payload;
        // khi đăng nhập thành công thì lưu vào local ở dạng string
        localStorage.setItem(
          'persist:auth-digital-fortress',
          JSON.stringify({
            token: data.token,
            user: data.user,
          })
        );

        // return tự động đồng bộ persist auth ở dạng json object
        return {
          ...state,
          token: data.token,
          user: data.user,
          error: '',
          loading: false,
        };
      })
      .addCase(loginWithFacebookAction.rejected, (state: AuthState, action: any) => {
        const { error } = action.payload || { error: 'error' };
        return {
          ...state,
          token: {
            expiresIn: 0,
            accessToken: '',
            refreshToken: '',
          },
          user: {
            id: '',
            createdAt: '',
            updatedAt: '',
            deletedAt: null,
            role: '',
            email: '',
            firstName: null,
            lastName: null,
            avatar: '',
            phoneNumber: '',
          },
          error,
          loading: false,
        };
      });
  },
});

export const {
  setTokenAuth,
  setUserAuth,
  setErrorAuth,
  setIsModalAuthVisible,
  setInfoAddress,
  setInfoShipping,
  setTypeLogin,
} = authSlice.actions;

export default authSlice.reducer;
