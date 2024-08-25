import React, { useEffect, useState } from "react";
import { User } from "../types/User";
import { getUser } from "../functions/getUser";

export type AuthUserContextType = {
    isUserLoading: boolean;
    isLogin: boolean;
    user: User | null;
    token: String | null;
    signin: (user:User, token:String | null, callback:() => void) => void;
    signout: (callback:() => void) => void;
	fetchUser: ()=>void;
}

const AuthUserContext = React.createContext<AuthUserContextType>({} as AuthUserContextType);

export const useAuthUserContext = ():AuthUserContextType => {
    return React.useContext<AuthUserContextType>(AuthUserContext);
}

type Props = {
    children: React.ReactNode
}

export const AuthUserProvider = (props: Props) => {
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState<User|null>(null);
    const [token, setToken] = React.useState<String | null>(null);

    useEffect(()=>{
        const savedUserId = sessionStorage.getItem('userId');
        const savedToken = sessionStorage.getItem('token');
        if(!!savedToken){
            setIsLogin(true);
            const getUserById = async () => {
				const res = await getUser(Number(savedUserId));
				setUser(res);
				setIsUserLoading(false);
            };
            getUserById();
            setToken(savedToken);
        }else{
          	setIsUserLoading(false);
        }
    },[]);

    const signin = (newUser: User,token: String | null, callback: () => void) => {
		setIsLogin(true);
		setUser(newUser);
		setToken(token);
		sessionStorage.setItem('userId', String(newUser.id));
		sessionStorage.setItem('token', token?.toString()||'');
		callback();
    }

    const signout = (callback: () => void) => {
		setIsLogin(false);
		setUser(null);
		setToken(null);
		sessionStorage.removeItem('userId');
		sessionStorage.removeItem('token');
		callback();
    }

    const fetchUser = () => {
        const savedUserId = sessionStorage.getItem('userId');
		setIsUserLoading(true);
		const getUserById = async () => {
			const res = await getUser(Number(savedUserId));
			setUser(res);
			setIsUserLoading(false);
		};
		getUserById();
	};

    const value:AuthUserContextType = {isUserLoading, isLogin, user, token, signin, signout, fetchUser };
    return (
    	<AuthUserContext.Provider value={value}>
			{props.children}
    	</AuthUserContext.Provider>
    );
}