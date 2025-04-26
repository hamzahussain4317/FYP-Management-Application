"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginSchema } from "@/Schemas/UserLoginSchema";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppWrapper } from "@/context/AppDataContext";

interface UserLogin {
  email: string;
  password: string;
  role: "student" | "teacher";
}
type LogInProps = {
  user_role: string;
};

export default function LoginForm({ user_role }: LogInProps) {
  const { setUserId } = useAppWrapper();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<UserLogin>({
    resolver: zodResolver(UserLoginSchema),
  });

  useEffect(() => {
    sessionStorage.removeItem("userId");
  }, []);

  const submitLogInForm = async (data: UserLogin) => {
    try {
      const response = await fetch("http://localhost:3001/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        setUserId(responseData.userId);
        sessionStorage.setItem("userId", responseData.userId);
        if (data.role === "student") {
          router.push("/Home");
        } else if (data.role === "teacher") {
          router.push("/profile");
        }
      } else if (response.status === 500) {
        throw new Error("User already exist");
      } else if (response.status === 401) {
        throw new Error("Incorrect Password");
      } else {
        throw new Error("failed to signup");
      }
    } catch (error: any) {
      setError("root", {
        message: error?.message,
      });
      console.log(error);
      setLoginError(error.message);
    }
  };

  const onSubmit = async (data: UserLogin) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    reset();
    submitLogInForm(data);
  };

  return (
    <div className="loginform">
      <form className="form">
        <div className="field">
          <div className="labelIcon">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <label htmlFor="email">Your Email</label>
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your mail"
            className="email"
          />
          {errors.email && <div className="errors">{errors.email.message}</div>}
        </div>
        <div className="field">
          <div className="labelIcon">
            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
            <label htmlFor="password">Your password</label>
          </div>
          <input
            {...register("password")}
            type="password"
            placeholder="enter your password"
            className="password"
          />
          {errors.password && (
            <div className="errors">{errors.password.message}</div>
          )}
        </div>
        <div className="loginrole">
          <label htmlFor="Role" className="rolelabel">
            Role:
          </label>
          <div className="radioGroup">
            <div>
              <input
                {...register("role")}
                type="radio"
                id="student"
                name="role"
                value="student"
                defaultChecked={user_role === "student" ? true : false}
              />
              <label htmlFor="student">Student</label>
            </div>
            <div>
              <input
                {...register("role")}
                type="radio"
                id="teacher"
                name="role"
                value="Supervisor"
                defaultChecked={user_role === "student" ? false : true}
              />
              <label htmlFor="teacher">Supervisor</label>
            </div>
          </div>
          {errors.role && <div className="errors">{errors.role.message}</div>}
        </div>
        <div className="loginBtn">
          <button onClick={handleSubmit(onSubmit)}>
            {isLoading ? "Loading..." : "Log In"}
          </button>
        </div>
        {loginError && <div className="errors">{loginError}</div>}
        <p className="accExist">
          Do not have an Account?{" "}
          <span>
            <Link href="/signup">visit admin</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
