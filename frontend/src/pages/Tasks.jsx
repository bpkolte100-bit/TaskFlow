import {
  Plus,
  Edit,
  Trash2
} from "lucide-react";

import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Tasks() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);



  // Fetch tasks from backend

  const fetchTasks = async () => {

    try {

      const response = await getTasks();

      setTasks(response.data);

    }
    catch(error){

      console.log(error);

      alert("Failed to load tasks");

    }
    finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchTasks();

  },[]);




const handleDelete = async(id)=>{


  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );


  if(!confirmDelete){
    return;
  }



  try{

    await deleteTask(id);

    toast.success("Task deleted successfully");

    fetchTasks();

  }
  catch(error){

    console.log(error);

    toast.error("Delete failed");

  }

};





  if(loading){

    return (
      <h2 className="text-xl font-semibold">
        Loading tasks...
      </h2>
    );

  }





  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="
        flex
        justify-between
        items-center
      ">


        <div>

          <h1 className="
            text-3xl
            font-bold
            text-gray-800
          ">
            My Tasks
          </h1>


          <p className="text-gray-500 mt-2">
            Manage and track your daily tasks
          </p>


        </div>



        <button

          onClick={()=>navigate("/add-task")}

          className="
          flex
          items-center
          gap-2
          bg-blue-600
          text-white
          px-5
          py-3
          rounded-xl
          hover:bg-blue-700
          "
        >

          <Plus size={20}/>

          Add Task

        </button>


      </div>





      {/* Task Cards */}


      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">


        {
          tasks.map((task)=>(


            <div
              key={task.id}
              className="
              bg-white
              rounded-2xl
              shadow
              p-5
              hover:shadow-lg
              transition
              "
            >


              <div className="
                flex
                justify-between
                items-start
              ">


                <h2 className="
                  text-xl
                  font-bold
                ">
                  {task.title}
                </h2>


                <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-sm

                  ${
                    task.priority==="High"
                    ?
                    "bg-red-100 text-red-600"
                    :
                    task.priority==="Medium"
                    ?
                    "bg-yellow-100 text-yellow-600"
                    :
                    "bg-green-100 text-green-600"
                  }

                `}
                >
                  {task.priority}
                </span>


              </div>



              <p className="
                text-gray-500
                mt-3
              ">
                {task.description}
              </p>




              <div className="
                flex
                justify-between
                items-center
                mt-5
              ">



                <span className="
                  bg-blue-100
                  text-blue-600
                  px-3
                  py-1
                  rounded-full
                  text-sm
                ">
                  {task.status}
                </span>




                <div className="
                  flex
                  gap-2
                ">


                 <button

  onClick={() =>
    navigate("/edit-task", {
      state: task
    })
  }

  className="
  p-2
  rounded-lg
  hover:bg-gray-100
  "

>

  <Edit size={18}/>

</button>

                  <button

                    onClick={()=>handleDelete(task.id)}

                    className="
                    p-2
                    rounded-lg
                    text-red-500
                    hover:bg-red-50
                    "
                  >

                    <Trash2 size={18}/>

                  </button>


                </div>


              </div>


            </div>


          ))
        }


      </div>


    </div>

  );
}


export default Tasks;