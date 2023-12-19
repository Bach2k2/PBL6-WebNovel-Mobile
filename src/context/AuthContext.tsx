import React, { createContext, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { jwtDecode } from "jwt-decode"
import { JwtPayload } from "jwt-decode"
// const AuthContext = createContext('AuthContext');
import { User } from '../models/User';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const AuthContext = createContext({
  authState: {
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  },
  getUserData: () => null as User | null,
  setUserData: (userData: User | null) => { },
  getAccessToken: () => null,
  setAuthState: (authData: any) => { },
  logout: async () => { },
});
// const { Provider } = AuthContext;

const AuthProvider = ({ children }: any) => {

  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
    userData: null as User | null,
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
      userData: null,
    });
    if (await GoogleSignin.isSignedIn() === true)
      await GoogleSignin.signOut();
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const setUserData = async (userData: User | null) => {
    // await Keychain.resetGenericPassword();
    setAuthState((prevState) => ({
      ...prevState,
      userData: userData,
    }));
  };

  const getUserData = (): User | null => {
    return authState.userData;
  };



  return (
    <AuthContext.Provider value={{
      authState,
      getUserData,
      setUserData,
      getAccessToken,
      setAuthState,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export { AuthContext, AuthProvider };