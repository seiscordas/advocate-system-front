import React from 'react';
import { userAuth } from '@/services';
import Login from '@/app/login/page';

interface AuthenticatedPageProps {
    children: React.ReactNode;
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({ children }) => {
    const auth = userAuth();

    console.log("aki", auth);
    
    if (!auth.isSessionValid()) {
        return <Login/>
    }

    return (
        <>
            {children}
        </>
    )
}