import Register from '@/Components/auth/Register'
import React from 'react'

const signUp = ({ searchParams: { callbackUrl } }) => {
    return (
        <div>
            <Register callbackUrl={callbackUrl || "/"} />
        </div>
    )
}

export default signUp