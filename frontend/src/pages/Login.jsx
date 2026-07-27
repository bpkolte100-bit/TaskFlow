import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";


function Login() {


  const navigate = useNavigate();


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [loading,setLoading] = useState(false);





  const handleLogin = async () => {


    if(!email || !password){

      toast.error(
        "Please enter email and password"
      );

      return;

    }





    try {


      setLoading(true);



      const response = await loginUser({

        email: email,

        password: password

      });





      const user = response.data;




      localStorage.setItem(

        "user",

        JSON.stringify(user)

      );





      toast.success(
        "Login successful 🚀"
      );



      navigate("/dashboard");



    }


    catch(error){


      console.log(error);


      toast.error(
        "Invalid email or password"
      );


    }


    finally{

      setLoading(false);

    }


  };







  return (


    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-blue-600
      via-purple-600
      to-indigo-800
      "
    >





      <div

        className="
        bg-white
        w-96
        p-8
        rounded-2xl
        shadow-2xl
        "

      >




        {/* Logo */}


        <div className="text-center mb-6">


          <h1

            className="
            text-4xl
            font-bold
            text-blue-600
            "

          >

            TaskFlow

          </h1>



          <p
            className="
            text-gray-500
            mt-2
            "
          >

            Manage your tasks smarter

          </p>


        </div>







        <h2

          className="
          text-2xl
          font-bold
          text-center
          mb-6
          "

        >

          Login

        </h2>







        {/* Email */}


        <input


          type="email"


          placeholder="Email address"


          value={email}


          onChange={(e)=>
            setEmail(e.target.value)
          }


          className="
          w-full
          border
          p-3
          rounded-xl
          mb-4
          outline-none
          focus:ring-2
          focus:ring-blue-500
          "

        />








        {/* Password */}


        <input


          type="password"


          placeholder="Password"


          value={password}


          onChange={(e)=>
            setPassword(e.target.value)
          }


          onKeyDown={(e)=>{

            if(e.key==="Enter"){

              handleLogin();

            }

          }}


          className="
          w-full
          border
          p-3
          rounded-xl
          mb-5
          outline-none
          focus:ring-2
          focus:ring-blue-500
          "

        />









        {/* Login Button */}


        <button


          onClick={handleLogin}


          disabled={loading}


          className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-xl
          font-semibold
          hover:bg-blue-700
          transition
          disabled:opacity-50
          "

        >


          {

            loading

            ?

            "Logging in..."

            :

            "Login"

          }


        </button>







        {/* Register */}


        <p

          className="
          text-center
          text-gray-500
          mt-5
          "

        >

          Don't have an account?


          <button


            onClick={()=>navigate("/register")}


            className="
            text-blue-600
            font-semibold
            ml-1
            hover:underline
            "

          >

            Register

          </button>


        </p>





      </div>


    </div>


  );


}


export default Login;