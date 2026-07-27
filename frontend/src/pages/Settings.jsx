import { useState, useEffect } from "react";
import { UserCircle, Moon, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Settings() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "blue"
  );



  useEffect(() => {

    localStorage.setItem("darkMode", darkMode);

    if (darkMode) {

      document.documentElement.classList.add("dark");

    } else {

      document.documentElement.classList.remove("dark");

    }

  }, [darkMode]);



  useEffect(() => {

    localStorage.setItem(
      "notifications",
      notifications
    );

  }, [notifications]);



  useEffect(() => {

    localStorage.setItem("theme", theme);

  }, [theme]);



  const logout = () => {

    toast.success("Logged out successfully");

    navigate("/login");

  };



  return (

    <div className="max-w-4xl mx-auto space-y-6">

      <div>

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your preferences
        </p>

      </div>



      {/* Profile */}

      <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-5">

        <UserCircle size={70} className="text-blue-600"/>

        <div>

          <h2 className="text-2xl font-bold">
            {user?.name}
          </h2>

          <p className="text-gray-500">
            {user?.role}
          </p>

        </div>

      </div>



      {/* Settings */}

      <div className="bg-white rounded-2xl shadow p-6 space-y-6">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <Moon/>

            <span className="font-semibold">
              Dark Mode
            </span>

          </div>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(!darkMode)
            }
          />

        </div>



        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <Bell/>

            <span className="font-semibold">
              Notifications
            </span>

          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() =>
              setNotifications(!notifications)
            }
          />

        </div>

      </div>



      {/* Theme */}

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Theme Colour
        </h2>

        <div className="flex gap-4">

          <button
            onClick={() => setTheme("blue")}
            className="w-10 h-10 rounded-full bg-blue-600"
          />

          <button
            onClick={() => setTheme("green")}
            className="w-10 h-10 rounded-full bg-green-600"
          />

          <button
            onClick={() => setTheme("purple")}
            className="w-10 h-10 rounded-full bg-purple-600"
          />

        </div>

      </div>



      {/* About */}

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-bold mb-3">

          About TaskFlow

        </h2>

        <p className="text-gray-500">

          Version 1.0

        </p>

        <p className="text-gray-500">

          Built using React, Spring Boot & MySQL.

        </p>

      </div>



      {/* Logout */}

      <button

        onClick={logout}

        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"

      >

        <LogOut/>

        Logout

      </button>

    </div>

  );

}

export default Settings;