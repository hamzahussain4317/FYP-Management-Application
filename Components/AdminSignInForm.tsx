"use client";
import { AdminSignInSchema } from "../Schemas/AdminSignUpData";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminValidation } from "@/AdminValidation/adminvalidation";
import { useState } from "react";
interface SignUpFormProps {
  setForm: (formType: number) => void;
}

interface AdminSignInData {
  name: string;
  email: string;
  password: string;
}
export default function SignUpForm({ setForm }: SignUpFormProps) {
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
  } = useForm<AdminSignInData>({
    resolver: zodResolver(AdminSignInSchema),
  });
  const onSubmit = async (data: AdminSignInData) => {
    if (
      data.name.toLowerCase() === adminValidation.name.toLowerCase() &&
      data.email.toLowerCase() === adminValidation.email.toLowerCase() &&
      data.password.toLowerCase() === adminValidation.password.toLowerCase()
    ) {
      setIsLoading(true);
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      reset();
      setForm(0);
      setErrorMessage("");
    }
    else{
      setErrorMessage("Invalid email, password, or username");
      console.log("incorrect");
    }
  };
  return (
    <div className="signUpForm">
      <form className="form">
        <div className="field">
          <div className="labelIcon">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <label htmlFor="name">Your Name</label>
          </div>
          <input
            {...register("name")}
            type="text"
            placeholder="enter your name"
            className={errors.name ? "field-error" : "name"}
          />
          {errors.name && <div className="errors">{errors.name.message}</div>}
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
            className={errors.name ? "field-error" : "email"}
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
            className={errors.name ? "field-error" : "password"}
          />
          {errors.password && <div className="errors">{errors.password.message}</div>}
        </div>
        <div className="signUpBtn">
          <button onClick={handleSubmit(onSubmit)}>{isLoading ? "Loading..." : "Sign In"}</button>
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
