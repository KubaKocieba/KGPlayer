import React from "react";

const AppContext = React.createContext({
        token: window.sessionStorage.getItem('authToken') || false,
        setToken: (value: string | boolean) => {},
        loading: true,
        loadingIsDone: (value: boolean) => {}
});

export default AppContext;