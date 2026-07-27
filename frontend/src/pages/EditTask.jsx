import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { updateTask } from "../services/taskService";
import toast from "react-hot-toast";


function EditTask(){

  const navigate = useNavigate();

  const location = useLocation();


  const oldTask = location.state;



  const [task,setTask] = useState({

    title: oldTask.title,

    description: oldTask.description,

    dueDate: oldTask.dueDate,

    priority: oldTask.priority,

    status: oldTask.status

  });





  const handleChange=(e)=>{


    setTask({

      ...task,

      [e.target.name]:e.target.value

    });


  };





  const handleUpdate=async()=>{


    try{


      await updateTask(
        oldTask.id,
        task
      );


      toast.success("Task updated successfully");


      navigate("/my-tasks");


    }
    catch(error){

      console.log(error);

      toast.error("Update failed");

    }


  };






  return(

    <div className="
    min-h-screen
    bg-gray-100
    flex
    items-center
    justify-center
    ">


      <div className="
      bg-white
      p-8
      rounded-xl
      shadow
      w-96
      ">


      <h1 className="text-3xl font-bold mb-5">
        Edit Task
      </h1>



      <input

      name="title"

      value={task.title}

      onChange={handleChange}

      className="w-full border p-3 mb-4 rounded"

      />



      <textarea

      name="description"

      value={task.description}

      onChange={handleChange}

      className="w-full border p-3 mb-4 rounded"

      />




      <select

      name="status"

      value={task.status}

      onChange={handleChange}

      className="w-full border p-3 mb-4 rounded"

      >

      <option>Pending</option>

      <option>In Progress</option>

      <option>Completed</option>


      </select>





      <button

      onClick={handleUpdate}

      className="
      w-full
      bg-blue-600
      text-white
      p-3
      rounded
      "

      >

      Update Task

      </button>



      </div>


    </div>

  )

}


export default EditTask;