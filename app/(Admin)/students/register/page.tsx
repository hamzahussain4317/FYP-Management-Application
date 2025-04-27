import SignUp from "@/Components/Template/SignUp";
import React from "react";

const register = ({ props }: RegisterationProps) => {
  return <SignUp role={props.role} />;
};

export default register;
