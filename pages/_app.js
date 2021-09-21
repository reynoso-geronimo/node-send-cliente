import AuthState from "../context/auth/authState";
import React from 'react';

const MyApp = ({Component, pageProps}) => {
    return ( 
    <AuthState>
        <Component {...pageProps}/>
    </AuthState> 
    );
}
 
export default MyApp;