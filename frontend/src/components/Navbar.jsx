import {
  Menu,
  Bell,
  Search,
  UserCircle
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";


function Navbar({ setOpen }) {


  const navigate = useNavigate();


  const [profileOpen, setProfileOpen] = useState(false);



  const user = JSON.parse(
    localStorage.getItem("user")
  );





  const logout = () => {

    localStorage.removeItem("user");

    toast.success(
      "Logged out successfully"
    );

    navigate("/login");

  };





  return (

    <header
      className="
      h-16
      bg-white
      border-b
      flex
      items-center
      justify-between
      px-4
      md:px-6
      "
    >



      {/* LEFT SIDE */}

      <div className="flex items-center gap-4">



        {/* Mobile Menu */}

        <button

          onClick={() => setOpen(true)}

          className="
          md:hidden
          p-2
          rounded-lg
          hover:bg-gray-100
          "

        >

          <Menu size={24}/>

        </button>





        {/* Search */}

        <div
          className="
          hidden
          sm:flex
          items-center
          bg-gray-100
          rounded-xl
          px-3
          py-2
          w-64
          "
        >

          <Search
            size={18}
            className="text-gray-500"
          />


          <input

            type="text"

            placeholder="Search tasks..."

            className="
            bg-transparent
            outline-none
            ml-2
            text-sm
            w-full
            "

          />


        </div>


      </div>







      {/* RIGHT SIDE */}


      <div
        className="
        flex
        items-center
        gap-4
        "
      >




        {/* Notification */}

        <button

          className="
          relative
          p-2
          rounded-full
          hover:bg-gray-100
          "

        >

          <Bell size={22}/>


          <span

            className="
            absolute
            top-1
            right-1
            h-2
            w-2
            bg-red-500
            rounded-full
            "

          />

        </button>








        {/* Profile Dropdown */}


        <div className="relative">


          <button

            onClick={() =>
              setProfileOpen(!profileOpen)
            }


            className="
            flex
            items-center
            gap-2
            cursor-pointer
            "

          >


            <UserCircle size={35}/>




            <div className="hidden md:block">


              <p
                className="
                text-sm
                font-semibold
                "
              >

                {user?.name || "User"}

              </p>



              <p
                className="
                text-xs
                text-gray-500
                "
              >

                {user?.role || "User"}

              </p>


            </div>


          </button>







          {/* Dropdown Menu */}


          {
            profileOpen && (

              <div

                className="
                absolute
                right-0
                mt-3
                w-44
                bg-white
                rounded-xl
                shadow-lg
                border
                p-2
                z-50
                "

              >


                <button

                  onClick={() =>
                    navigate("/settings")
                  }

                  className="
                  w-full
                  text-left
                  px-4
                  py-2
                  rounded-lg
                  hover:bg-gray-100
                  "

                >

                  Settings

                </button>






                <button

                  onClick={logout}

                  className="
                  w-full
                  text-left
                  px-4
                  py-2
                  rounded-lg
                  text-red-600
                  hover:bg-red-50
                  "

                >

                  Logout

                </button>



              </div>

            )

          }



        </div>



      </div>


    </header>

  );

}


export default Navbar;