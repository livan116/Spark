import React, { useState } from 'react'
import style from './Register.module.css'
import loginImg from '../../assets/login.png'
import sparkImg from '../../assets/spark.png'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate();
    const [registerForm, setRegisterForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
    })

    // handling the form input
    const handleRegisterForm = (e) => {
        const { name, value } = e.target
        setRegisterForm({ ...registerForm, [name]: value })
    }

    // handling the form submission
    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        // checking if the password and confirm password match
        if (registerForm.password !== registerForm.confirmpassword) {
            toast.error('Passwords do not match')
        }

        // sending the Registerform data to the backend
        try {
            const response = await axios.post("http://localhost:5000/api/user/register", registerForm);

            if (response.status === 200) {

                setRegisterForm({
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    confirmpassword: '',

                });
                toast.success('User Registrated successfully')
                navigate('/login')
            }
            else {
                console.log(response.data)
                toast.error('Registration failed')
            }

        } catch (error) {
            console.error(error.response.data)
            toast.error(error.response.data.msg)

        }

    };

    return (
        <>
            <div className={style.parent_register}>
                <div className={style.right_register}>
                    <div className={style.title_spark}>
                        <img src={sparkImg} alt="spark.png" />
                        <h2>SPARK</h2>
                    </div>
                    <div className={style.register}>
                        <p className={style.registerTitle}>Sign up to your Spark</p>
                        <div className={style.form_register}>
                            <div className={style.formTitle}>
                                <p>Create an account</p>
                                <Link to={'/login'}>Sign in instead</Link>
                            </div>
                            <form className={style.form} onSubmit={handleRegisterSubmit}>
                                <div className={style.formFields}>
                                    <label htmlFor="firstname">First name</label><br />
                                    <input type="text" name='firstname' value={registerForm.firstname} onChange={handleRegisterForm} />
                                </div>
                                <div className={style.formFields}>
                                    <label htmlFor="lastname">Last name</label><br />
                                    <input type="text" name='lastname'  value={registerForm.lastname} onChange={handleRegisterForm} />
                                </div>
                                <div className={style.formFields}>
                                    <label htmlFor="email">Email</label><br />
                                    <input type="text" name='email'  value={registerForm.email} onChange={handleRegisterForm} />
                                </div>
                                <div className={style.formFields}>
                                    <label htmlFor="password">Password</label><br />
                                    <input type="password" name='password'  value={registerForm.password} onChange={handleRegisterForm} />
                                </div>
                                <div className={style.formFields}>
                                    <label htmlFor="confirmpassword">Confirm Password</label><br />
                                    <input type="password" name='confirmpassword'  value={registerForm.confirmpassword} onChange={handleRegisterForm} />
                                </div>
                                <div className={style.termsCondition}>
                                    <input type="checkbox" name="checkbox" id="checkbox" />
                                    <p>By creating an account, I agree to our Terms of use
                                        and Privacy Policy </p>
                                </div>
                                <button className={style.createBtn} type="submit">Create an account</button>
                            </form>
                        </div>
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

export default Register