import React , {useEffect , useState} from 'react'
import BoxTasks from '../../components/BoxTasks/BoxTasks'
import Header from "../../components/Header/Header"
import "./TasksPage.css"
import axios from 'axios';
import TaskManage from '../../components/TaskManage/TaskManage';
import pusher from '../../pusher';
import Loading from '../../components/Loading';
const status = ["backlog" , 'doing' , 'review' , 'done'];

const TasksPage = () => {

  const [tasksData , setTasksData] = useState([]);
  const [showPopUp , setShowPopUp] = useState(false);
  const [popUpData , setPopUpData] = useState({
    status:"",
    data:{}
  })

const user_id = localStorage.getItem("user_id");
const token = localStorage.getItem('ACCESS_TOKEN');

 const taskManageHandler = (status , data) => {
  setPopUpData({
    status: status || "",
    data : data || "",
  })
  setShowPopUp(true)
 }

 const isShowTaskManageHandler = () => {
  setShowPopUp(false)
 }

  useEffect(() => {
    const fetchData = async () => {
      if (user_id) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/auth/tasks/${user_id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setTasksData(response.data.data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      }
    };

    fetchData()

  const channel = pusher.subscribe('my-channel');
  channel.bind('task-created', (data) => {
      setTasksData((prevTasks) => [...prevTasks, data.task]);
  });

  channel.bind('task-updated', (data) => {
    setTasksData((prevTasks) => {
        return prevTasks.map(task => task.id === data.id ? data : task);
    });

    channel.bind('task-delete', (data) => {
      setTasksData((prevTasks) => prevTasks.filter(task => task.id !== data.task.id));
  });
});

  return () => {
      channel.unbind_all();
      channel.unsubscribe();
  };
  
  },[user_id , token])
  return (
    <> 
    <Header />
    <Loading type="balls" color="#ffffff" />
    {showPopUp && <TaskManage popUpData={popUpData} isShowTaskManageHandler={isShowTaskManageHandler} />}
    <div className='tasksPageContainer'>
        <h2>Workspace</h2>
        <div className='boardTasksContainer'>
            {status.map((state) => {
              return <BoxTasks status={state} tasks={tasksData} taskManageHandler={taskManageHandler}  />
            })}
        </div>
    </div>
    </>

  )
}

export default TasksPage
