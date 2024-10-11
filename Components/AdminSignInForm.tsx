"use client";
import { AdminSignInSchema } from "../Schemas/AdminSignUpData";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
interface SignUpFormProps {
  setForm: (formType: number) => void;
}

interface AdminSignInData {
  name: string;
  email: string;
  password: string;
}
export default function SignUpForm({ setForm }: SignUpFormProps) {
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
    console.log(data);
    reset();
    setForm(0);
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
          {errors.name && <div className="errors">Invalid name</div>}
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
          {errors.email && <div className="errors">Invalid email</div>}
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
          {errors.password && <div className="errors">Invalid password</div>}
        </div>
        <div className="signUpBtn">
          <button onClick={handleSubmit(onSubmit)}>Sign In</button>
        </div>
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
