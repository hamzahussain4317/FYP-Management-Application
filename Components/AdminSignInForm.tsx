"use client";
import Cookies from "js-cookie";
import { AdminSignInSchema } from "../Schemas/AdminSignUpData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppWrapper } from "@/context/AppDataContext";

interface AdminSignInData {
  name: string;
  email: string;
  password: string;
}
export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { baseUrl, setUserName, setUserRole } = useAppWrapper();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminSignInData>({
    resolver: zodResolver(AdminSignInSchema),
  });
  const onSubmit = async (data: AdminSignInData) => {
    try {
      setIsLoading(false);
      const response = await fetch(`${baseUrl}auth/adminsignin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.name,
          password: data.password,
          email: data.email,
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        setErrorMessage(responseData?.message);
      } else {
        const userrole = responseData.role;
        const token = responseData.token;
        setUserName(data.name);
        setUserRole(userrole);
        Cookies.set("role", userrole, { path: "/", expires: 1 });
        Cookies.set("token", token, { path: "/", expires: 1 });
        setIsLoading(false);
        reset();
        setErrorMessage("");
        router.push("/admin/groups");
      }
    } catch (error: any) {
      setErrorMessage(
        error?.message || "Something went wrong. Please Try Again"
      );
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
          {errors.password && (
            <div className="errors">{errors.password.message}</div>
          )}
        </div>
        <div className="signUpBtn">
          <button onClick={handleSubmit(onSubmit)}>
            {isLoading ? "Loading..." : "SignIn"}
          </button>
        </div>
        {errorMessage && <div className="errors">{errorMessage}</div>}
      </form>
    </div>
  );
}
