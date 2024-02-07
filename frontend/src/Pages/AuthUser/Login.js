
import React, {useState} from 'react'
import mailicon from '../../Assets/icons/Leading Icon.svg'
import passicon from '../../Assets/icons/password-icon.svg'

import { useDispatch, useSelector } from 'react-redux';
import {  loginUser } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);
  const logged = useSelector(state => state.auth.logged)
  console.log("hhfhf",logged)
  const navigate =useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className='hero'>
      <form onSubmit={handleSubmit}>
                <div className='hero-left'>
                    <div className='hero-head'>
                        <h1>Already a customer?</h1>
                        <p>Welcome back! Sign in for faster checkout.</p>
                    </div>

                    <div className='hero-input'>
                        <div className='email-content'>
                            <div className='mailbox'>
                                <img src={mailicon} alt='mailbox'></img>
                                <input type='email' name='email' id='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                        </div>
                    </div>

                    <div className='hero-input'>
                        <div className='email-content'>
                            <div className='mailbox'>
                                <img src={passicon} alt='password'></img>
                                <input type='password' name='password' id='passwors' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                        </div>
                    </div>

                  
                    <div className='btndiv'>
                   <button className='signin' type='submit'>SIGN IN</button>
                   </div>
                </div>
            </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p> }
      {logged && navigate('/Home')}
     
    </div>
  );
}

export default Login;
