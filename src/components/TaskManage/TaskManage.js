import React, {useState} from 'react';
import axios from 'axios';
import "./TaskManage.css";
import Button from '../UI/Button/Button';


const TaskManage = ({popUpData , isShowTaskManageHandler}) => {
    const [inputs , setInputs] = useState({description: popUpData.data?.description || '',});
    const [isLoading , setIsLoading] = useState(false)
    const user_id = localStorage.getItem("user_id");

    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
          ...prevInputs,
          [name]: value,
          user_id:user_id
        }));
      }

      const token = localStorage.getItem("ACCESS_TOKEN")

      const submitHandler = () => {
      if(popUpData.status === "Add"){
        setIsLoading(true)
        axios.post("http://127.0.0.1:8000/api/auth/task", inputs , {
          headers: {
            Authorization: `Bearer ${token}`
        }
        })
          .then(response => {
            setIsLoading(false)
            isShowTaskManageHandler()
            console.log('Success:', response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }else if(popUpData.status === "Edit"){
        setIsLoading(true)
        axios.put(`http://127.0.0.1:8000/api/auth/task/${popUpData.data.id}`, {...inputs , status:popUpData.data.status } , {
          headers: {
            Authorization: `Bearer ${token}`
        }
        })
          .then(response => {
            setIsLoading(false)
            isShowTaskManageHandler()
            console.log('Success:', response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }else if(popUpData.status === "Completed"){
        setIsLoading(true)
        let newStatus = ""
        switch (popUpData.data.status) {
          case "backlog":
            newStatus = "doing";
            break;
          case "doing":
            newStatus = "review";
            break;
          case "review":
            newStatus = "done";
            break;
          default:
            // Optionally handle cases where status does not match any known statuses
            console.warn("Unknown status:", popUpData.data.status);
            break;
        }
        axios.put(`http://127.0.0.1:8000/api/auth/task/${popUpData.data.id}`, {status : newStatus , description:popUpData.data.description} , {
          headers: {
            Authorization: `Bearer ${token}`
        }
        })
          .then(response => {
            setIsLoading(false)
            isShowTaskManageHandler()
            console.log('Success:', response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }else if(popUpData.status === "Delete"){
        setIsLoading(true)
        axios.delete(`http://127.0.0.1:8000/api/auth/task/${popUpData.data.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
        }
        })
          .then(response => {
            setIsLoading(false)
            isShowTaskManageHandler()
            console.log('Success:', response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    }
    
  return (
    <div className='TaskManageContainer'>
      <div className='formInputs'>
        <h3>{popUpData.status} Task</h3>
        {(popUpData.status === "Edit" || popUpData.status === "Add")?
        <textarea className='taskmanagmentInput' type='text' placeholder='description' name='description' value={inputs.description} onChange={inputChangeHandler} />:
        <p>{inputs.description}</p>
        }
      <div className='buttoncontainer'>
      <div onClick={() => isShowTaskManageHandler()} className='cancelButton'> cancel</div>
      <Button submitHandler={submitHandler} title={popUpData.status} isLoading={isLoading} className='actionButton'/>
      </div>
      </div>
     
    </div>
  )
}

export default TaskManage
