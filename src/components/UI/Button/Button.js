import React from 'react'
import "./Button.css";
import Loading from '../../Loading';

const Button = ({title , submitHandler , isLoading}) => {
  return (
    <div onClick={() => submitHandler()} className='buttonContainer'>
      {isLoading ? <Loading /> : title}
    </div>
  )
}

export default Button
