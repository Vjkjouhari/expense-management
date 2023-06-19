import React, { useEffect } from 'react'
import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Spinner from '../components/layout/Spinner'
const Registerr = () => {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    //form submit
    const submitHandler = async (values) =>{
        try {
            setLoading(true)
            await axios.post('users/register', values)
            message.success("Registration successfull")
            setLoading(false)
            Navigate('/login')
        } catch (error) {
            setLoading(false)
            message.error('something went wrong')
        }
    };
    //prevent for login user
    useEffect (()=>{
        if(localStorage.getItem('user')){
            Navigate('/');
        }
    },[Navigate]);

  return (
    <>
        <div className='register-page'>
            {loading && <Spinner />}
            <Form layout='vertical' className='register-form' onFinish={submitHandler}>
                <h1> Register Form</h1>
                <Form.Item label="Name" name="name">
                    <Input/>
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type='email'/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type='password'/>
                </Form.Item>
                <div className="d-flex justify-content-between">
                    <Link to="/login" className='already-register'>Already Register ? click here to Login</Link>
                    <button className='buttons'>Register</button>
                </div>
            </Form>
        </div>
    </>
    
  )
}

export default Registerr