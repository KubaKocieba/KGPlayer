import React from "react";

const AppContext = React.createContext({
        authorized: window.sessionStorage.getItem('authToken') || false,
        authorize: (value: string | boolean) => {},
        loading: true,
        loadingIsDone: (value: boolean) => {}
});

export default AppContext;