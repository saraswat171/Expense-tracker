
import React, { useState } from 'react'

import './Signup.css'
import mailicon from '../../Assets/icons/Leading Icon.svg'
import passicon from '../../Assets/icons/password-icon.svg'
import nameimg from '../../Assets/icons/expand_more.svg'

import { useDispatch ,  useSelector} from 'react-redux';
import { registerUser } from '../../Redux/registerSlice';
import { useNavigate } from 'react-router-dom'

function  Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.register);
  const success= useSelector((state)=>state.register.success)


  const handleSubmit = (e) => {
    e.preventDefault();
  

try{
    dispatch(registerUser({ name, email, password }));
    if(success===true){
        navigate('./Login')
    }
}
  catch(err){
    alert(err);
  } 
    
    };


    return (
        <div className='hero'>
            <form onSubmit={handleSubmit}>
                <div className='hero-left'>
                    <div className='hero-head'>
                        <h1>New User? Sign Up Here!</h1>
                        <p>Welcome! Sign Up for better experience.</p>
                    </div>
                    <div className='hero-input'>
                        <div className='email-content'>
                            <div className='mailbox'>
                                <img src={nameimg} alt='mailbox'></img>
                                <input type='text' name='name' id='name' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} required></input>
                            </div>
                        </div>
                    </div>
                    <div className='hero-input'>
                        <div className='email-content'>
                            <div className='mailbox'>
                                <img src={mailicon} alt='mailbox'></img>
                                <input type='email' name='email' id='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} required ></input>
                            </div>
                        </div>
                    </div>

                    <div className='hero-input'>
                        <div className='email-content'>
                            <div className='mailbox'>
                                <img src={passicon} alt='password'></img>
                                <input type='password' name='password' id='passwors' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}  required></input>
                                {/* <div style={{ color: "red" }}>{errorMessage}</div> */}
                            </div>
                        </div>
                    </div>
                   <div className='btndiv'>
                   <button className='signin' type='submit'>SIGN UP</button>
                   </div>
                </div>
            </form>
            {loading && <p>Loading...</p>}
            {error &&<p>{error}</p> }
        </div>
    );
}

export default Signup;
