import React, { useState, useEffect } from 'react';

function TaskList(p) {
//TODO acutualizar tasklist con las response del back
 const apiUrl = process.env.REACT_APP_API_URL
 var taskList = p.list


  const deleteTask= (id)=>{
   const ulrWithId =`${apiUrl}/${id}`
    fetch(ulrWithId,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(()=>{p.fetchGetAPI()})
  }

  const updateTask= async(id)=>{
    const ulrWithId =`${apiUrl}/${id}`
    const data = await fetch(ulrWithId)
    var dataJson = await data.json()
    p.taskHandler({title:dataJson.title, description:dataJson.description})
    p.idHandler(dataJson._id)
  }



  return (
    <div className="lg:absolute task-list bg-[rgba(0,0,0,0.1)] lg:ml-[40%] mx-2 lg:mx-0 lg:mr-5 p-4 pt-4  mt-4 rounded-md max-h-[90%] min-w-[55%] overflow-scroll shadow-md">
      <div className='grid grid-cols-4 border-b-[1px] border-blue-500'>
        <p className=' grid-start-1'>Task</p>
        <p className=' grid-start-1 grid-end-4'>description</p>
      </div>
        <ul className=' w-[100%]'>
          {taskList.map((task)=>{
            return (
            <li key={task._id} className="my-4 bg-[rgba(0,0,0,0.1)]  grid grid-cols-4 items-center px-2 rounded-md shadow-sm">
                <h2 className='grid-start-1 grid-end-2 text-md font-bold'>{task.title}</h2>
                <p className='grid-start-2 grid-end-3 overflow-clip'>{task.description}</p>
             
              <div className='grid-start-3 grid-end-4 flex flex-col items-center'>
                <button onClick={()=>{deleteTask(task._id)}} type="button" className='bg-red-500  hover:text-red-500 hover:bg-black w-6 rounded-full my-1'><i class="fa-solid fa-trash-can"></i></button>
                <button onClick={()=>{updateTask(task._id)}} type="button" className='bg-blue-500 hover:text-blue-500 hover:bg-white w-6 rounded-full my-1'><i class="fa-solid fa-arrow-rotate-left"></i></button>
              </div>

            </li>
            )
          })}
        </ul>
    </div>
  );
}

export default TaskList;
