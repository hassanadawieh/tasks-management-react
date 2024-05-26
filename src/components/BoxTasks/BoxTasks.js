import React from 'react';
import { FaPlus } from "react-icons/fa";
import "./BoxTasks.css";
import Task from '../Task/Task';


const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

const BoxTasks = ({status , tasks , taskManageHandler}) => {
    const statusTasks = tasks?.filter((task) => task.status === status);

    const addHandler = () => {
      taskManageHandler("Add")
    }
  return (
    <div className='boxContainer'>
      <div className={status}>
        {status === "backlog" && <FaPlus onClick={() => addHandler()}  className="addIcon" />}
        <b>{capitalizeFirstLetter(status)}</b>
      </div>
      <div className='tasksContainer'>
      {statusTasks?.map((task) =>
    {
     return <Task task={task} taskManageHandler={taskManageHandler} />
    }
    )}
      </div>
    </div>
  )
}

export default BoxTasks
