"use client";
import { useState } from "react";
import UserSignUpForm from "../../Components/UserSignUpForm";
import AdminSignInForm from "../AdminSignInForm";
import Image from "next/image";
export default function SignUp() {
  const [form, setForm] = useState(1);
  return (
    <div className="formImg">
      {form ? <AdminSignInForm setForm={setForm} /> : <UserSignUpForm />}
      <div className="signUpImageDiv">
        <Image
          className="signUpImage"
          src={`/signup.png`}
          alt={""}
          priority={false}
          width={500}
          height={300}
          quality={100}
        ></Image>
      </div>
    </div>
  );
}
