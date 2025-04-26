"use client";
import { Sign } from "crypto";
import UserSignUpForm from "../../Components/UserSignUpForm";
import AdminSignInForm from "../AdminSignInForm";
import Image from "next/image";

type SignUpProps = {
  role: string;
};
export default function SignUp({ role }: SignUpProps) {
  console.log(role);
  return (
    <div className="formImg flex flex-col md:flex-row justify-center items-center">
      {role === "admin" ? <AdminSignInForm /> : <UserSignUpForm role={role} />}
      <div className="signUpImageDiv hidden md:flex ">
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
