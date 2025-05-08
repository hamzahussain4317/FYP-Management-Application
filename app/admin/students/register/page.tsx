import SignUp from "@/Components/Template/AdminSignIn";
import React from "react";

const register = ({ props }: RegisterationProps) => {
  return <SignUp role={props.role} />;
};

export default register;
