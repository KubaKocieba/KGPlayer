import React, { useContext, useEffect, useState } from 'react';
import { AxiosRequestConfig } from "axios";

import './App.scss';

import Login from "./components/login/login";
import Main from "./components/main/main";
import AppContext from "./app-context";
import axiosInstance from './endpoints/axios-instance-config';
import { Splash } from "./components/splash/splash";

function App() {
  const { authorized } = useContext(AppContext);
  const [ isAuthorized, authorize ] = useState(authorized);
  const [ finishedLoading, isLoadingDone ] = useState(false);

  const addTokenToRequest = (config: AxiosRequestConfig) => {
      if (authorized) {
        config.headers.Authorization = 'Bearer ' + authorized;
      }
      return config;
  }

    if (!!authorized) {
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
      <AppContext.Provider value={{ authorized: isAuthorized, authorize, loading: !finishedLoading, loadingIsDone: isLoadingDone }}>
        <div className="App">
            <Splash />
            <AppContext.Consumer>
             { ({ authorized}) => authorized ? <Main /> : <Login /> }
            </AppContext.Consumer>
        </div>
      </AppContext.Provider>
  );
}

export default App;
