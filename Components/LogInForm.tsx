'use client'
import Link from "next/link"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginSchema} from "@/Schemas/UserLoginSchema";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useAppWrapper } from "@/context/AppDataContext";

interface UserLogin{
  email:string;
  password:string;
  role: "student" | "teacher";
};

export default function LoginForm(){
  const { setUserId } = useAppWrapper();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [success ,setSuccess]=useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<UserLogin>({
    resolver: zodResolver(UserLoginSchema),
  });

  const submitLogInForm=async(data:UserLogin)=>{
    try{
      const response = await fetch ('http://localhost:3001/auth/signin',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          role: data.role
      })
      });
      if (response.ok){
        const responseData = await response.json();
                setSuccess(true);
                console.log("userID hamza",responseData.userID);
                setUserId(responseData.userID);
                router.push('/Home');
      }
      else if (response.status === 500) {
        throw new Error('User already exist')
    }
    else {
        throw new Error("failed to signup")
    }
    }
    catch (error:any) {
      setError("root", {
          message: error?.message
      })
      console.log(error);

  }
  }
  
  const onSubmit = async (data: UserLogin) => {
    setIsLoading(true);
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsLoading(false);
    reset();
    submitLogInForm(data);
  };
    return(
        <div className="loginform">
        <form className="form">
          <div className="field">
            <div className="labelIcon">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <label htmlFor="email">Your Email</label>
            </div>
            <input {...register("email")} type="email" placeholder="enter your mail" className="email" />
            {errors.email && <div className="errors">{errors.email.message}</div>}
          </div>
          <div className="field">
          <div className="labelIcon">
          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
            <label htmlFor="password">Your password</label>
            </div>
            <input  {...register("password")} type="password" placeholder="enter your password" className="password" />
            {errors.password && ( <div className="errors">{errors.password.message}</div>)}
          </div>
          <div className="loginrole">
              <label htmlFor="Role" className="rolelabel">Role:</label>
              <div className="radioGroup">
          <div>
            <input
            {...register("role")}
              type="radio"
              id="student"
              name="role"
              value="student"
            />
            <label htmlFor="student">Student</label>
          </div>
          <div>
            <input
            {...register("role")}
              type="radio"
              id="teacher"
              name="role"
              value="teacher"
            />
            <label htmlFor="teacher">Teacher</label>
          </div>
        </div>
        {errors.role && (
            <div className="errors">{errors.role.message}</div>
          )}
          </div>
          <div className="loginBtn">
          <button onClick={handleSubmit(onSubmit)}>{isLoading ? "Loading..." : "Log In"}</button>
          </div>
          <p className="accExist">Donot have an Account? <span><Link href="/signup">visit admin</Link></span></p>
        </form>
        </div>
    )
}