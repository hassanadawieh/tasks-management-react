import React from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import "./Task.css";
const Task = ({task , taskManageHandler}) => {

  const actionhandler = (status , task) => {
  taskManageHandler(status , task)
  }

  return (
    <div className='taskContainer'>
      <div className='actionContainer'>
      <AiTwotoneEdit className='editButton' onClick={() => actionhandler("Edit" , task)} />
        {(task.status === "backlog" || task.status === "done") && <FaRegTrashCan className='deleteButton' onClick={() => actionhandler("Delete" , task)} />}
        {task.status !== "done" && <FaCheckCircle className='checkButton' onClick={() => actionhandler("Completed" , task)} />}
        
      </div>
      <p className='taskDescription'>{task.description}</p>
      
    </div>
  )
}

export default Task
