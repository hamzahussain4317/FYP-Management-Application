import React from "react";
import SignUp from "@/Components/Template/SignUp";
export default function AdminSignin() {
  console.log("Admin Signin");
  const user = "admin";
  return (
    <section className="signUp">
      <h1>Admin Login</h1>
      <SignUp role={user} />
    </section>
  );
}
