import React, { useState, useEffect } from 'react';


function SearchForm(p) {
 const apiUrl = process.env.REACT_APP_API_URL
 const task= p.task
 const idToUpdate = p.taskToUpdateId

  const handleChange = (e)=>{
    const {name, value} = e.target;
    p.taskHandler((prevValue)=>{
      return({...prevValue, [name]:value})
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const parameters = await idToUpdate ===""? {urlToFetch:apiUrl, methodToFetch:"POST"} : {urlToFetch:`${apiUrl}/${p.taskToUpdateId}`, methodToFetch:"PUT"}
    await fetch(parameters.urlToFetch,{
    method:parameters.methodToFetch,
    body: JSON.stringify(task),
    headers:{
      "Content-Type":"application/json"
    }
    })
    .then(()=>{p.taskHandler({title:"", description:""})})
    .then(()=>{p.idHandler("")})
    .then(()=>{p.fetchGetAPI()})
  }


 const inputTailwindcss = "my-5 border-b-[1px] border-slate-200 focus:outline-none overflow-x-visible"
  return (
    
        <div className=" w-[70%] lg:w-[25%] lg:ml-24 lg:absolute">
          <form onSubmit={handleSubmit} className="flex flex-col justify-between h-[100%] px-8 pt-4 pb-4 border-[1px] border-blue-400 rounded-b-xl border-t-0  shadow-sm shadow-blue-400">
            <input type="text" placeholder="task" value={task.title} name="title" required={true} onChange={handleChange} className={inputTailwindcss}></input>
            <textarea type="text" placeholder="To do" value={task.description} name="description" required={true} onChange={handleChange} className={inputTailwindcss}></textarea>
            <button type="submit">
              {idToUpdate ===""? "Add Task":"Update Task"}
            </button>
          </form>
      </div>

  );
}

export default SearchForm;
