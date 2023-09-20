import Link from 'next/link';
import React from 'react';
import SignIn from '@/Components/auth/SignIn';


const Login = ({ searchParams: { callbackUrl } }) => {
    console.log(callbackUrl, 'callbackUrl for login page')
    return (
        <div>
            <SignIn callbackUrl={callbackUrl || "/"} />
        </div>
    );
};

export default Login;