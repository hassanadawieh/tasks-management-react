import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./LoginPage.css";
import Button from "../../components/UI/Button/Button";

const LoginPage = () => {
  
    const [status , setStatus] = useState('Register')
    const [inputs , setInputs] = useState({});
    const [isLoading , setIsLoading] = useState(false)

    const navigate = useNavigate();

    const changeStatusHandler = () => {
        if(status === "Login"){
            setStatus('Register');
        }else{
            setStatus('Login');
        }
    }

    const inputChangeHandler = (event) => {
      const { name, value } = event.target;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value
      }));
    }

    const submitHandler = () => {
      const url = status === "Register" ? "http://127.0.0.1:8000/api/register" : "http://127.0.0.1:8000/api/login";
      setIsLoading(true)
      axios.post(url, inputs)
        .then(response => {
          console.log('Success:', response.data);
          if(response.data.message === "User successfully registered"){
            setStatus("Login")
            setIsLoading(false)
          }else{
            localStorage.setItem("ACCESS_TOKEN" , response.data.access_token);
            localStorage.setItem("user_id" , response.data.user.id );
            localStorage.setItem("user_name" , response.data.user.name);
            navigate('/TasksPage')
            setIsLoading(false)
          }
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error
        });

    }
  
  return (
    <div className='loginContainer'>
      <div className='formContainer'>
      <h2 className='title'>{status}</h2>
      <div className='inputs'>
        {status === "Register" && 
        <input 
        className='input' 
        type='text'
        name='name'
        placeholder='Name'
        value={inputs.name}
        onChange={inputChangeHandler} />}
        <input   
        className='input'
        type='email'
        name='email'
        placeholder='Email'
        value={inputs.email}
        onChange={inputChangeHandler} />
        <input 
        className='input'
        type='password'
        name='password'
        placeholder='Password'
        value={inputs.password}
        onChange={inputChangeHandler} />
      </div>
      <div></div>
      <p className='pLog'>
          {status === "Login" ? "Don't have an account?" : "Already have an account?"} 
          <u className="statusButton" onClick={changeStatusHandler}>
            {status === "Login" ? "Register" : "Login"}
          </u>
        </p>
      <div className='button'>
      <Button title={status} submitHandler={() => submitHandler()}  isLoading={isLoading}/>
      </div>
      </div>
    </div>
  )
}

export default LoginPage
