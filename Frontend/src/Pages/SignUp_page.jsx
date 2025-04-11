import React, { useState } from 'react'
import Food_GIF1 from '../assets/Food_GIF1.gif'
import Food_GIF3 from '../assets/Food_GIF3.gif'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import * as yup from "yup";

const SignUp_page = () => {

    let userSchema = yup.object().shape({
        username: yup.string().required("Username is required").min(3, "Min 3 characters"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().required("Password is required").min(6, "Min 6 characters"),
        pnumber: yup
            .string()
            .required("Phone number is required")
            .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [UserData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        pnumber: "",
    });
    // console.log(errors);

    const SubmitData = async (e) => {
        e.preventDefault();

        try {
            await userSchema.validate(UserData, { abortEarly: false });
            // console.log("✅ Form is valid:", UserData);
            setErrors({});

            const response = await axios.post('https://foody-app-backend-ed4g.onrender.com/api/signup', UserData);
            if (response.status == 201) {
                alert(response?.data?.msg || "User created successfully");
                navigate('/login');
            }

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
                navigate('/signup');
            }
        }

    }



    return (
        <div className="flex">
            <div className='flex-1 w-[50%]'>
                <div className='flex h-[100vh] justify-center items-center '>
                    <div className=' space-y-3.5  p-16 border border-gray-400 rounded-2xl shadow-xl hover:shadow-2xl'>
                        <h1 className='font-bold text-3xl mb-10'>Get Started Now</h1>
                        <form className='space-y-3.5' onSubmit={(e) => SubmitData(e)}>
                            <div>
                                <label htmlFor="name" className=' font-medium'>Name</label>
                                <span className='text-red-600 ml-1'>{errors.username}</span><br />
                                <input type="text" id='name' placeholder='Enter your name.' onChange={(e) => setUserData({ ...UserData, username: e.target.value })} className=' w-100 h-10 border border-gray-400  rounded-md' />
                            </div>
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
                                <label htmlFor="pnumber" className=' font-medium'>Phone Number</label>
                                <span className='text-red-600 ml-1'>{errors.pnumber}</span><br />
                                <input type="tel" id='pnumber' placeholder='Enter your phone number.' onChange={(e) => setUserData({ ...UserData, pnumber: e.target.value })} className=' w-100 h-10 border border-gray-400 rounded-md' />
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

                        <div className='font-medium text-center'>
                            Have an account? <span onClick={() => navigate('/login')} className=' text-blue-900 font-medium hover:text-xl cursor-pointer'>Login in</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className='flex-1 w-[50%]'>
                <img src={Food_GIF1} alt="ai_image" className='w-[100%] h-[100vh] rounded-l-[10%] hover:rounded-4xl '  />
            </div>
        </div>
    )
}

export default SignUp_page