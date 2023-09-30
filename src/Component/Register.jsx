import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "./firebase";
import { FaEyeSlash,FaEye } from 'react-icons/fa';
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
const [showpass,setshowpass]=useState() 
const [error,seterror]=useState()
const[success,setsuccess]=useState()

const handleregister= e =>{
    e.preventDefault()
const email=e.target.email.value
const password=e.target.password.value
const accpeted=e.target.terms.checked
const name=e.target.name.value
console.log(name)

if(! accpeted){
    seterror('please accept our terms and condition')
    return
}else if(password.length<6){
    seterror('please provide a passsword 6 charecter or more')
}

seterror('')
setsuccess('')
createUserWithEmailAndPassword(auth, email, password)
.then(result=>{
    console.log(result.user)
    setsuccess('you have successfully done your register')

    updateProfile(result.user,{
        displayName:name,
    })
    .then()
    .catch()
    
    //verification
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      alert('please verify your email')  
    })


})
.catch(error=>{
    seterror(error.message)
})
}

    return (
        <div >
            <div className="  hero min-h-screen bg-base-200">
  <div className="hero-content flex-col bg-emerald-200 w-2/4 ">
    <div className="text-center ">
      <h1 className="text-5xl font-bold">Register Now!</h1>
     
    </div>
    <div className="card flex-shrink-0 w-full  shadow-2xl bg-base-100">

       
      <div className="card-body bg-teal-200  ">
      <form className=" " onSubmit={handleregister}>
        <div  className="">
        <label className="label ">
            <span className="label-text text-xl"> Full Name</span>
          </label>
          < input  type="text" placeholder="name" name="name" className="input input-bordered w-full text-lg" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl">Email</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input input-bordered  text-lg" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-xl">Password</span>
          </label>
          <div className="relative">
          <input  type={showpass?"text":"password"} name="password" placeholder="password" className="input input-bordered  text-lg w-full" />
          <span className="absolute mt-4 right-14 " onClick={()=>setshowpass(!showpass)}>
         {
            showpass ?<FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
         }
          </span>
         
          </div>
          <label className="label">
            <a href="#" className=" text-base label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="flex gap-2">
        <input type="checkbox" name="terms"  id="" />
        <p className="text-lg font-bold">please accpet out terms and condition</p>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary font-bold">Register</button>
        </div>
        <div className="mb-2">

        {
                error&&<p className="text-red-600">{error}</p>
        }
        {
            success&& <p className="text-green-500">{success}</p>
        }
        </div>

        <p className="text-lg font-bold">you have alreday register? <Link to="/login">Login Now</Link> </p>
        </form>
      </div>
      
    </div>
   
  </div>
</div>
            
        </div>
    );
};

export default Register;