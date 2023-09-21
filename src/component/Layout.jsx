import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
    return (
        <div className='h-screen flex flex-row justify-start'>
            <Sidebar></Sidebar>
            <div className=' flex-1 p-4 text-black '>{children}</div>
        </div>
    )
}

export default Layout