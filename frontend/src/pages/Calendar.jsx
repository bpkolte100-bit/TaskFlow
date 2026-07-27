import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays
} from "lucide-react";

import { getTasks } from "../services/taskService";

function Calendar() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [currentDate, setCurrentDate] = useState(
    new Date()
  );



  useEffect(() => {

    loadTasks();

  }, []);




  const loadTasks = async () => {

    try {

      const response = await getTasks();

      setTasks(response.data);

    }

    catch(error){

      console.log(error);

    }

  };




  const today = new Date();




  const currentMonth =
    currentDate.getMonth();

  const currentYear =
    currentDate.getFullYear();




  const monthNames = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

  ];



  const days = [

    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"

  ];



  const firstDay =
    new Date(currentYear, currentMonth, 1).getDay();



  const totalDays =
    new Date(currentYear, currentMonth + 1, 0).getDate();




  const previousMonth = () => {

    setCurrentDate(

      new Date(
        currentYear,
        currentMonth - 1,
        1
      )

    );

  };




  const nextMonth = () => {

    setCurrentDate(

      new Date(
        currentYear,
        currentMonth + 1,
        1
      )

    );

  };




  const goToday = () => {

    setCurrentDate(new Date());

  };




  const statusColor = (status) => {

    if(status==="Completed")
      return "bg-green-500";

    if(status==="In Progress")
      return "bg-blue-500";

    return "bg-yellow-500";

  };




  const renderCalendar = () => {

    const cells = [];



    for(let i=0;i<firstDay;i++){

      cells.push(

        <div
          key={`empty-${i}`}
          className="h-36"
        />

      );

    }




    for(let day=1;day<=totalDays;day++){

      const dateString =

        `${currentYear}-${String(currentMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;




      const dayTasks = tasks.filter(

        task => task.dueDate===dateString

      );




      const isToday =

        day===today.getDate() &&

        currentMonth===today.getMonth() &&

        currentYear===today.getFullYear();




      const weekend =

        new Date(
          currentYear,
          currentMonth,
          day
        ).getDay();




      cells.push(

        <div

          key={day}

          className={`
          h-36
          rounded-2xl
          border
          p-2
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-xl
          overflow-hidden
          ${
            weekend===0 || weekend===6
            ? "bg-gray-50"
            : "bg-white"
          }
          ${
            isToday
            ? "ring-2 ring-blue-500"
            : ""
          }
          `}

        >

          <div
            className="
            flex
            justify-between
            items-center
            "
          >

            <span

              className={`
              w-8
              h-8
              rounded-full
              flex
              items-center
              justify-center
              font-bold
              ${
                isToday
                ? "bg-blue-600 text-white"
                : "text-gray-700"
              }
              `}

            >

              {day}

            </span>

          </div>



          <div className="mt-2 space-y-1">

            {

              dayTasks.slice(0,2).map(task=>(

                <div

                  key={task.id}

                  onClick={()=>navigate(
                    "/edit-task",
                    {state:task}
                  )}

                  className={`
                  text-white
                  text-xs
                  px-2
                  py-1
                  rounded-lg
                  cursor-pointer
                  truncate
                  ${statusColor(task.status)}
                  `}

                >

                  {task.title}

                </div>

              ))

            }



            {
              dayTasks.length>2 &&

              <p className="text-xs text-gray-500">

                +{dayTasks.length-2} more

              </p>

            }

          </div>

        </div>

      );

    }



    return cells;

  };
    return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}

      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">

        <div>

          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">

            <CalendarDays size={36} />

            Calendar

          </h1>

          <p className="text-gray-500 mt-2">
            View all your scheduled tasks
          </p>

        </div>



        <div className="flex items-center gap-3">

          <button
            onClick={previousMonth}
            className="p-2 rounded-lg bg-white shadow hover:bg-gray-100"
          >
            <ChevronLeft />
          </button>

          <h2 className="text-2xl font-bold w-52 text-center">
            {monthNames[currentMonth]} {currentYear}
          </h2>

          <button
            onClick={nextMonth}
            className="p-2 rounded-lg bg-white shadow hover:bg-gray-100"
          >
            <ChevronRight />
          </button>

          <button
            onClick={goToday}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
          >
            Today
          </button>

        </div>

      </div>



      {/* Days */}

      <div className="grid grid-cols-7 gap-3 mb-3">

        {

          days.map((day)=>(

            <div

              key={day}

              className="text-center font-bold text-gray-600"

            >

              {day}

            </div>

          ))

        }

      </div>




      {/* Calendar */}

      <div className="grid grid-cols-7 gap-3">

        {renderCalendar()}

      </div>




      {/* Legend */}

      <div className="flex gap-6 mt-8 flex-wrap">

        <div className="flex items-center gap-2">

          <div className="w-4 h-4 rounded-full bg-green-500"></div>

          <span>Completed</span>

        </div>



        <div className="flex items-center gap-2">

          <div className="w-4 h-4 rounded-full bg-blue-500"></div>

          <span>In Progress</span>

        </div>



        <div className="flex items-center gap-2">

          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>

          <span>Pending</span>

        </div>



        <div className="flex items-center gap-2">

          <div className="w-4 h-4 rounded-full border-2 border-blue-500 rounded-full"></div>

          <span>Today</span>

        </div>

      </div>

    </div>

  );

}

export default Calendar;