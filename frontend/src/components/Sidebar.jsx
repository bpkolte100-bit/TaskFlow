import {
  LayoutDashboard,
  ListTodo,
  CalendarDays,
  BarChart3,
  Settings,
  CheckCircle,
  PlusCircle
} from "lucide-react";

import { NavLink } from "react-router-dom";


function Sidebar({ open, setOpen }) {

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "My Tasks",
      path: "/my-tasks",
      icon: ListTodo
    },
    {
      name: "Add Task",
      path: "/add-task",
      icon: PlusCircle
    },
    {
      name: "Completed",
      path: "/completed",
      icon: CheckCircle
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: CalendarDays
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings
    }
  ];


  return (

    <>

    {/* Mobile Overlay */}
    {open && (
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/40 z-20 md:hidden"
      />
    )}


    <aside
      className={`
      fixed md:static
      z-30
      h-screen
      w-64
      bg-slate-900
      text-white
      p-6
      transform
      transition-transform
      duration-300

      ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}

      `}
    >


      {/* Logo */}
      <div className="mb-10">

        <h1 className="text-3xl font-bold">
          🚀 TaskFlow
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Manage your productivity
        </p>

      </div>



      {/* Menu */}

      <nav className="space-y-2">


        {menuItems.map((item)=>{

          const Icon = item.icon;


          return (

          <NavLink
            key={item.path}
            to={item.path}
            onClick={()=>setOpen(false)}
            className={({isActive})=>
            `
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            transition

            ${
              isActive
              ?
              "bg-blue-600 text-white"
              :
              "text-slate-300 hover:bg-slate-800"
            }

            `
            }
          >

            <Icon size={20}/>

            <span>
              {item.name}
            </span>


          </NavLink>

          )

        })}


      </nav>



    </aside>

    </>

  );
}


export default Sidebar;