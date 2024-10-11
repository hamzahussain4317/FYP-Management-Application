
import Link from "next/link"
export default function LoginForm(){
    return(
        <div className="loginform">
        <form className="form">
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
            <input type="password" placeholder="enter your password" className="password" />
          </div>
          <div className="loginrole">
              <label htmlFor="Role" className="rolelabel">Role:</label>
              <div className="radioGroup">
          <div>
            <input
              type="radio"
              id="student"
              name="role"
              value="student"
            />
            <label htmlFor="student">Student</label>
          </div>
          <div>
            <input
              type="radio"
              id="teacher"
              name="role"
              value="teacher"
            />
            <label htmlFor="teacher">Teacher</label>
          </div>
        </div>
          </div>
          <div className="loginBtn">
          <button>Log In</button>
          </div>
          <p className="accExist">Donot have an Account? <span><Link href="/signup">visit admin</Link></span></p>
        </form>
        </div>
    )
}