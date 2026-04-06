import React, { useEffect } from 'react'
import {Outlet} from 'react-router'
import Header from './Header'
import Footer from './Footer'
import { userAuth } from '../AuthStore/AuthStore'
function RootLayout() {
    let checkUser = userAuth(state => state.checkUser);

    const checkUserDetails = async() => {
        await checkUser();
    }

    useEffect(()=> {
        console.log(true)
        checkUserDetails();
    },[])

    return (
    <div className='flex flex-col text-center'>
        <header>
            <Header></Header>
        </header>
        <main className='min-h-screen'>
            <Outlet></Outlet>
        </main>
        <footer>
            <Footer></Footer>
        </footer>
    </div>
)}

export default RootLayout