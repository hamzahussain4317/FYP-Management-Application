import Link from "next/link";
interface SignUpFormProps {
  setForm: (formType: number) => void;
}
export default function SignUpForm({ setForm }: SignUpFormProps) {
  return (
    <div className="signUpForm">
      <form className="form">
        <div className="field">
          <div className="labelIcon">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <label htmlFor="name">Your Name</label>
          </div>
          <input type="text" placeholder="enter your name" className="name" />
        </div>
        <div className="field">
          <div className="labelIcon">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <label htmlFor="email">Your Email</label>
          </div>
          <input type="email" placeholder="enter your mail" className="email" />
        </div>
        <div className="field">
          <div className="labelIcon">
            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
            <label htmlFor="password">Your password</label>
          </div>
          <input
            type="password"
            placeholder="enter your password"
            className="password"
          />
        </div>
        <div className="signUpBtn">
          <button
            onClick={(e) => {
              e.preventDefault();
              setForm(0);
            }}
          >
            Sign In
          </button>
        </div>
        <p className="accExist">
          Already have an account?{" "}
          <span>
            <Link href="/login">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
