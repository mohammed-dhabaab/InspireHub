import React, { useState, useEffect } from 'react';
import pen from '../../assets/register/pen.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import styles from '../../styles';

function Registration() {
    const [isFormActive, setIsFormActive] = useState(false);
    const [isSigninActive, setIsSigninActive] = useState(true);
    const [isLoginActive, setIsLoginActive] = useState(false);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const apiUrl = 'https://670941a3af1a3998baa0ec5c.mockapi.io/users';
    const navigate = useNavigate();
    const upperRegex = /[A-Z]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSignin = async (e) => {
        e.preventDefault();
    
        if (fullname.length <= 3) {
            setErrorMessage("Full Name must be more than 3 letters");
            return;
        }
        if (!emailRegex.test(email) || !email.toLowerCase().includes('tuwaiq')) {
            setErrorMessage("Email must be valid and contain the term 'tuwaiq'");
            return;
        }
        if (password.length <= 4 || !upperRegex.test(password)) {
            setErrorMessage("Password must be more than 4 letters and contain one uppercase letter");
            return;
        }
        setErrorMessage('');
    
        try {
            const response = await axios.get(apiUrl);
            const users = response.data;
            const userExists = users.some(ele => ele.email === email);
    
            if (!userExists) {
                const newUserResponse = await axios.post(apiUrl, {
                    name: fullname,
                    email: email,
                    password: password,
                    numberOfIdeas: [],
                    role: 'student',
                });
    
                const user = {
                    name: newUserResponse.data.name,
                    email: newUserResponse.data.email,
                    numberOfIdeas: newUserResponse.data.numberOfIdeas,
                    role: newUserResponse.data.role,
                };
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/home");
            } else {
                setErrorMessage('The email is already being used');
            }
        } catch (error) {
            setErrorMessage('Something went wrong, please try again later');
        }
    };
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
    
        try {
            const response = await axios.get(apiUrl);
            const userData = response.data;
    
            const userExist = userData.filter(
                (ele) => ele.email === email && ele.password === password
            );
    
            if (userExist.length === 1) {
                const user = {
                    name: userExist[0].name,
                    email: email,
                    numberOfIdeas: userExist[0].numberOfIdeas,
                    role: userExist[0].role,
                };
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/home");
            } else {
                setErrorMessage("Invalid email or password");
            }
        } catch (error) {
            setErrorMessage("Something went wrong, please try again later");
        }
    };
    

    useEffect(() => {
        setErrorMessage('');
    }, [email, password,fullname])

    useEffect(() => {
        if(localStorage.getItem('user')){
            localStorage.removeItem('user');
        }
    }, [])

    const toggleFormSignin = () => {
        setIsSigninActive(true);
        setIsLoginActive(false);
        clear();
    };
    const toggleFormsLogin = () => {
        setIsSigninActive(false);
        setIsLoginActive(true);
        clear();
    };
    const clear =()=>{
        setFullname('');
        setEmail('');
        setPassword('');
        setErrorMessage('');
    }

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-secondary to-primary">
        <div className={`${!isFormActive ? "" : "hidden"} w-[70%] md:h-[85%] lg:h-[90%] bg-[#eeecec] rounded-lg flex justify-between items-center
        max-sm:flex-col max-sm:h-[82%] max-md:[85%] max-md:py-4`}>
            <div className="w-[55%] h-full flex flex-col justify-center items-center px-2
            max-sm:w-full max-sm:justify-start max-sm:h-[50%]">
                <div className={`${styles.heading2} text-black font-IBM text-center py-1`} >
                    Verify your <span className='text-primary'>Ideas</span> with <span className='text-[#e8c46c]'>us </span> 
                   <br /> <span className={`${styles.heading3}`}>start now!</span>
                </div>
                <div className="h-60 flex justify-center items-center 
                max-sm:h-32  max-md:h-40 pl-8 ">
                    <img src={pen}
                     alt="pen image"
                     className='w-full h-full' />
                </div>

            </div>
            <div className="w-[1px] h-[80%] text-center bg-gray-500 hidden md:block"></div>
            <div className=" w-[45%] h-full flex justify-center items-center
            max-sm:w-full max-sm:items-start max-sm:h-[40%]">
                <div className=' w-[80%] h-[50%] flex flex-col justify-center items-center gap-1'>
                      <div className={`${styles.heading5}`}>Join us</div>
                    <button onClick={() => { setIsFormActive(true); toggleFormSignin(); }} className={`${styles.primaryButton} w-[80%] rounded-xl hover:text-secondary-light-color`}>Sign In</button>
                    <div className="flex items-center w-[80%]">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="mx-2 text-gray-500">or</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>
                    <button onClick={() => { setIsFormActive(true); toggleFormsLogin(); }} className={`${styles.primaryButton} w-[80%] rounded-xl hover:text-secondary-light-color `}>Login</button>
                </div>
            </div>
        </div>
         <div className={`${isFormActive ? "" : "hidden"} w-[37%] h-[78%] bg-[#eeecec] rounded-lg py-4 flex flex-col justify-center items-center 
         max-md:w-[85%] max-md:h-[85%] `}>
            <div className='self-start pl-2'>
            <IoArrowBackCircle onClick={()=>{setIsFormActive(false),clear()}} className='w-[8vw] h-[8vh]
             text-secondary-light-color hover:text-primary cursor-pointer
             max-sm:w-[10vw] max-sm:h-[10vh] '/>
            </div>
            <div className='flex flex-col justify-start items-center w-full h-[90%]'>
            <form className={`${isSigninActive? "" : "hidden"} w-[70%] p-4 max-md:w-[80%]`}
            onSubmit={handleSignin}>
             <h1 className={`${styles.heading4} text-primary text-center mb-4`}>Sign In</h1>
            <div> 
                <label htmlFor="fullname" className='inputLabel' >Full Name</label>
                            <input className="w-full text-black py-2 px-3 border rounded-xl focus:outline-slate-200"
                                id="fullname"
                                type="text"
                                placeholder="Full Name"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                required
                            />
             </div>
             <div> 
                <label htmlFor="email" className='inputLabel' >Email</label>
                            <input className="w-full text-black py-2 px-3 border rounded-xl focus:outline-slate-200"
                                id="email"
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
             </div>
             <div> 
                <label htmlFor="password" className='inputLabel' >password</label>
                            <input className="w-full text-black py-2 px-3 border rounded-xl focus:outline-slate-200"
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
             </div>
             <div className='pt-5'></div>
                        {errorMessage && (
                            <div className="text-red-500 mb-2">
                                {errorMessage}
                            </div>
                        )}
                        <div className='flex justify-center items-center'>
                            <button className="w-full rounded-md bg-[#4e3497] hover:bg-secondary-light-color hover:text-[#4e3497] text-white font-bold py-2 px-4 focus:outline-none "
                                type="submit"
                            >
                                Sign in
                            </button>
                        </div>
            </form>
            <form className={`${isLoginActive  ? "" : "hidden"} w-[70%]  p-4 max-md:w-[80%]`}
            onSubmit={handleLogin}>
             <h1 className={`${styles.heading4} text-primary text-center mb-4`}>Login</h1>
             <div> 
                <label htmlFor="email2" className='inputLabel' >Email</label>
                            <input className="w-full text-black py-2 px-3 border rounded-xl focus:outline-slate-200"
                                id="email2"
                                type='email'
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
             </div>
             <div> 
                <label htmlFor="password2" className='inputLabel' >password</label>
                            <input className="w-full text-black py-2 px-3 border rounded-xl focus:outline-slate-200"
                                id="password2"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
             </div>
             <div className='pt-5'></div>
                        {errorMessage && (
                            <div className="text-red-500 mb-2">
                                {errorMessage}
                            </div>
                        )}
                        <div className='flex justify-center items-center'>
                            <button className="w-full rounded-md bg-[#4e3497] hover:bg-secondary-light-color hover:text-[#4e3497] text-white font-bold py-2 px-4 focus:outline-none "
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
            </form>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
