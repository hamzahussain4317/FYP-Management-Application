"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UserSignUpSchema } from "@/Schemas/UserSignUpData";
import Link from "next/link";

interface UserSignUpData {
  email: string;
  password: string;
  confirmPassword: string;
  role: "student" | "teacher";
}

export default function UserSignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    // setError,
    // setValue,
    // getValues,
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
    //will use setErrorMessage if the data doesnot matches the api result//
  };
  return (
    <div className="signUpForm">
      <form className="form">
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
              <input {...register("role")} type="radio" id="student" name="role" value="student" />
              <label htmlFor="student">Student</label>
            </div>
            <div>
              <input {...register("role")} type="radio" id="teacher" name="role" value="teacher" />
              <label htmlFor="teacher">Teacher</label>
            </div>
          </div>
          {errors.role && (
            <div className="errors">{errors.role.message}</div>
          )}
        </div>
        <div className="signUpBtn">
          <button onClick={handleSubmit(onSubmit)}>
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </div>
        {errorMessage && <div className="errors">{errorMessage}</div>}
        <p className="accExist">
          Already have an account?{" "}
          <span>
            <Link href="/login">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
