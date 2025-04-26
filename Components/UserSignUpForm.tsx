"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UserSignUpSchema } from "@/Schemas/UserSignUpData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Error from "next/error";

interface UserSignUpData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "student" | "teacher";
}

type SignUpProps = {
  role: string;
};
export default function UserSignUpForm({ role }: SignUpProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const submitSignUpForm = async (data: UserSignUpData) => {
    try {
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.userName,
          password: data.password,
          email: data.email,
          role: data.role,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        setSuccess(true);
        console.log(responseData);
        // router.push("/login");
      } else if (response.status === 500) {
        throw new Error("User already exist");
      } else if (response.status === 404) {
        throw new Error("User does not exist");
      } else {
        throw new Error("failed to signup");
      }
    } catch (error: any) {
      setError("root", {
        message: error?.message,
      });
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<UserSignUpData>({
    resolver: zodResolver(UserSignUpSchema),
  });

  const onSubmit = async (data: UserSignUpData) => {
    setIsLoading(true);
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    reset();
    submitSignUpForm(data);
  };
  return (
    <div className="signUpForm">
      <form className="form">
        <div className="field">
          <div className="labelIcon">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <label htmlFor="username">Your username</label>
          </div>
          <input
            {...register("userName")}
            type="text"
            placeholder="enter your userName"
            className="email"
          />
          {errors.userName && (
            <div className="errors">{errors.userName.message}</div>
          )}
        </div>
        <div className="field">
          <div className="labelIcon">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <label htmlFor="email">Your Email</label>
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="enter your mail"
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
        <div className="field">
          <div className="labelIcon">
            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
            <label htmlFor="confirmPassword">Confirm Your Password</label>
          </div>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="confirm your password"
            className="name"
          />
          {errors.confirmPassword && (
            <div className="errors">{errors.confirmPassword.message}</div>
          )}
        </div>
        <div className="role">
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
                defaultChecked={role === "student" ? true : false}
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
                defaultChecked={role === "teacher" ? true : false}
              />
              <label htmlFor="teacher">Teacher</label>
            </div>
          </div>
          {errors.role && <div className="errors">{errors.role.message}</div>}
        </div>
        <div className="signUpBtn">
          <button onClick={handleSubmit(onSubmit)}>
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </div>
        {errorMessage && <div className="errors">{errorMessage}</div>}
      </form>
    </div>
  );
}
