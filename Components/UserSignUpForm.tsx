import Link from "next/link"
export default function UserSignUpForm(){
    return(
        <div className="signUpForm">
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
        <div className="field">
          <div className="labelIcon">
          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
          <label htmlFor="confirmPassword">Confirm Your Password</label>
          </div>
          <input type="password" placeholder="confirm your password" className="name" />
        </div>
        <div className="role">
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
        <div className="signUpBtn">
        <button>Sign In</button>
        </div>
        <p className="accExist">Already have an account? <span><Link href="/login">Login</Link></span></p>
      </form>
      </div>
    )
}