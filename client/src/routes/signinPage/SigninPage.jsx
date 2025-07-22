import './signinPage.css'
import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <div className='signinPage'>
      <SignIn path="/signin" signUpUrl='/signup'  />
    </div>
  )
}

export default SignInPage;