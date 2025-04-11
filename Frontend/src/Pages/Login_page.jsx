import React from 'react';
import { useState } from 'react';
import Food_GIF from '../assets/Food_GIF.gif'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import * as yup from "yup";
import { FcGoogle } from "react-icons/fc";

const Login_page = () => {


    let userSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().required("Password is required").min(6, "Min 6 characters")
    });

    const navigate = useNavigate();

    const [UserData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    // console.log(UserData);

    const SubmitData = async (e) => {
        e.preventDefault();
        // console.log('UserData:-', UserData);
        try {
            await userSchema.validate(UserData, { abortEarly: false });
            console.log("✅ Form is valid:", UserData);
            setErrors({});

            const response = await axios.post('http://localhost:3000/api/login', UserData);
            alert(response?.data?.msg || "Login successfully");
            // console.log(response?.data);
            const token = response?.data?.token;
            localStorage.setItem('token', token);

            navigate('/dashboard');
        } catch (error) {
            if (error.name === "ValidationError") {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                // If API or unknown error
                alert(error.response?.data?.msg || "Something went wrong");
                navigate('/login');
            }

        }
    }

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:3000/auth/google";
    };

    return (
        <div className='flex'>
            <div className='flex-1 w-[50%]'>
                <div className='flex h-[100vh] justify-center items-center '>
                    <div className=' space-y-3.5  p-16 border border-gray-400 rounded-2xl shadow-xl hover:shadow-2xl'>
                        <h1 className='font-bold text-3xl mb-10'>Welcome Back</h1>
                        <form className='space-y-3.5' onSubmit={(e) => SubmitData(e)}>
                            <div>
                                <label htmlFor="email" className=' font-medium'>Email</label>
                                <span className='text-red-600 ml-1'>{errors.email}</span><br />
                                <input type="email" id='email' placeholder='Enter your email.' onChange={(e) => setUserData({ ...UserData, email: e.target.value })} className=' w-100 h-10 border border-gray-400  rounded-md' />
                            </div>
                            <div>
                                <label htmlFor="password" className=' font-medium'>Password</label>
                                <span className='text-red-600 ml-1'>{errors.password}</span><br />
                                <input type="password" id='password' placeholder='Enter your password.' onChange={(e) => setUserData({ ...UserData, password: e.target.value })} className=' w-100 h-10 border border-gray-400  rounded-md' />
                            </div>

                            <div>
                                <input type="submit" value="Sign Up" className=' w-100 h-10 bg-[#33A4F4] rounded-md font-medium text-white hover:bg-[#89c6f1] cursor-pointer' />
                            </div>
                        </form>

                        <div class="relative flex items-center mb-7 mt-7">

                            <div class="absolute left-0 top-0 h-full  "></div>

                            <div class="flex-grow border-t border-gray-300"></div>
                            <span class="mx-2 text-gray-600 font-medium">Or</span>
                            <div class="flex-grow border-t border-gray-300"></div>

                            <div class="absolute right-0 top-0 h-full  "></div>
                        </div>
                        <div
                            onClick={handleGoogleLogin}
                            className="w-100 h-10 rounded-md font-medium border border-gray-300 cursor-pointer hover:bg-gray-100 transition flex items-center justify-center gap-2"
                        >
                            <FcGoogle size={20} />
                            <span>Sign in with Google</span>
                        </div>
                        <div className='font-medium text-center'>
                            Have an account? <span onClick={() => navigate('/signup')} className=' text-blue-900 font-medium hover:text-xl cursor-pointer'>Sign Up</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className='flex-1 w-[50%]'>
                <img src={Food_GIF} alt="ai_image" className='w-[100%] h-[100vh] rounded-l-[10%] hover:rounded-4xl ' />
            </div>
        </div>
    )
}

export default Login_page