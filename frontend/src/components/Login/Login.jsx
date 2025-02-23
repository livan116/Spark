import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import style from './Login.module.css'
import loginImg from '../../assets/login.png'
import sparkImg from '../../assets/spark.png'

const Login = () => {

    // const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // uesState for login form
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate()

    // handling the form input
    const handleLoginForm = (e) => {
        const { name, value } = e.target;
        setLoginForm({ ...loginForm, [name]: value })
    }

    // handling the form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        // sending the loginform data to the backend
        try {
            const response = await axios.post("http://localhost:5000/api/user/login", loginForm);

            if (response.status === 200) {
                setLoginForm({
                    email: '',
                    password: ''
                });
                toast.success('User logged in successfully')
                localStorage.setItem('token', response.data.token);

            }
            else {
                console.log(response.data)
                toast.error('Login failed')
            }

        } catch (error) {
            console.error(error.response.data)
            toast.error(error.response.data.message)
        }
    };

    // if user already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            toast.success("User Already Logged In");
        }
    }, [])
    return (
        <>
            <div className={style.parent_register}>
                <div className={style.right_register}>
                    <div className={style.title_spark}>
                        <img src={sparkImg} alt="spark.png" />
                        <h2>SPARK</h2>
                    </div>
                    <div className={style.register}>
                        <p className={style.registerTitle}>Sign in to your Spark</p>
                    </div>

                    <div className={style.formLogin}>
                        <form className={style.form} onSubmit={handleLoginSubmit}>
                            <div className={style.loginFields}>
                                <label htmlFor="username">Username</label><br />
                                <input type="text" name='email'
                                    placeholder='Spark/Username'
                                    value={loginForm.email}
                                    onChange={handleLoginForm}
                                />
                            </div>
                            <div className={style.loginFields}>
                                <label htmlFor="username">Password</label><br />
                                <input type={showPassword ? 'text' : 'password'} name='password'
                                    placeholder='Password'
                                    value={loginForm.password}
                                    onChange={handleLoginForm}
                                />
                                <span onClick={() => setShowPassword(!showPassword)} className={style.icon}>
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                            </div>
                            <button className={style.loginBtn} onClick={()=>navigate('/onboard')}>Log in</button>
                        </form>
                    </div>

                    <div className={style.forgotpassword}>
                        <a href="#">Forgot password?</a>
                        <p>Don't have an account? <Link to={'/'}>Sign up</Link></p>
                    </div>

                    <div className={style.footer_register}>
                        <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply</p>
                    </div>
                </div>
                <div className={style.left_register}>
                    <img src={loginImg} alt="login.png" />
                </div>
            </div>
        </>
    )
}

export default Login