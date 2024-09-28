import Image from "next/image";
import AdminSignInForm from '../../Components/AdminSignInForm'
import UserSignUpForm from '../../Components/UserSignUpForm'
export default function signUp() {
  return (
   <section className="signUp">
    <h1>Sign Up</h1>
    <div className="formImg">
    {/* <AdminSignInForm/> */}
    <UserSignUpForm/>
    <div className="signUpImageDiv">
      <Image
        className="signUpImage"
        src={`/signup.png`}
        alt={""}
        priority={false}
        width={500}
        height={300}
        quality={100}></Image>
    </div>
    </div>
   </section>
  );
}
