import './signupPage.css'
import { SignUp } from '@clerk/clerk-react'

const SignUpPage = () => {
  return (
    <div className="signupPage">
      <SignUp path="/signup" signInUrl='/signin'/>
    </div>
  );
}

export default SignUpPage;