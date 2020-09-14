import React, { useContext, useState } from 'react';
import { AxiosRequestConfig } from "axios";

import './App.scss';

import Login from "./components/login/login";
import Main from "./components/main/main";
import AppContext from "./app-context";
import axiosInstance from './endpoints/axios-instance-config';
import { Splash } from "./components/splash/splash";

function App() {
  const { token } = useContext(AppContext);
  const [ currentToken, setToken ] = useState(token);
  const [ finishedLoading, isLoadingDone ] = useState(false);

  const addTokenToRequest = (config: AxiosRequestConfig) => {
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
  }

    if (!!token) {
        axiosInstance.interceptors.request.use(addTokenToRequest)
    }

    axiosInstance.interceptors.request.use((config) => {
        isLoadingDone(false);
        return config;
    });

    axiosInstance.interceptors.response.use((config) => {
        isLoadingDone(true);
        return config;
    }, (error) => {
        isLoadingDone(true);
    });

  return (
      <AppContext.Provider value={{ token: currentToken, setToken, loading: !finishedLoading, loadingIsDone: isLoadingDone }}>
        <div className="App">
            <Splash />
            <AppContext.Consumer>
             { ({ token}) => token ? <Main /> : <Login /> }
            </AppContext.Consumer>
        </div>
      </AppContext.Provider>
  );
}

export default App;
