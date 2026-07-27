import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../services/taskService";


function Completed(){

  const navigate = useNavigate();

  const [tasks,setTasks] = useState([]);



  useEffect(()=>{

    loadCompletedTasks();

  },[]);



  const loadCompletedTasks = async()=>{

    try{

      const response = await getTasks();

      const completedTasks = response.data.filter(
        (task)=>task.status === "Completed"
      );

      setTasks(completedTasks);

    }
    catch(error){

      console.log(error);

    }

  };



  return(

    <div className="min-h-screen bg-gray-100 p-8">


      <button
        onClick={()=>navigate("/dashboard")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Back Dashboard
      </button>



      <h1 className="text-4xl font-bold mt-6">
        Completed Tasks
      </h1>



      {
        tasks.length === 0 ?

        (
          <p className="mt-5 text-gray-600">
            No completed tasks
          </p>
        )

        :

        tasks.map((task)=>(

          <div
            key={task.id}
            className="bg-white p-5 rounded-xl shadow mt-5"
          >

            <h2 className="text-xl font-bold">
              {task.title}
            </h2>


            <p>
              {task.description}
            </p>


            <p className="text-green-600 mt-2">
              Status: {task.status}
            </p>


            <p>
              Priority: {task.priority}
            </p>


          </div>

        ))

      }


    </div>

  )

}


export default Completed;