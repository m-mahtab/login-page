import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { useGoogleLogin } from '@react-oauth/google';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { createButton } from 'react-social-login-buttons';
import { useAuth0 } from '@auth0/auth0-react'
// import { FacebookLoginButton } from 'react-social-login-buttons';

import { jwtDecode } from "jwt-decode";


function Login() {


    const { loginWithRedirect, isAuthenticated, logout } = useAuth0()
    const [profile, setProfile] = useState(null);

    const config = {


        style: {
            background: "#F1F5F9",
            color: "#000", // White text color
            padding: "12px 20px", // Adjust padding
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 'none'
        },


    }

    const FbButton = createButton(config)

    const login = useGoogleLogin({
        onSuccess: tokenResponseDecoded => console.log(jwtDecode(tokenResponseDecoded)),
    });

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        resetForm();
    };

    return (
        <div className=''>
            <div className='flex flex-row '>
                <div className='form w-1/2 px-28 py-14'>
                    <div className='text-start'>
                        <h1 className='font-bold text-2xl mb-5'>Welcome Back 🖐️</h1>
                        <p>
                            Books open doors to new worlds and ideas.<br />
                            Dive into a story; let your imagination soar.
                        </p>
                    </div>
                    <div className=''>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            <Form className='mt-5'>
                                <div className='flex flex-col text-start  '>
                                    <label htmlFor='email'>Email:</label>
                                    <Field
                                        id='email'
                                        name='email'
                                        type='email'
                                        placeholder='Example@email.com'
                                        className='py-3 px-2 rounded-xl border border-gray-400 bg-slate-100'
                                    />
                                </div>
                                <div className='flex flex-col text-start my-3'>
                                    <label htmlFor='password'>Password:</label>
                                    <Field
                                        id='password'
                                        name='password'
                                        type='password'
                                        placeholder='At least 8 characters'
                                        className='py-3 px-2 rounded-xl border border-gray-400 bg-slate-100'
                                    />
                                </div>
                                <div className='flex justify-end'>
                                    <p className='text-blue-700 font-bold mb-5 text-sm'>Forgot Password?</p>
                                </div>
                                {
                                    isAuthenticated ? (

                                        <button
                                            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                            type='submit' className='bg-red-900 rounded-xl text-white w-full py-3'>
                                            Sign Out
                                        </button>
                                    ) : (

                                        <button
                                            onClick={() => loginWithRedirect()}
                                            type='submit' className='bg-slate-900 rounded-xl text-white w-full py-3'>
                                            Sign in
                                        </button>
                                    )

                                }

                            </Form>
                        </Formik>
                    </div>
                    <div className='flex flex-row items-center mt-5'>
                        <span className='flex-grow h-[1px] bg-gray-400'></span>
                        <p className='mx-5'>Or</p>
                        <span className='flex-grow h-[1px] bg-gray-400'></span>
                    </div>
                    <div className='w-full my-5'>
                        <button onClick={() => login()}
                            className='rounded-xl bg-slate-100 w-full py-3 cursor-pointer flex justify-center'>
                            <img src='images/googleicon.png' alt='' className='h-7 pr-3' />
                            Sign in with Google
                        </button>


                    </div>
                    <div>
                        {!profile ? <LoginSocialFacebook
                            appId='2119473881768373'
                            onResolve={(res) => {
                                console.log(res);
                            }}
                            onReject={(err) => {
                                console.log(err);
                            }}
                        >

                            <FbButton onClick={() => alert("Server side issue")} >
                                <div className='flex '>

                                    <img src='images/fbicon.png' alt='' className='h-7 pr-3' />
                                    Sign in with Facebook
                                </div>
                            </FbButton>
                        </LoginSocialFacebook> : ''}
                        {profile ? <div>
                            <h1>{profile.name}</h1>
                            <img src={profile.picture.data.url} alt='' />

                        </div> : ''}
                    </div>
                    <div className='flex justify-center mt-10 text-sm'>
                        <p>Don't you have an account? </p><p className=' font-bold text-blue-700 cursor-pointer'><a href='/'>Sign Up</a> </p>
                    </div>
                </div>
                <div className='w-1/2'>
                    <img src='images/books1.jpg' className='rounded-xl' alt='' />
                </div>
            </div>
        </div>
    );
}

export default Login;
