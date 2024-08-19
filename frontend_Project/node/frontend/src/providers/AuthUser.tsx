import React, { useEffect, useLayoutEffect, useState } from "react";
import { User } from "../types/User";

export type AuthUserContextType = {
    isUserLoading: boolean;
    isLogin: boolean;
    user: User | null;
    token: String | null;
    signin: (user:User, token:String | null, callback:() => void) => void;
    signout: (callback:() => void) => void;
}

const AuthUserContext = React.createContext<AuthUserContextType>({} as AuthUserContextType);

export const useAuthUserContext = ():AuthUserContextType => {
    return React.useContext<AuthUserContextType>(AuthUserContext);
}

type Props = {
    children: React.ReactNode
  }

export const AuthUserProvider = (props: Props) => {
    const [isUserLoading, setIsUserLoding] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState<User|null>(null);
    const [token, setToken] = React.useState<String | null>(null);

    useLayoutEffect(()=>{
        const savedUserId = localStorage.getItem('userId');
        // TODO: userIdからUser情報を取得する
        const savedUserName = localStorage.getItem('userName');
        const savedUserRole = localStorage.getItem('userRole');
        const savedToken = localStorage.getItem('token');
        if(!!savedToken){
            setIsLogin(true);
            setUser({id:Number(savedUserId), name:savedUserName||'default name', role:'user'});
            setToken(savedToken);
        }
        setIsUserLoding(false);
    },[]);

    const signin = (newUser: User,token: String | null, callback: () => void) => {
      setIsLogin(true);
      setUser(newUser);
      setToken(token);
      localStorage.setItem('userId', String(newUser.id));
      localStorage.setItem('userName', newUser.name);
      localStorage.setItem('userRole', newUser.role);
      localStorage.setItem('token', token?.toString()||'');
      callback();
    }

    const signout = (callback: () => void) => {
      setIsLogin(false);
      setUser(null);
      setToken(null);
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
      localStorage.removeItem('token');
      callback();
    }


    const value:AuthUserContextType = {isUserLoading, isLogin, user, token, signin, signout };
    return (
      <AuthUserContext.Provider value={value}>
        {props.children}
      </AuthUserContext.Provider>
    );
}