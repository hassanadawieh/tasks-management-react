import React from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { AiTwotoneEdit } from "react-icons/ai";
import "./Task.css";
const Task = ({task , taskManageHandler , setActiveTask}) => {

  const actionhandler = (status , task) => {
  taskManageHandler(status , task)
  }

  return (
    <div key={task.id} className='taskContainer' draggable onDragStart={() => setActiveTask(task)} onDragEnd={() => setActiveTask(null)}>
      <div className='actionContainer'>
      <AiTwotoneEdit className='editButton' onClick={() => actionhandler("Edit" , task)} />
        {(task.status === "backlog" || task.status === "done") && <FaRegTrashCan className='deleteButton' onClick={() => actionhandler("Delete" , task)} />}
        
      </div>
      <p className='taskDescription'>{task.description}</p>
      
    </div>
  )
}

export default Task
