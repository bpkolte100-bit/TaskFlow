import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  Edit,
  CalendarDays,
  Search
} from "lucide-react";

import { getTasks, deleteTask } from "../services/taskService";
import toast from "react-hot-toast";

function MyTasks() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");


  useEffect(() => {

    loadTasks();

  }, []);




  const loadTasks = async () => {

    try {

      const response = await getTasks();

      setTasks(response.data);

    }
    catch (error) {

      console.log(error);

      toast.error("Failed to load tasks");

    }
    finally {

      setLoading(false);

    }

  };




  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {

      await deleteTask(id);

      toast.success("Task deleted successfully");

      loadTasks();

    }
    catch (error) {

      console.log(error);

      toast.error("Delete failed");

    }

  };





  const statusStyle = (status) => {

    if (status === "Completed")
      return "bg-green-100 text-green-700";

    if (status === "In Progress")
      return "bg-blue-100 text-blue-700";

    return "bg-yellow-100 text-yellow-700";

  };





  const priorityStyle = (priority) => {

    if (priority === "High")
      return "bg-red-100 text-red-700";

    if (priority === "Medium")
      return "bg-orange-100 text-orange-700";

    return "bg-green-100 text-green-700";

  };





  const filteredTasks = useMemo(() => {

    let filtered = [...tasks];

    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

    if (statusFilter !== "All") {

      filtered = filtered.filter(
        task => task.status === statusFilter
      );

    }

    if (priorityFilter !== "All") {

      filtered = filtered.filter(
        task => task.priority === priorityFilter
      );

    }

    if (sortBy === "Oldest") {

      filtered.sort((a, b) => a.id - b.id);

    }
    else if (sortBy === "Newest") {

      filtered.sort((a, b) => b.id - a.id);

    }
    else if (sortBy === "Due Date") {

      filtered.sort((a, b) => {

        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return new Date(a.dueDate) - new Date(b.dueDate);

      });

    }

    return filtered;

  }, [tasks, search, statusFilter, priorityFilter, sortBy]);





  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        Back Dashboard
      </button>



      <div className="mt-6">

        <h1 className="text-4xl font-bold text-gray-800">
          My Tasks
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all your tasks here
        </p>

      </div>



      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-8">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-2"
          />

        </div>



        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>



        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>



        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>Due Date</option>
        </select>

      </div>



      {

        loading ?

          <p className="mt-8">Loading tasks...</p>

          :

          filteredTasks.length === 0 ?

            <p className="mt-8 text-gray-500">
              No matching tasks found.
            </p>

            :

            <div className="grid md:grid-cols-2 gap-6 mt-8">

              {

                filteredTasks.map((task) => (

                  <div
                    key={task.id}
                    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
                  >

                    <div className="flex justify-between items-start">

                      <h2 className="text-2xl font-bold text-gray-800">
                        {task.title}
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyle(task.status)}`}
                      >
                        {task.status}
                      </span>

                    </div>



                    <p className="text-gray-600 mt-3">
                      {task.description || "No description"}
                    </p>



                    <div className="mt-5">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityStyle(task.priority)}`}
                      >
                        {task.priority}
                      </span>

                    </div>



                    <div className="flex items-center gap-2 text-gray-500 mt-4">

                      <CalendarDays size={18} />

                      <span>
                        {task.dueDate || "No due date"}
                      </span>

                    </div>



                    <div className="flex gap-3 mt-6">

                      <button
                        onClick={() =>
                          navigate("/edit-task", { state: task })
                        }
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >
                        <Edit size={18} />
                        Edit
                      </button>



                      <button
                        onClick={() => handleDelete(task.id)}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>

                    </div>

                  </div>

                ))

              }

            </div>

      }

    </div>

  );

}

export default MyTasks;