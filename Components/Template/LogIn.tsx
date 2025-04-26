import LoginForm from "../../Components/LogInForm";
import Image from "next/image";

export default function login(user_role: string) {
  return (
    <div className="formImg">
      <div className="logInImageDiv">
        <Image
          className="logInImage"
          src={`/login.png`}
          alt={""}
          priority={false}
          width={500}
          height={300}
          quality={100}
        ></Image>
      </div>
      <LoginForm user_role={user_role} />
    </div>
  );
}
