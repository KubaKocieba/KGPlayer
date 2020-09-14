import AccountCircle from '@material-ui/icons/AccountCircle';
import { AxiosResponse } from "axios";
import { Button, TextField, InputAdornment } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { motion } from "framer-motion"
import React, { useContext, useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from "@material-ui/icons";

import './login.scss';

import AppContext from "../../app-context";
import axiosInstance from '../../endpoints/axios-instance-config';
import { ENDPOINTS } from "../../endpoints/endpoints";
import { LoginResponse } from "../../interfaces/login.interfaces";
import { Splash } from "../splash/splash";
import Notification from "../notification/notification";

const Login: React.FC = () => {
    const { URL, CONFIG } = ENDPOINTS.AUTH;
    const [usr, newUsr] = useState('');
    const [pwd, newPwd] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPwd, toggleShowPwd] = useState(false);
    const handleMouseDownPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
    };
    const { setToken, loadingIsDone } = useContext(AppContext);

    const handleSplashFormSubmit = (event: any) => {
      event.preventDefault();

      axiosInstance.post(URL.SIGNIN, {}, CONFIG).then(({ data }: AxiosResponse<LoginResponse>) => {
            const { Result } = data;
            const { Token } = Result.AuthorizationToken;
            window.sessionStorage.setItem('authToken', Token);
            setToken(Token);
      }).catch((error) => {
          console.log(error);
          setErrorMessage("Something went wrong with logging in");
      })
    };

    useEffect(() => {
       return loadingIsDone(true);
    },[]);

    return (
        <>
            <Notification severity={'error'} message={errorMessage} setMessage={setErrorMessage} />
            <Splash />
            <div className="Login">
                <motion.img animate={{ rotate: 360 }}
                     transition={{ duration: 1 }}
                     src="kg_logo.png"
                     alt="Kocia Gęba Player" />
                <form onSubmit={handleSplashFormSubmit}>
                    <div className="InputDiv">
                    <TextField label="WHO ARE YOU?" id="usrInput"
                               variant="filled"
                               color="secondary"
                               type="text"
                               fullWidth={true}
                               required={true}
                               value={usr}
                               InputProps={{
                                   endAdornment: (
                                       <InputAdornment position="end">
                                           <AccountCircle />
                                       </InputAdornment>
                                   ),
                               }}
                               onChange={event => newUsr(event.target.value)}/>
                    </div>
                    <div className="InputDiv">
                    <TextField id="pwdInput"
                               variant="filled"
                               color="secondary"
                               label="TELL ME YOUR SECRET"
                               type={showPwd ? 'text' : 'password'}
                               fullWidth={true}
                               required={true}
                               value={pwd}
                               InputProps={{
                                   endAdornment: (
                                       <InputAdornment position="end">
                                           <IconButton
                                               aria-label="toggle password visibility"
                                               onClick={() => toggleShowPwd(!showPwd)}
                                               onMouseDown={() => handleMouseDownPassword}
                                           >
                                           { showPwd ? <Visibility /> : <VisibilityOff/> }
                                           </IconButton>
                                       </InputAdornment>
                                   ),
                               }}
                               onChange={event=> newPwd(event.target.value)}/>
                    </div>
                    <div>
                            <Button variant="outlined"
                                    color="secondary"
                                    type="submit" >GO!
                            </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;