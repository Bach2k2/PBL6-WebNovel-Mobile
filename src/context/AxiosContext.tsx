import React, { createContext, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { AuthContext } from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';
import { axiosInstance } from '../hook/AxiosInstance';
const AxiosContext = createContext(
  {
    authAxios: axiosInstance,
    publicAxios: axiosInstance
  }
);
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }: any) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: 'https://webnovelapi.azurewebsites.net/api',
  });

  const publicAxios = axios.create({
    baseURL: 'https://webnovelapi.azurewebsites.net/api',
  });

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = (failedRequest: AxiosError) => {
    const data = {
      refreshToken: authContext.authState.refreshToken,
    };

    const options = {
      method: 'POST',
      data,
      url: 'https://webnovelapi.azurewebsites.net/api/auth/login/refresh-token',
    };

    return axios(options)
      .then(async tokenRefreshResponse => {
        failedRequest.response!.config.headers.Authorization =
          'Bearer ' + tokenRefreshResponse.data.accessToken;

        authContext.setAuthState({
          ...authContext.authState,
          accessToken: tokenRefreshResponse.data.accessToken,
        });

        await Keychain.setGenericPassword(
          'token',
          JSON.stringify({
            accessToken: tokenRefreshResponse.data.accessToken,
            refreshToken: authContext.authState.refreshToken,
          }),
        );

        return Promise.resolve();
      })
      .catch(e => {
        authContext.setAuthState({
          accessToken: null,
          refreshToken: null,
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  // const jwt_payload = {
  //   "nameidentifier": "",
  //   "emailaddress": "",
  //   "exp": null,
  //   "iss": null,
  //   "aud": "",
  // }

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export { AxiosContext, AxiosProvider };