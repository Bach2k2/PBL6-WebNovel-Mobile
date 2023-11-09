import React, { createContext, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { jwtDecode } from "jwt-decode"
import { JwtPayload } from "jwt-decode"
// const AuthContext = createContext('AuthContext');
import { User } from '../models/User';
const AuthContext = createContext({
  authState: {
    accessToken: null,
    refreshToken: null,
    authenticated: false,
  },
  getUserData: () => null,
  setUserData: (userData: any) => { },
  getAccessToken: () => null,
  setAuthState: (authData: any) => { },
  logout: async () => { },
});
const { Provider } = AuthContext;

const AuthProvider = ({ children }: any) => {
  // const [test,setTest]= useState('Test Value');
  // const [isLoading,setIsLoading]= useState(true);
  // const [accessToken,setAccessToken]= useState(null);


  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
    userData: null,
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
      userData: null,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const setUserData = async (userData: any) => {
    // await Keychain.resetGenericPassword();
    setAuthState((prevState) => ({
      ...prevState,
      userData: userData,
    }));
  };

  const getUserData = ():any => {
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