import React from "react";
import AdminSignIn from "@/Components/Template/AdminSignIn";
export default function AdminSignin() {
  console.log("Admin Signin");
  const user = "admin";
  return (
    <section className="signUp">
      <h1>Admin Login</h1>
      <AdminSignIn role={user} />
    </section>
  );
}
