import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

// url nào không nằm trong array thì sẽ refresh token
const routerNotRefreshed = ['reset-password', '/auth/dashboard', '/favorites/me/only-product-id'];

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const instanceAxios: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instanceAxios.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('persist:auth-digital-fortress-fe') ?? '';

  // khi đăng nhập thì userInfo có kiểu string, những lần sau sẽ là object json
  let persist;
  let tokenInfo;

  if (userInfo) {
    persist = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
    tokenInfo = typeof persist.token === 'object' ? persist.token : JSON.parse(persist.token);
  } else {
    persist = {};
    tokenInfo = {};
  }
  if (tokenInfo.accessToken) {
    const modifiedConfig = { ...config };
    modifiedConfig.headers.Authorization = `Bearer ${tokenInfo.accessToken}`;
    return modifiedConfig;
  }

  return config;
});

function handleTokenError() {
  const currentURL = new URL(window.location.href);
  localStorage.setItem(
    'persist:auth-digital-fortress-fe',
    JSON.stringify({
      token: '',
      user: '',
    })
  );
  if (currentURL.pathname.includes('admin')) {
    window.location.href = `${currentURL.origin}/admin/dashboard`;
  } else {
    window.location.href = `${currentURL.origin}`;
  }
}

instanceAxios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;

    // const userInfo = localStorage.getItem('persist:auth-digital-fortress-fe') ?? '';
    // const persist = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;

    const persistString = localStorage.getItem('persist:auth-digital-fortress-fe');
    const persist = persistString ? JSON.parse(persistString) : null;

    if (!persist || !persist.token) {
      // Handle case where no token is found in local storage
      handleTokenError();
      return Promise.reject(error);
    }

    const tokenInfo = typeof persist.token === 'object' ? persist.token : JSON.parse(persist.token);

    console.log('originalRequest.url: ', originalRequest.url);
    // khi api bị lỗi 401
    if (
      error.response?.status === 401 &&
      !routerNotRefreshed.includes(originalRequest.url as string)
    ) {
      // kiểm tra có accessToken hoặc refreshToken khong
      if (!tokenInfo?.refreshToken || !tokenInfo?.accessToken) {
        handleTokenError();
      }
      const decodedRefreshToken =
        tokenInfo?.refreshToken && jwtDecode(tokenInfo?.refreshToken || '');
      // nếu refreshToken hết hạn thì đăng nhập lại
      if (decodedRefreshToken.exp! * 1000 < new Date().getTime()) {
        handleTokenError();
      }
      const headersWithRefreshToken = {
        refreshToken: `${tokenInfo.refreshToken}`,
      };
      if (!routerNotRefreshed.includes(originalRequest.url as string)) {
        return axios
          .post(`${baseURL}auth/refresh-token`, null, { headers: headersWithRefreshToken })
          .then((response) => {
            localStorage.setItem(
              'persist:auth-digital-fortress-fe',
              JSON.stringify({
                token: response.data.data,
                user: persist.user,
              })
            );

            return instanceAxios(originalRequest);
          })
          .catch((err) => {
            console.log('err axios: ', err);
            // khi user đã đăng nhập và bị xoá tài khoản
            if (err?.response?.data?.message === 'USER_NOT_FOUND') {
              handleTokenError();
            } else {
              handleTokenError();
            }
            return Promise.reject(err);
          })
          .finally(() => {});
      }
    }
    return Promise.reject(error);
  }
);
