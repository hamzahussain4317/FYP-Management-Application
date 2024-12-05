"use client";
import UserSignUpForm from "../../Components/UserSignUpForm";
import AdminSignInForm from "../AdminSignInForm";
import Image from "next/image";
type SignUpProps = {
  user: string;
};
export default function SignUp({ user }: SignUpProps) {
  return (
    <div className="formImg flex flex-col md:flex-row justify-center items-center">
      {user === "admin" ? <AdminSignInForm /> : <UserSignUpForm />}
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
