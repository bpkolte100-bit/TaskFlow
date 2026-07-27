import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

import { getTasks } from "../services/taskService";

function Analytics() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };



  const completed = tasks.filter(
    task => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    task => task.status === "Pending"
  ).length;

  const progress = tasks.filter(
    task => task.status === "In Progress"
  ).length;



  const high = tasks.filter(
    task => task.priority === "High"
  ).length;

  const medium = tasks.filter(
    task => task.priority === "Medium"
  ).length;

  const low = tasks.filter(
    task => task.priority === "Low"
  ).length;



  const total = tasks.length;

  const completion = total === 0
    ? 0
    : Math.round((completed / total) * 100);



  const pieData = [

    {
      name: "Completed",
      value: completed
    },

    {
      name: "Pending",
      value: pending
    },

    {
      name: "In Progress",
      value: progress
    }

  ];



  const barData = [

    {
      priority: "High",
      Tasks: high
    },

    {
      priority: "Medium",
      Tasks: medium
    },

    {
      priority: "Low",
      Tasks: low
    }

  ];



  const COLORS = [

    "#22c55e",
    "#eab308",
    "#3b82f6"

  ];



  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-gray-800">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Overview of your task productivity
        </p>

      </div>




      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl shadow p-6">

          <h3 className="text-gray-500">
            Total Tasks
          </h3>

          <p className="text-4xl font-bold mt-3">
            {total}
          </p>

        </div>



        <div className="bg-white rounded-2xl shadow p-6">

          <h3 className="text-gray-500">
            Completed
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {completed}
          </p>

        </div>



        <div className="bg-white rounded-2xl shadow p-6">

          <h3 className="text-gray-500">
            Pending
          </h3>

          <p className="text-4xl font-bold text-yellow-500 mt-3">
            {pending}
          </p>

        </div>



        <div className="bg-white rounded-2xl shadow p-6">

          <h3 className="text-gray-500">
            Productivity
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            {completion}%
          </p>

        </div>

      </div>





      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-5">
            Task Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={120}
                label
              >

                {
                  pieData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>





        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-5">
            Priority Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={barData}
            >

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="priority"/>

              <YAxis/>

              <Tooltip/>

              <Legend/>

              <Bar
                dataKey="Tasks"
                fill="#3b82f6"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>





      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-5">
          Summary
        </h2>

        <ul className="space-y-3 text-lg">

          <li>
            ✅ Completed Tasks :
            <b> {completed}</b>
          </li>

          <li>
            ⏳ Pending Tasks :
            <b> {pending}</b>
          </li>

          <li>
            🚀 In Progress :
            <b> {progress}</b>
          </li>

          <li>
            🔥 High Priority :
            <b> {high}</b>
          </li>

          <li>
            📊 Productivity :
            <b> {completion}%</b>
          </li>

        </ul>

      </div>

    </div>

  );

}

export default Analytics;