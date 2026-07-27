import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/taskService";


function AddTask() {

  const navigate = useNavigate();


  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending"
  });


  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {

    setTask({
      ...task,
      [e.target.name]: e.target.value
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    if(!task.title.trim()){

      alert("Task title is required");
      return;

    }


    try {

      setLoading(true);


      await createTask(task);


      alert("Task created successfully");


      navigate("/tasks");


    }
    catch(error){

      console.log(error);

      alert("Failed to create task");

    }
    finally{

      setLoading(false);

    }

  };




  return (

    <div className="max-w-3xl mx-auto">


      {/* Header */}

      <div className="flex items-center gap-4 mb-6">


        <button
          onClick={() => navigate("/tasks")}
          className="
          p-2
          rounded-lg
          hover:bg-gray-200
          "
        >

          <ArrowLeft/>

        </button>



        <div>

          <h1 className="
          text-3xl
          font-bold
          text-gray-800
          ">

            Add New Task

          </h1>


          <p className="text-gray-500">

            Create a new task for your workflow

          </p>


        </div>


      </div>





      {/* Form */}


      <form

        onSubmit={handleSubmit}

        className="
        bg-white
        shadow
        rounded-2xl
        p-6
        space-y-5
        "

      >



        {/* Title */}

        <div>

          <label className="font-semibold">
            Task Title
          </label>


          <input

            type="text"

            name="title"

            value={task.title}

            onChange={handleChange}

            placeholder="Enter task title"

            className="
            w-full
            mt-2
            border
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "

          />


        </div>





        {/* Description */}


        <div>

          <label className="font-semibold">
            Description
          </label>


          <textarea

            name="description"

            value={task.description}

            onChange={handleChange}

            placeholder="Describe your task"

            rows="4"

            className="
            w-full
            mt-2
            border
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "

          />


        </div>






        {/* Due Date */}


        <div>

          <label className="font-semibold">
            Due Date
          </label>


          <input

            type="date"

            name="dueDate"

            value={task.dueDate}

            onChange={handleChange}

            className="
            w-full
            mt-2
            border
            rounded-xl
            px-4
            py-3
            "

          />


        </div>






        {/* Priority and Status */}


        <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-5
        ">


          <div>

            <label className="font-semibold">
              Priority
            </label>


            <select

              name="priority"

              value={task.priority}

              onChange={handleChange}

              className="
              w-full
              mt-2
              border
              rounded-xl
              px-4
              py-3
              "

            >

              <option value="High">
                High
              </option>


              <option value="Medium">
                Medium
              </option>


              <option value="Low">
                Low
              </option>


            </select>


          </div>






          <div>


            <label className="font-semibold">
              Status
            </label>


            <select

              name="status"

              value={task.status}

              onChange={handleChange}

              className="
              w-full
              mt-2
              border
              rounded-xl
              px-4
              py-3
              "

            >


              <option value="Pending">
                Pending
              </option>


              <option value="In Progress">
                In Progress
              </option>


              <option value="Completed">
                Completed
              </option>


            </select>


          </div>


        </div>







        {/* Submit Button */}


        <button

          type="submit"

          disabled={loading}

          className="
          flex
          items-center
          justify-center
          gap-2
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-xl
          hover:bg-blue-700
          disabled:opacity-50
          "

        >

          <Save size={20}/>


          {
            loading
            ?
            "Saving..."
            :
            "Save Task"
          }


        </button>



      </form>



    </div>

  );

}


export default AddTask;