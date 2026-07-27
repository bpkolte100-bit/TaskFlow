import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";


function Register() {


  const navigate = useNavigate();


  const [name,setName] = useState("");

  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [loading,setLoading] = useState(false);







  const handleRegister = async()=>{


    if(!name || !email || !password){

      toast.error(
        "Please fill all fields"
      );

      return;

    }






    try{


      setLoading(true);



      await registerUser({

        name:name,

        email:email,

        password:password

      });




      toast.success(
        "Registration successful 🎉"
      );



      navigate("/login");



    }


    catch(error){


      console.log(error);


      toast.error(
        "Registration failed"
      );


    }


    finally{

      setLoading(false);

    }


  };








  return(


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



          <p className="text-gray-500 mt-2">

            Create your account

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

          Register

        </h2>







        <input


          type="text"


          placeholder="Full Name"


          value={name}


          onChange={(e)=>
            setName(e.target.value)
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







        <input


          type="email"


          placeholder="Email"


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








        <input


          type="password"


          placeholder="Password"


          value={password}


          onChange={(e)=>
            setPassword(e.target.value)
          }


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









        <button


          onClick={handleRegister}


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

            "Creating account..."

            :

            "Register"

          }


        </button>








        <p

          className="
          text-center
          text-gray-500
          mt-5
          "

        >

          Already have an account?


          <button


            onClick={()=>navigate("/login")}


            className="
            text-blue-600
            font-semibold
            ml-1
            hover:underline
            "

          >

            Login

          </button>


        </p>






      </div>


    </div>


  );


}


export default Register;