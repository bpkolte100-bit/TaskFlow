import { useState, useEffect } from "react";

import {
  CheckCircle,
  Clock,
  ListTodo,
  AlertCircle
} from "lucide-react";

import { getTasks } from "../services/taskService";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);




  // Get tasks from backend

  useEffect(() => {

    loadTasks();

  }, []);




  const loadTasks = async () => {

    try {

      const response = await getTasks();

      console.log("Dashboard Tasks:", response.data);

      setTasks(response.data);

    }
    catch(error) {

      console.log(error);

    }

  };






  // Calculate real numbers

  const totalTasks = tasks.length;


  const completedTasks = tasks.filter(
    task => task.status === "Completed"
  ).length;


  const pendingTasks = tasks.filter(
    task => task.status === "Pending"
  ).length;


  const overdueTasks = tasks.filter(
    task => task.status === "Overdue"
  ).length;





  const stats = [

    {
      title:"Total Tasks",
      value: totalTasks,
      icon: ListTodo,
      color:"bg-blue-500"
    },

    {
      title:"Completed",
      value: completedTasks,
      icon: CheckCircle,
      color:"bg-green-500"
    },

    {
      title:"Pending",
      value: pendingTasks,
      icon: Clock,
      color:"bg-yellow-500"
    },

    {
      title:"Overdue",
      value: overdueTasks,
      icon: AlertCircle,
      color:"bg-red-500"
    }

  ];






  // Last 3 added tasks

  const recentTasks = tasks
    .slice(-3)
    .reverse();






  const progress = totalTasks === 0
    ? 0
    : Math.round(
        (completedTasks / totalTasks) * 100
      );






  return (

    <div className="space-y-6">



      {/* Welcome */}

      <div>

        <h1
          className="
          text-3xl
          font-bold
          text-gray-800
          "
        >
          Good Morning, {user?.name} 👋
        </h1>

        <p
          className="
          text-gray-500
          mt-2
          "
        >
          Here's what's happening with your tasks today.
        </p>

      </div>







      {/* Stats Cards */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-5
        "
      >

        {

          stats.map((item)=>{

            const Icon = item.icon;

            return(

              <div
                key={item.title}
                className="
                bg-white
                rounded-2xl
                p-5
                shadow
                flex
                items-center
                justify-between
                "
              >

                <div>

                  <p className="text-gray-500">
                    {item.title}
                  </p>

                  <h2
                    className="
                    text-3xl
                    font-bold
                    mt-2
                    "
                  >
                    {item.value}
                  </h2>

                </div>

                <div
                  className={`
                  ${item.color}
                  text-white
                  p-3
                  rounded-xl
                  `}
                >

                  <Icon size={25}/>

                </div>

              </div>

            );

          })

        }

      </div>








      {/* Bottom Section */}

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        "
      >






        {/* Progress */}

        <div
          className="
          bg-white
          rounded-2xl
          shadow
          p-6
          "
        >

          <h2
            className="
            text-xl
            font-bold
            mb-5
            "
          >
            Task Progress
          </h2>

          <div
            className="
            w-full
            bg-gray-200
            rounded-full
            h-4
            "
          >

            <div
              className="
              bg-blue-600
              h-4
              rounded-full
              "
              style={{
                width:`${progress}%`
              }}
            />

          </div>

          <p
            className="
            mt-3
            text-gray-500
            "
          >

            {
              totalTasks === 0
              ? "No tasks yet"
              : `${progress}% tasks completed`
            }

          </p>

        </div>








        {/* Recent Tasks */}

        <div
          className="
          bg-white
          rounded-2xl
          shadow
          p-6
          "
        >

          <h2
            className="
            text-xl
            font-bold
            mb-4
            "
          >
            Recent Tasks
          </h2>

          <div className="space-y-4">

            {

              recentTasks.length === 0 ?

              (

                <p className="text-gray-500">
                  No tasks available
                </p>

              )

              :

              (

                recentTasks.map((task)=>(

                  <div
                    key={task.id}
                    className="
                    flex
                    justify-between
                    items-center
                    border-b
                    pb-3
                    "
                  >

                    <div>

                      <h3 className="font-semibold">
                        {task.title}
                      </h3>

                      <p
                        className="
                        text-sm
                        text-gray-500
                        "
                      >
                        {task.dueDate || "No date"}
                      </p>

                    </div>

                    <span
                      className="
                      text-sm
                      bg-blue-100
                      text-blue-600
                      px-3
                      py-1
                      rounded-full
                      "
                    >
                      {task.status}
                    </span>

                  </div>

                ))

              )

            }

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;