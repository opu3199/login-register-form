import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "./firebase";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const Login = () => {

  // const [showpass,setshowpass]=useState() 
  const [error,seterror]=useState()
  const[success,setsuccess]=useState()
  const emailRef=useRef()

    const handlelogin=e=>{
        e.preventDefault()
        const email=e.target.email.value
        const password=e.target.password.value
        console.log(email,password)

        if(password.length<6){
            seterror('please provide a password atleast 6 or more charecter')
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
            console.log(result.user)
            if(result.user.emailVerifie){
                setsuccess('you have successfully done')
                return
            }else{
                // alert('please first verified your email')
            }
            
        })
        .catch(error=>{
            console.log(error)
            seterror('please first complete your register')
        })


    }

    const handleforget=()=>{
       const email=emailRef.current.value
       if(!email){
        console.log('please provide an email',emailRef.current.value)
        return;
       }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
        console.log('please write a valid email')
        return
       }
       seterror('')
setsuccess('')

       sendPasswordResetEmail(auth, email)
       .then(()=>{
        alert('please cheack your email')
       })
       .catch(error=>{
        console.log(error)
       })
    }


    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content bg-cyan-200 w-2/4 flex-col ">
          <div className="text-center ">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
            <div className="card-body bg-pink-300">
                <form onSubmit={handlelogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Email</span>
                </label>
                <input type="email"
                 placeholder="email"
                 ref={emailRef}
                  name="email" 
                  className="input input-bordered text-lg" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Password</span>
                </label>
                <input type="password" placeholder="password" name="password" className="input text-lg input-bordered" />
                <label className="label">
                  <a onClick={handleforget} href="#" className="label-text-alt link link-hover text-base ">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>

              <div className="mb-2">

              {
                  error&&<p className="text-red-600">{error}</p>
              }
              {
                  success&& <p className="text-green-500">{success}</p>
              }
              </div>
              <p className="text-lg font-bold">are you complete register?<Link to="/register"> <span>Register Now</span></Link>  </p>
              </form>
            </div>
           
          </div>
        </div>
      </div>
    );
};

export default Login;