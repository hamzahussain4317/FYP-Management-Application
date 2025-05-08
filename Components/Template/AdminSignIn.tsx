"use client";
import AdminSignInForm from "../AdminSignInForm";
import Image from "next/image";

export default function AdminSignIn() {
  return (
    <div className="formImg flex flex-col md:flex-row justify-center items-center">
      <AdminSignInForm />
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
