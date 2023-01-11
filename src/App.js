import React, { useState, useEffect } from 'react';
import './App.css'
import SearchForm from './components/searchForm';
import TaskList from './components/taskList';

function App() {
 const apiUrl = process.env.REACT_APP_API_URL

 const [taskList, setTaskList] = useState([])
 const [idToUpdate, setIdToUpdate] = useState ("")
 const [task, setTask] = useState ({title:"", description:""})
 
 useEffect(()=>{
  getAPI();
 },[])

  const getAPI = async ()=>{
    const data = await fetch( apiUrl )
    var dataJson = await data.json()
    setTaskList(dataJson)
  }

  const handleIdtoUpdate =(id)=>{
    setIdToUpdate(id)
  }

  const handleNewTask = (newTask) => {
    setTask(newTask)
  }

  return (
    <div className="flex justify-center items-center flex-col lg:inline">
        <SearchForm taskToUpdateId ={idToUpdate} idHandler={handleIdtoUpdate} fetchGetAPI={getAPI} task={task} taskHandler={handleNewTask}/>
        <TaskList list={taskList} idHandler={handleIdtoUpdate} fetchGetAPI={getAPI} taskHandler={handleNewTask}/>
    </div>
  );
}

export default App;
